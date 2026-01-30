<template>
  <div class="mt-3 formulaire">
        <div class="col-12">
            <div class="card card-1">
                <div class="card-body px-lg-4 px-md-3 px-2">
                    <div class="bs-stepper wizard-numbered shadow-none mt-2">
<div class="row">
  <div class="col-12 mb-4">
          <h4> Ajouter un domaine d’expertise IA</h4>
           
      
        <p class="text-orange fw-bold">*Représente un champ obligatoire</p>
  </div>

            <!-- Formulaire -->
            <form class="mt-8 space-y-6" @submit.prevent="submit">
              <!-- Nom catégorie -->
                <div class="col-12 mb-4">
      <label class="form-label">Titre du domaine  <span class="text-[#F26616]">*</span>
          </label>
              
                <input
                  v-model.trim="form.name"
                  type="text"
                  placeholder="Écrire un nom"
                  class="form-control"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Sous-catégories -->
            <!-- Bouton Ajouter -->
<div class="col-12 d-flex justify-content-end mb-3">
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-xl bg-[#0093EE] px-4 py-2.5
           text-white font-semibold shadow hover:bg-[#007BCC]"
    @click="addSub"
  >    Ajouter un sous domaine d’expertise

    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5"/>
    </svg>
  </button>
</div>

<!-- Bloc sous-domaines (affiché seulement si il y en a) -->
<div class="col-12 mb-4" v-if="form.subcategories.length > 0">
  <label class="form-label">
    Nom du sous domaine <span class="text-[#F26616]">*</span>
  </label>

  <!-- Liste des sous-domaines -->
  <div class="space-y-3">
    <div
      v-for="(sub, idx) in form.subcategories"
      :key="idx"
      class="relative"
    >
      <input
        v-model.trim="form.subcategories[idx]"
        type="text"
        placeholder="Ecrire un sous domaine"
        class="form-control"
      />
      <!-- Bouton X orange à droite du champ -->
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl bg-[#F26616]
               text-white grid place-items-center shadow hover:brightness-95"
        @click="removeSub(idx)"
        aria-label="Supprimer le sous domaine"
      >
        ✕
      </button>
    </div>
  </div>

  <!-- Erreurs -->
  <p v-if="errors.subcategories" class="mt-2 text-sm text-red-600">
    {{ errors.subcategories }}
  </p>
</div>

              <!-- Actions -->
    <div class="col-12 d-flex justify-content-between mb-3">
                <button
                  type="button"
                  class="rounded-xl bg-orange-600 px-5 py-3 text-center font-medium text-white hover:bg-orange-700 sm:min-w-[140px]"
                  @click="cancel"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="rounded-xl bg-[#0093EE] px-5 py-3 text-center font-medium text-white hover:bg-[#007BCC] disabled:opacity-60 sm:min-w-[180px]"
                >
                  {{ loading ? 'Enregistrement…' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
</div>
          <!-- mini toast -->
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // OK même si pas monté, on checkera sa présence
import { toast } from 'vue3-toastify';

// ---------- Config API (adapte si besoin)
const CREATE_URL = '/api/categories/add' // ex: '/api/categories' si RESTful

// ---------- Router (tolérant si non monté)
const router = useRouter?.() // peut être undefined si pas de Router

const loading = ref(false)

const form = reactive({
  name: '',
  subcategories: [] // tableau de strings
})

const errors = reactive({
  name: '',
  subcategories: ''
})

function addSub () {
  if (!Array.isArray(form.subcategories)) form.subcategories = []
  form.subcategories.push('')
}
function removeSub (i) {
  if (!Array.isArray(form.subcategories)) return
  form.subcategories.splice(i, 1)
}

function validate () {
  errors.name = ''
  errors.subcategories = ''

  if (!form.name) errors.name = 'Le nom de la catégorie est requis.'

  // nettoyage + déduplication (insensible à la casse)
  if (!Array.isArray(form.subcategories)) form.subcategories = []
  form.subcategories = form.subcategories.map(s => (s || '').trim()).filter(Boolean)

  const lowerSet = new Set()
  for (const s of form.subcategories) {
    const key = s.toLowerCase()
    if (lowerSet.has(key)) {
      errors.subcategories = 'Sous-catégories en double détectées.'
      break
    }
    lowerSet.add(key)
  }

  return !errors.name && !errors.subcategories
}

function goToIndex () {
  const url = '/admin/categorie' // page liste côté Blade
  if (router && typeof router.push === 'function') {
    try {
      router.push(url) // si app SPA
      return
    } catch (e) { /* fallback */ }
  }
  window.location.href = url // Blade / sans router
}

async function submit () {
  if (!validate()) return
  loading.value = true
  try {
    await axios.post(CREATE_URL, {
      name: form.name,
      subcategories: form.subcategories
    }, {
      headers: { 'Accept': 'application/json' }
    })

    toast.success('Catégorie créée avec succès.')
    setTimeout(goToIndex, 700)
  } catch (e) {
      toast.error(" Une erreur est survenue lors de l’enregistrement.");
    setTimeout(() => (toast.value = ''), 2500)
  } finally {
    loading.value = false
  }
}

function cancel () {
  goToIndex()
}
</script>
