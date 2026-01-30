<template>
  <div class="row">
    <div class="col-12 mb-4">
      <h4>Paramétrez les Informations de votre agent IA</h4>
      <p class="text-orange fw-bold">*Représente un champ obligatoire</p>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Nom de l'agent IA*</label>
      <input type="text"
        class="form-control"
        :value="agent.nom"
        @input="updateAgent('nom', $event.target.value)"
        placeholder="Entrez un nom" required>
    </div>

    <!-- Catégorie (remplace l'input domaine) -->
    <div class="col-12 mb-4">
      <label class="form-label">Domaine d'expertise*</label>
      <select
        class="form-select"
        :value="agent.category_id || ''"
        @change="onCategoryChange($event.target.value)"
        required
      >
        <option value="" disabled>Sélectionnez un Domaine d'expertise</option>
        <option v-for="c in localCategories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
      <div v-if="catError" class="form-text text-danger mt-1">{{ catError }}</div>
    </div>

    <!-- Sous-catégorie (lié à la catégorie) -->
    <div class="col-12 mb-4" v-if="localSubcategories.length">
      <label class="form-label">Sous Domaine d'expertise*</label>
      <select
        class="form-select"
        :value="agent.subcategory_id || ''"
        @change="onSubcategoryChange($event.target.value)"
        required
      >
        <option value="" disabled>Sélectionnez une Sous Domaine</option>
        <option v-for="s in localSubcategories" :key="s.id" :value="s.id">
          {{ s.name }}
        </option>
      </select>
      <div v-if="subError" class="form-text text-danger mt-1">{{ subError }}</div>
    </div>

    <div class="col-lg-6 col-md-6 col-12 mb-4">
      <label class="form-label">Type d'agent*</label>
      <div class="d-flex flex-wrap">
        <div class="form-check me-3">
          <input type="radio"
                 id="public"
                 name="type"
                 class="form-check-input"
                 :checked="agent.type === 'public'"
                 @change="updateAgent('type', 'public')"
                 required>
          <label for="public" class="form-label">Agent IA public</label>
        </div>
        <div class="form-check">
          <input type="radio"
                 id="private"
                 name="type"
                 class="form-check-input"
                 :checked="agent.type === 'privé' || agent.type === 'private'"
                 @change="updateAgent('type', 'privé')"
                 required>
          <label for="private" class="form-label">Agent IA privé</label>
        </div>
      </div>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Ajouter des tags</label>
      <div class="input-group mb-4">
        <input type="text"
               class="form-control"
               :value="newTag"
               @input="$emit('update:newTag', $event.target.value)"
               @keyup.enter="$emit('add-tag')"
               placeholder="Entrer un tag">
        <button class="btn btn-primary rounded-15" @click="$emit('add-tag')">Ajouter</button>
      </div>
      <div class="tags">
        <button v-for="(tag, index) in agent.tags" :key="index" class="tagBtn btn">
          <span class="me-2">#{{ tag }}</span>
          <button class="btn btnTrash p-0" @click="$emit('remove-tag', index)">
            <i class="ti ti-circle-x text-danger"></i>
          </button>
        </button>
      </div>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Description de l'agent IA</label>
      <textarea class="form-control"
                :value="agent.description"
                @input="updateAgent('description', $event.target.value)"
                rows="4"
                placeholder="Décrire votre agent..."></textarea>
    </div>

    <div class="col-12 mb-4">
      <div class="card card-1">
        <div class="form-control">
          <!-- Sous-titres + responsabilités -->
          <div v-for="(sousTitre, sousTitreIndex) in agent.sousTitres" :key="sousTitreIndex">
            <div class="col-12 mb-4">
              <label class="form-label">Sous Titre*</label>
              <input class="form-control"
                     :value="sousTitre.titre"
                     @input="updateSousTitre(sousTitreIndex, 'titre', $event.target.value)"
                     placeholder="Sous-titre ex: Génération de leads" />
            </div>

            <div v-for="(responsabilite, responsibilityIndex) in sousTitre.responsabilites"
                 :key="responsibilityIndex" class="col-12 mb-4">
              <label class="form-label">Responsabilité*</label>
              <input class="form-control"
                     :value="sousTitre.responsabilites[responsibilityIndex]"
                     @input="updateResponsabilite(sousTitreIndex, responsibilityIndex, $event.target.value)"
                     placeholder="Responsabilité liée" />
            </div>

            <button type="button"
                    class="btn btn-primary rounded-15 me-2"
                    @click="$emit('add-responsibility', sousTitreIndex)">
              + Ajouter une responsabilité
            </button>
          </div>

          <button type="button"
                  class="btn btn-primary rounded-15 ms-2"
                  @click="$emit('add-sous-titre')">
            + Ajouter un sous-titre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Step1Infos',
  props: {
    agent: { type: Object, required: true },
    newTag: { type: String, default: '' },
    categories: { type: Array, default: () => [] } // <— catégories passées depuis Blade
  },
  emits: [
    'update:agent','update:newTag','add-tag','remove-tag',
    'add-sous-titre','add-responsibility'
  ],
  data () {
    return {
      localCategories: [],
      localSubcategories: [],
      catError: '',
      subError: ''
    }
  },
  mounted () {
    // Charger les catégories en local
    this.localCategories = Array.isArray(this.categories) ? this.categories : []

    // Si une catégorie est déjà choisie (édition), remplir les sous-catégories
    if (this.agent?.category_id) {
      this.fetchSubcategories(this.agent.category_id)
    }
  },
  watch: {
    // si le parent réinjecte les catégories (ex: ajax), on recalcule
    categories (val) {
      this.localCategories = Array.isArray(val) ? val : []
      if (this.agent?.category_id) this.setSubcategoriesFromLocal(this.agent.category_id)
    },
    // recharger sous-catégories si la catégorie change ailleurs
    'agent.category_id' (val) {
      if (val) this.fetchSubcategories(val)
      else this.localSubcategories = []
    }
  },
  methods: {
    // --- sélection catégorie / sous-catégorie -------------
    onCategoryChange (val) {
      const id = val ? Number(val) : null
      const updated = { ...this.agent, category_id: id, subcategory_id: null }
      this.$emit('update:agent', updated)
      this.fetchSubcategories(id)
    },
    onSubcategoryChange (val) {
      const id = val ? Number(val) : null
      const updated = { ...this.agent, subcategory_id: id }
      this.$emit('update:agent', updated)
    },

    // Remplit depuis la prop si dispo ; renvoie true si on a trouvé
    setSubcategoriesFromLocal (categoryId) {
      this.subError = ''
      const id = Number(categoryId)
      const cat = this.localCategories.find(c => Number(c.id) === id)

      // compat: 'subcategories' ou 'souscategories'
      let subs = []
      if (cat) {
        if (Array.isArray(cat.subcategories)) subs = cat.subcategories
        else if (Array.isArray(cat.souscategories)) subs = cat.souscategories
      }

      // Mapper pour garantir {id, name}
      this.localSubcategories = subs.map(s => ({
        id: Number(s.id),
        name: s.name || s.titre || s.label || ''
      }))

      return this.localSubcategories.length > 0
    },

    // Essaye d’abord local, sinon API
    async fetchSubcategories (categoryId) {
      this.localSubcategories = []
      if (!categoryId) return

      if (this.setSubcategoriesFromLocal(categoryId)) return

      try {
        const { data } = await axios.get(`/api/categories/${categoryId}/subcategories`)
        this.localSubcategories = Array.isArray(data?.data) ? data.data
          : (Array.isArray(data) ? data : [])
      } catch (e) {
        this.subError = "Impossible de charger les sous-catégories."
        this.localSubcategories = []
      }
    },

    // --- tes méthodes existantes (updateAgent, updateSousTitre, etc.) -------------
    updateAgent(key, value) {
      const updated = { ...this.agent }
      updated[key] = value
      this.$emit('update:agent', updated)
    },
    updateSousTitre(sousTitreIndex, key, value) {
      const updated = { ...this.agent }
      updated.sousTitres = [...(updated.sousTitres || [])]
      updated.sousTitres[sousTitreIndex] = {
        ...updated.sousTitres[sousTitreIndex],
        [key]: value
      }
      this.$emit('update:agent', updated)
    },
    updateResponsabilite(sousTitreIndex, responsibilityIndex, value) {
      const updated = { ...this.agent }
      updated.sousTitres = [...(updated.sousTitres || [])]
      updated.sousTitres[sousTitreIndex] = {
        ...updated.sousTitres[sousTitreIndex],
        responsabilites: [...(updated.sousTitres[sousTitreIndex]?.responsabilites || [])]
      }
      updated.sousTitres[sousTitreIndex].responsabilites[responsibilityIndex] = value
      this.$emit('update:agent', updated)
    }
  }
}
</script>
