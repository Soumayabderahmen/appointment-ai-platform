<!-- ListeCategorie.vue -->
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const props = defineProps({
  categories: { type: Array, default: () => [] }
})

/* -------- State -------- */
const all = ref([...props.categories])
watch(() => props.categories, v => { all.value = [...v] })

/* Recherche + pagination */
const search = ref('')
const page = ref(1)
const pageSize = 6
const filteredAll = computed(() => {
  const q = (search.value || '').toLowerCase().trim()
  let arr = all.value.slice().sort((a, b) => new Date(a.created_at) > new Date(b.created_at) ? -1 : 1)
  if (q) arr = arr.filter(c => (c.name || '').toLowerCase().includes(q))
  return arr
})
const pageCount = computed(() => Math.max(1, Math.ceil(filteredAll.value.length / pageSize)))
const paged = computed(() => {
  if (page.value > pageCount.value) page.value = pageCount.value
  const start = (page.value - 1) * pageSize
  return filteredAll.value.slice(start, start + pageSize)
})

/* Date JJ/MM/AAAA */
function formatDate (iso) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return iso }
}

/* CSRF (Blade) */
const tokenMeta = document.querySelector('meta[name="csrf-token"]')
if (tokenMeta) axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.getAttribute('content')

/* Delete catégorie */
const showDelete = ref(false)
const deleteTarget = ref(null)
const deleteLoading = ref(false)
function askDelete (row) { closeMenu(); deleteTarget.value = { id: row.id, name: row.name }; showDelete.value = true }
function closeDelete () { if (!deleteLoading.value) { showDelete.value = false; deleteTarget.value = null } }
async function confirmDelete () {
  if (!deleteTarget.value) return
  deleteLoading.value = true
  try {
    await axios.delete(`/api/categories/${deleteTarget.value.id}/delete`)
    all.value = all.value.filter(x => x.id !== deleteTarget.value.id)
    toast.success('Catégorie supprimée avec succès')
  } catch (e) {
    toast.error('Une erreur est survenue lors de la suppression.')
  } finally {
    deleteLoading.value = false
    closeDelete()
  }
}

/* Menu (si besoin plus tard) */
const openMenuId = ref(null)
function toggleMenu (id) { openMenuId.value = openMenuId.value === id ? null : id }
function closeMenu () { openMenuId.value = null }
function onDocClick () { closeMenu() }
function onKey (e) { if (e.key === 'Escape') { closeMenu(); if (showDetails.value) closeDetails() } }
onMounted(() => { document.addEventListener('click', onDocClick); document.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { document.removeEventListener('click', onDocClick); document.removeEventListener('keydown', onKey) })

/* Détails (modal) */
const showDetails = ref(false)
const current = ref(null)
const detailsLoading = ref(false)

async function openDetails (row) {
  closeMenu()
  showDetails.value = true
  detailsLoading.value = true
  current.value = null
  // Empêcher le scroll de la page sous le modal
  document.documentElement.style.overflow = 'hidden'
  try {
    const { data } = await axios.get(`/api/categories/${row.id}`)
    current.value = data
  } catch {
    current.value = { ...row }
    try {
      const { data } = await axios.get(`/api/categories/${row.id}/subcategories`)
      current.value.subcategories = data
    } catch {}
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails () {
  showDetails.value = false
  current.value = null
  document.documentElement.style.overflow = ''
}

/* Suppression d’un sous-domaine (actions du modal) */
async function deleteSubcategory (sub) {
  if (!sub?.id) { toast.error('ID sous-domaine manquant.'); return }
  try {
    await axios.delete(`/api/subcategories/${sub.id}/delete`)
    current.value.subcategories = (current.value.subcategories || []).filter(x => x.id !== sub.id)
    toast.success('Sous-domaine supprimé.')
  } catch (e) {
    toast.error("Impossible de supprimer le sous-domaine.")
  }
}
</script>

<template>
  <div class="p-4 sm:p-6">
    <!-- Barre top -->
    <div class="mb-4 flex items-center justify-between gap-3">
      <!-- Search pill -->
      <div class="relative max-w-[260px] w-full">
        <input
          v-model="search"
          type="text"
          placeholder="Chercher"
          class="w-full rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0093EE]/30 focus:border-[#0093EE]"
        />
        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path d="M17.5 17.5L13.5 13.5M15 8.75a6.25 6.25 0 11-12.5 0 6.25 6.25 0 0112.5 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Ajouter une catégorie -->
      <a
        href="/admin/categorie/create"
        class="inline-flex items-center gap-2 rounded-xl bg-[#0093EE] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#007BCC] shadow"
      >
        Ajouter une catégorie
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" />
          </svg>
        </span>
      </a>
    </div>

    <!-- Header colonnes -->
    <div class="grid grid-cols-[1fr_0.5fr_0.8fr_1fr] items-center px-6 py-3 font-semibold text-sm rounded-[12px]">
      <div class="text-center text-[#005183]"><b>Domaine d'expertise</b></div>
      <div class="text-center text-[#005183]"><b>Sous Domaine</b></div>
      <div class="text-center text-[#005183]"><b>Date de Création</b></div>
      <div class="text-center text-[#005183]"><b>Actions</b></div>
    </div>

    <!-- Lignes -->
    <div class="space-y-3">
      <div
        v-for="c in paged"
        :key="c.id"
        class="grid grid-cols-[1fr_0.5fr_0.8fr_1fr] items-center bg-white rounded-xl px-6 py-6 hover:shadow-md transition relative"
        style="height:70px;background:#FFF;box-shadow:10px 8px 20px 0px rgba(0,81,131,0.25);border-radius:15px;"
      >
        <!-- Domaine -->
        <div class="text-center text-[#0093EE] font-medium">{{ c.name }}</div>

        <!-- Sous-domaine (bouton œil) -->
        <div class="flex justify-center">
          <button
            type="button"
            class="inline-flex h-9 w-10 items-center justify-center rounded-xl bg-[#0093EE] text-white hover:bg-[#007BCC]"
            @click.stop="openDetails(c)"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11 3a3 3 0 100-6 3 3 0 000 6z"/>
            </svg>
          </button>
        </div>

        <!-- Date -->
        <div class="flex justify-center text-[#0093EE]">
          {{ formatDate(c.created_at) }}
        </div>

        <!-- Actions -->
        <div class="flex justify-center gap-3">
          <a
            :href="`/admin/categorie/${c.id}/edit`"
            class="inline-flex items-center gap-2 rounded-xl bg-[#0093EE] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#007BCC]"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.5 2.5 0 10-3.536-3.536L4 16.464V20z"/>
            </svg>
            Modifier
          </a>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[#F26616] px-4 py-2.5 text-sm font-medium text-white hover:brightness-95"
            @click.stop="askDelete(c)"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0h8l-1-2H10l-1 2z"/>
            </svg>
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-center gap-2">
      <button class="h-9 w-9 rounded-lg border border-gray-200 text-[#0093EE] hover:bg-gray-50 disabled:opacity-50"
              @click="page = Math.max(1, page - 1)" :disabled="page === 1" aria-label="Page précédente">‹</button>

      <button
        v-for="n in pageCount"
        :key="n"
        class="h-9 min-w-9 rounded-lg px-3 text-sm"
        :class="n === page ? 'bg-[#0093EE] text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'"
        @click="page = n"
      >{{ n }}</button>

      <button class="h-9 w-9 rounded-lg border border-gray-200 text-[#0093EE] hover:bg-gray-50 disabled:opacity-50"
              @click="page = Math.min(pageCount, page + 1)" :disabled="page === pageCount" aria-label="Page suivante">›</button>
    </div>


<teleport to="body">
  <transition name="fade">
    <div
      v-if="showDetails"
      class="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
    >
    
      <div
        class="absolute inset-0 pointer-events-none
               bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0.35)_0%,rgba(17,24,39,0.55)_55%,rgba(17,24,39,0.85)_100%)]">
      </div>

     

    
      <div class="absolute inset-0 flex items-center justify-center px-4 py-6">
        <div
          class="relative w-full max-w-[560px] overflow-hidden
                 rounded-[26px] bg-white shadow-2xl"
          @click.stop
        >
          <div class="px-7 pt-8 pb-7">
            <!-- icône œil -->
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0093EE]/12">
              <svg class="h-8 w-8 text-[#0093EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11 3a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
            </div>

            <!-- titre -->
            <h3 class="mb-6 text-center text-[20px] font-extrabold text-[#0093EE]">
              Les sous domaines d’expertises
            </h3>

            <!-- liste -->
            <div v-if="(current?.subcategories?.length || 0) > 0" class="space-y-3">
              <div
                v-for="s in current.subcategories"
                :key="s.id || s.name"
                class="flex items-center justify-between"
              >
                <span class="text-[15px] font-semibold text-gray-800">
                  {{ s.name }}
                </span>

              
                <!-- actions à droite : sur UNE SEULE LIGNE -->
