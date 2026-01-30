<template>
  <div class="mt-3 formulaire">
        <div class="col-12">
            <div class="card card-1">
                <div class="card-body px-lg-4 px-md-3 px-2">
                    <div class="bs-stepper wizard-numbered shadow-none mt-2">
<div class="row">
  <div class="col-12 mb-4">
          <h4> Modifier un domaine d’expertise IA</h4>
           
      
        <p class="text-orange fw-bold">*Représente un champ obligatoire</p>
  </div>

        <form class="space-y-7" @submit.prevent="submit">
          <!-- Titre du domaine -->
         <div class="col-12 mb-4">
      <label class="form-label">Titre du domaine  <span class="text-[#F26616]">*</span>
          </label>
              
            <input
              v-model.trim="form.name"
              type="text"
              placeholder="Entrer un titre"
              class="form-control"
            />
            <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
          </div>
    <div class="col-12 d-flex justify-content-end mb-3">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-[#0093EE] px-4 py-2.5
                       text-white font-semibold shadow hover:bg-[#007BCC]"
                @click="addSub"
              >
                Ajouter un sous domaine d’expertise
                <span
                  class="inline-grid place-items-center h-6 w-6 rounded-full bg-white/25"
                >
                  +
                </span>
              </button>
            </div>
          <!-- Sous-domaines -->
          <div class="col-12 mb-4">
      <label class="form-label">Nom du sous domaine  <span class="text-[#F26616]">*</span>
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

            <!-- Ajouter un sous domaine -->
       

            <p v-if="errors.subcategories" class="mt-2 text-sm text-red-600">
              {{ errors.subcategories }}
            </p>
          </div>

          <!-- Footer boutons -->
    <div class="col-12 d-flex justify-content-between mb-3">
  <!-- Annuler -->
  <a
    :href="`/admin/categorie`"
    class="inline-flex items-center justify-center rounded-xl bg-[#F26616] px-6 py-3
           text-white font-semibold shadow hover:brightness-95 sm:min-w-[160px]"
  >
    Annuler
  </a>

  <!-- Enregistrer -->
  <button
    type="submit"
    :disabled="loading"
    class="inline-flex items-center justify-center rounded-xl bg-[#0093EE] px-6 py-3
           text-white font-semibold shadow hover:bg-[#007BCC] disabled:opacity-60
           sm:min-w-[240px]"
  >
    {{ loading ? 'Enregistrement…' : 'Enregistrer les modifications' }}
  </button>
</div>

        </form>
      </div>
</div></div></div></div></div>
</template>


<script setup>
import { reactive, ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // OK même si pas monté, on checkera sa présence
import { toast } from 'vue3-toastify';

const props = defineProps({
  categorie: { type: Object, required: true } // {id,name,subcategories:[{id,name,...}]}
})

const loading = ref(false)

const form = reactive({
  name: '',
  subcategories: [] // strings
})
const errors = reactive({ name: '', subcategories: '' })
const router = useRouter?.() // peut être undefined si pas de Router

// Pré-remplir depuis props
watchEffect(() => {
  form.name = props.categorie?.name || ''
  form.subcategories = (props.categorie?.subcategories || []).map(s => s.name)
})

// helpers
function addSub(){ form.subcategories.push('') }
function removeSub(i){ form.subcategories.splice(i, 1) }

function validate(){
  errors.name = ''; errors.subcategories = ''
  if (!form.name) errors.name = 'Le nom de la catégorie est requis.'
  form.subcategories = form.subcategories.map(s => (s||'').trim()).filter(Boolean)
  const set = new Set(form.subcategories.map(s => s.toLowerCase()))
  if (set.size !== form.subcategories.length) errors.subcategories = 'Sous-catégories en double détectées.'
  return !errors.name && !errors.subcategories
}

// CSRF (pour routes web)
const tokenMeta = document.querySelector('meta[name="csrf-token"]')
if (tokenMeta) axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.getAttribute('content')

// Update via web route PUT /admin/categorie/{id}
async function submit(){
  if (!validate()) return
  loading.value = true
  try {
    await axios.put(`/api/categories/${props.categorie.id}/edit`, {
      name: form.name,
      subcategories: form.subcategories
    })
   toast.success('Catégorie mis à jour avec succès.')
    setTimeout(goToIndex, 700)
  } catch (e){
    toast.errors = e?.response?.data?.message || 'Erreur lors de la mise à jour.'
    setTimeout(() => (toast.value = ''), 2500)
  } finally { loading.value = false }
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

// Delete via web route DELETE /admin/categorie/{id}
async function destroy(){
  if (!confirm('Supprimer définitivement cette catégorie ?')) return
  loading.value = true
  try {
    await axios.delete(`/api/categories/${props.categorie.id}/delete`)
    toast.value = 'Catégorie supprimée.'
    setTimeout(() => window.location.href = '/admin/categorie', 700)
  } catch (e){
    toast.value = e?.response?.data?.message || 'Suppression impossible.'
    setTimeout(() => (toast.value = ''), 2500)
  } finally { loading.value = false }
}

function cancel () {
  goToIndex()
}
</script>