<div class="flex items-center gap-2 shrink-0">
  <!-- Modifier -->
  <a
    :href="`/admin/categorie/${current.id}/edit`"
    class="grid h-8 w-8 place-items-center rounded-md bg-[#0093EE] text-white hover:bg-[#007BCC]"
    title="Modifier"
  >
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.5 2.5 0 10-3.536-3.536L4 16.464V20z"/>
    </svg>
  </a>

  <!-- Supprimer -->

</div>

              </div>
            </div>
            <div v-else class="text-center text-sm text-gray-500">Aucune sous-catégorie.</div>

            <!-- bouton Fermer (centré, moins large) -->
            <button
              type="button"
              class="mt-6 w-[85%] mx-auto block rounded-[14px] bg-[#F26616] px-5 py-3 text-center font-semibold text-white hover:brightness-95"
              @click="closeDetails"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</teleport>


    <!-- Modal confirmation suppression -->
    <transition name="fade">
      <div v-if="showDelete" class="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60" @click="closeDelete"></div>
        <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 bg-[#0093EE] text-white">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18M8 6v-.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V6m-1 0l-.867 12.142A2 2 0 0112.138 20H11.86a2 2 0 01-1.995-1.858L9 6h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Confirmer la suppression</h3>
            </div>
            <button class="rounded-lg p-2 hover:bg-white/10" @click="closeDelete" aria-label="Fermer">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="px-6 py-5">
            <p class="text-sm text-gray-700">
              Êtes-vous sûr de vouloir supprimer <b>« {{ deleteTarget?.name }} »</b> ?<br />
              Cette action est <span class="font-semibold">irréversible</span>.
            </p>
          </div>

          <div class="flex gap-3 px-6 pb-6 justify-end">
            <button
              type="button"
              class="rounded-xl border border-gray-200 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
              :disabled="deleteLoading"
              @click="closeDelete"
            >Annuler</button>

            <button
              type="button"
              class="rounded-xl bg-[#F26616] px-5 py-2.5 font-medium text-white hover:brightness-95 disabled:opacity-60"
              :disabled="deleteLoading"
              @click="confirmDelete"
            >
              {{ deleteLoading ? 'Suppression…' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .12s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
