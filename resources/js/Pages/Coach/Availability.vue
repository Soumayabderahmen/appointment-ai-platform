<script setup>
import { ref, watch, computed ,onMounted, onBeforeUnmount} from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

const props = defineProps({
  availabilities: { type: Array, default: () => [] },
  coachId: { type: [Number, String], required: true },
});
const today = new Date().toISOString().split("T")[0];

// state
const localAvailability = ref([]);
watch(() => props.availabilities, v => { localAvailability.value = [...(v||[])]; }, { immediate:true });

const showAddModal = ref(false);
const showEditModal = ref(false);
const isEditing = ref(false);

// forms
const form = ref({
  coach_id: Number(props.coachId),
  date: "", start_time: "", end_time: "",
  statut: "available", day_of_week: "",
  honoraire: "", nb_place: "", titre: "",
});
watch(() => props.coachId, id => form.value.coach_id = Number(id), { immediate:true });

const editForm = ref({
  id:null, date:"", start_time:"", end_time:"",
  day_of_week:"", honoraire:"", nb_place:"", titre:""
});

// helpers
const getDayOfWeek = (d) => {
  const days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  return d ? days[new Date(d).getDay()] : "";
};
const getDurationLabel = (s,e) => {
  if(!s||!e) return "—";
  const [sh,sm]=s.split(":").map(Number); const [eh,em]=e.split(":").map(Number);
  let m=(eh*60+em)-(sh*60+sm); if(m<0) m+=1440;
  const h=Math.floor(m/60), r=m%60;
  if(h&&r) return `${h} h ${r} min`; if(h) return `${h} heure${h>1?"s":""}`; return `${r} min`;
};

// CRUD
const resetForm = ()=>Object.assign(form.value,{date:"",start_time:"",end_time:"",statut:"available",day_of_week:"",honoraire:"",nb_place:"",titre:""});
const resetEditForm = ()=>{ Object.assign(editForm.value,{id:null,date:"",start_time:"",end_time:"",day_of_week:"",honoraire:"",nb_place:"",titre:""}); isEditing.value=false; };

const submitAvailability = async () => {
  form.value.day_of_week = getDayOfWeek(form.value.date);
  if(!form.value.coach_id) return toast.error("Coach ID manquant !");
  try{
    const {data}=await axios.post("/api/coach/availability/", form.value);
    localAvailability.value.push(data.availability);
    toast.success(data.message || "Disponibilité ajoutée avec succès !");
    resetForm(); showAddModal.value=false;
  }catch(e){
    const msg = e?.response?.data?.errors ? Object.values(e.response.data.errors).flat().join(" ") : (e?.response?.data?.message || "Erreur inconnue.");
    toast.error(msg);
  }
};

const updateStatus = async (id, s) => {
  if(!s) return toast.warning("Veuillez sélectionner un statut.");
  try{
    const {data}=await axios.put(`/api/coach/availability/${id}/update-status`,{statut:s});
    toast.success(data.message || "Statut modifié avec succès !");
  }catch(e){ toast.error(e?.response?.data?.message || "Erreur lors de la modification."); }
};

const showConfirmModal = ref(false);
const itemToDeleteId = ref(null);
const confirmDelete = (id)=>{ itemToDeleteId.value=id; showConfirmModal.value=true; };
const performDelete = async () => {
  try{
    await axios.delete(`/api/coach/availability/${itemToDeleteId.value}/`);
    localAvailability.value = localAvailability.value.filter(a=>a.id!==itemToDeleteId.value);
    toast.success("Disponibilité supprimée avec succès !");
  }catch(e){ toast.error(e?.response?.data?.message || "Erreur lors de la suppression."); }
  finally{ showConfirmModal.value=false; itemToDeleteId.value=null; }
};

const openEditModal = (a)=>{
  isEditing.value=true;
  Object.assign(editForm.value,{
    id:a.id, date:a.date, start_time:a.start_time, end_time:a.end_time,
    day_of_week:getDayOfWeek(a.date), honoraire:a.honoraire, nb_place:a.nb_place, titre:a.titre
  });
  showEditModal.value=true;
};
const updateTimes = async ()=>{
  editForm.value.day_of_week = getDayOfWeek(editForm.value.date);
  const fmt=(t)=>t?.substring(0,5)||null;
  const payload={ date:editForm.value.date, start_time:fmt(editForm.value.start_time), end_time:fmt(editForm.value.end_time),
    day_of_week:editForm.value.day_of_week, honoraire:editForm.value.honoraire, nb_place:editForm.value.nb_place, titre:editForm.value.titre };
  try{
    const {data}=await axios.put(`/api/coach/availability/${editForm.value.id}/update-times`, payload);
    const u=data.availability; const i=localAvailability.value.findIndex(x=>x.id===u.id);
    if(i!==-1) localAvailability.value[i]=u; else localAvailability.value.push(u);
    toast.success(data.message || "Disponibilité modifiée avec succès !");
    resetEditForm(); showEditModal.value=false;
  }catch(e){ toast.error(e?.response?.data?.message || "Erreur lors de la modification."); }
};

// tri + pagination
const rowsSorted = computed(() =>
  [...localAvailability.value].sort((a,b) =>
    new Date(b.created_at) - new Date(a.created_at) // tri par created_at DESC
  )
);

const pageSize = ref(6), currentPage=ref(1);
const totalPages = computed(()=>Math.max(1,Math.ceil(rowsSorted.value.length/pageSize.value)));
const pageRows = computed(()=>rowsSorted.value.slice((currentPage.value-1)*pageSize.value, currentPage.value*pageSize.value));
const prevPage=()=>{ if(currentPage.value>1) currentPage.value--; };
const nextPage=()=>{ if(currentPage.value<totalPages.value) currentPage.value++; };

const openMenuId = ref(null);
const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};
const closeMenu = () => (openMenuId.value = null);

const onDocClick = (e) => {
  // ferme si on clique en dehors du popover
  if (!(e.target.closest && e.target.closest(".action-popover"))) closeMenu();
};
const onEsc = (e) => { if (e.key === "Escape") closeMenu(); };

onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onEsc);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onEsc);
});
</script>

<template>
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0" style="color:#005183;"></h5>
    <button class="btn btn-primary d-flex align-items-center gap-2" @click="showAddModal=true">
      <span class="fs-5">＋</span> Ajouter une disponibilité
    </button>
  </div>

  <!-- Head row -->
  <div class="flex items-center px-4 py-3 font-semibold text-sm" style="border-radius:12px;">
    <div class="w-1/5 text-center"  style="color:#005183;"><b>Titre de Formation</b></div>
    <div class="w-1/6 text-center"  style="color:#005183;"><b>Date</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Début</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Fin</b></div>
    <div class="w-1/6 text-center"  style="color:#005183;"><b>Durée</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Places</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Prix</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Statut</b></div>
    <div class="w-1/12 text-center" style="color:#005183;"><b>Action</b></div>
  </div>

  <!-- Rows -->
  <div class="flex flex-col gap-3 mt-2">
    <div v-for="a in pageRows" :key="a.id"
         class="flex items-center justify-between rounded-xl px-4 py-4 hover:shadow-md transition"
         style="background:#FFF; box-shadow:10px 8px 20px rgba(0,81,131,.25); border-radius:15px;">
      <div class="w-1/5  text-center text-sm" style="color:#0093EE;">{{ a.titre ?? "—" }}</div>
      <div class="w-1/6  text-center text-sm" style="color:#0093EE;">{{ a.date }}</div>
      <div class="w-1/12 text-center text-sm" style="color:#0093EE;">{{ a.start_time }}</div>
      <div class="w-1/12 text-center text-sm" style="color:#0093EE;">{{ a.end_time }}</div>
      <div class="w-1/6  text-center text-sm" style="color:#0093EE;">{{ getDurationLabel(a.start_time,a.end_time) }}</div>
      <div class="w-1/12 text-center text-sm" style="color:#0093EE;">{{ a.nb_place ?? "—" }}</div>
      <div class="w-1/12 text-center text-sm" style="color:#0093EE;">{{ a.honoraire ?? "—" }} €</div>
      <div class="w-1/12 text-center">
        <select v-model="a.statut" @change="updateStatus(a.id,a.statut)"
                class="form-select form-select-sm text-white text-center"
                :class="a.statut==='available' ? 'bg-success' : 'bg-danger'"style="
    border-radius: 10px;
">
          <option value="available">Disponible</option>
          <option value="unavailable">Indisponible</option>
        </select>
      </div>
      <div class="w-1/12 text-center">
  <div class="action-popover position-relative d-inline-block">
    <!-- bouton style "pastille bleue ...", clique = toggle -->
    <button type="button"
            class="menu-trigger"
            @click.stop="toggleMenu(a.id)"
            aria-haspopup="true"
            :aria-expanded="openMenuId===a.id">
      <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="visually-hidden">Ouvrir le menu d’actions</span>
    </button>

    <!-- popover -->
   <div v-if="openMenuId===a.id" class="menu-panel shadow">
  <button
    class="menu-items flex items-center gap-2 whitespace-nowrap"
    @click.stop="openEditModal(a)"
  >
    <svg class="shrink-0" viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M3 17.25V21h3.75l11-11-3.75-3.75-11 11zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"/>
    </svg>
    <span>Modifier</span>
  </button>

  <button
    class="menu-items danger flex items-center gap-2 whitespace-nowrap"
    @click.stop="confirmDelete(a.id)"
  >
    <svg class="shrink-0" viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M6 7h12l-1 14H7L6 7zm3-4h6l1 2h4v2H4V5h4l1-2z"/>
    </svg>
    <span>Supprimer</span>
  </button>
</div>

  </div>
</div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
    <button class="btn btn-light" :disabled="currentPage===1" @click="prevPage">‹</button>
    <span>Page {{ currentPage }} / {{ totalPages }}</span>
    <button class="btn btn-light" :disabled="currentPage===totalPages" @click="nextPage">›</button>
  </div>

  <!-- MODALE AJOUT — design identique à la maquette -->
  <div v-if="showAddModal" class="bc-modal" @keydown.esc="showAddModal=false" tabindex="0">
    <div class="bc-modal-card">
      <button class="bc-close" @click="showAddModal=false">×</button>

      <div class="bc-hero">
        <div class="bc-hero-icon">＋</div>
        <h4>Ajoutez une disponibilité</h4>
        <p>Ajoutez une disponibilité pour avoir des réunions de formation</p>
      </div>

      <form @submit.prevent="submitAvailability" class="row g-3">
        <!-- Titre -->
        <div class="col-12">
          <label class="bc-label">Titre de la Formation*</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <!-- crayon -->
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M3 17.25V21h3.75l11-11-3.75-3.75-11 11zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"/></svg>
            </span>
            <input class="bc-input" type="text" v-model="form.titre" placeholder="Coaching stratégique" required>
          </div>
        </div>

        <!-- Date -->
        <div class="col-12 col-md-6">
          <label class="bc-label">Date*</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <!-- calendrier -->
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10h5v5H7z"/><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
            </span>
            <input class="bc-input" type="date" v-model="form.date" :min="today" required>
          </div>
        </div>

        <!-- Heures -->
        <div class="col-6 col-md-3">
          <label class="bc-label">Heure de début*</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm1 11a1 1 0 0 1-1 1H7V11h4V6h2Z"/></svg>
            </span>
            <input class="bc-input" type="time" v-model="form.start_time" required>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <label class="bc-label">Heure de fin*</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm-1 6h2v6h-2Zm1 9a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 16Z"/></svg>
            </span>
            <input class="bc-input" type="time" v-model="form.end_time" required>
          </div>
        </div>

        <!-- Places -->
        <div class="col-6 col-md-4">
          <label class="bc-label">Nombre de places</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <!-- users -->
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.06 1.16.84 1.97 1.97 1.97 3.44V20h6v-3.5C23 14.17 18.33 13 16 13z"/></svg>
            </span>
            <input class="bc-input" type="number" min="1" v-model="form.nb_place" placeholder="20">
          </div>
        </div>

        <!-- Prix -->
        <div class="col-6 col-md-4">
          <label class="bc-label">Honoraire (€)</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <!-- euro -->
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.5 5.5a6.5 6.5 0 0 0-6.32 5H6v2h2.86a6.5 6.5 0 0 0 6.64 5 6.47 6.47 0 0 0 4.8-2.15l-1.5-1.32A4.48 4.48 0 0 1 15.5 16a4.5 4.5 0 0 1-4.09-2.5h5.59v-2h-6.2a4.5 4.5 0 0 1 4.7-3.5 4.48 4.48 0 0 1 3.3 1.47l1.5-1.33A6.47 6.47 0 0 0 15.5 5.5Z"/></svg>
            </span>
            <input class="bc-input bc-input-suffix" type="number" step="0.01" v-model="form.honoraire" placeholder="50.00">
            <span class="bc-suffix">€</span>
          </div>
        </div>

        <!-- Statut -->
        <div class="col-12 col-md-4">
          <label class="bc-label">Statut</label>
          <div class="bc-field">
            <span class="bc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
            </span>
            <select class="bc-input" v-model="form.statut">
              <option value="available">Disponible</option>
              <option value="unavailable">Indisponible</option>
            </select>
          </div>
        </div>

        <div class="col-12 d-flex justify-content-center gap-2 mt-2">
          <button type="button" class="bc-btn bc-btn-ghost" @click="showAddModal=false">Annuler</button>
          <button type="submit" class="bc-btn bc-btn-primary">Créer la disponibilité</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODALE ÉDITION — même style -->
  <div v-if="showEditModal" class="bc-modal" @keydown.esc="showEditModal=false" tabindex="0">
    <div class="bc-modal-card">
      <button class="bc-close" @click="showEditModal=false">×</button>

      <div class="bc-hero bc-hero--compact">
        <div class="bc-hero-icon">✎</div>
        <h4>Modifier la disponibilité</h4>
      </div>

      <form @submit.prevent="updateTimes" class="row g-3">
        <div class="col-12">
          <label class="bc-label">Titre de la Formation</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M3 17.25V21h3.75l11-11-3.75-3.75-11 11z"/></svg></span>
            <input class="bc-input" type="text" v-model="editForm.titre" placeholder="Titre de la formation">
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="bc-label">Date</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10h5v5H7z"/><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2z"/></svg></span>
            <input class="bc-input" type="date" :min="today" v-model="editForm.date" required>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <label class="bc-label">Heure de début</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm1 11a1 1 0 0 1-1 1H7V11h4V6h2Z"/></svg></span>
            <input class="bc-input" type="time" v-model="editForm.start_time">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <label class="bc-label">Heure de fin</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm-1 6h2v6h-2Zm1 9a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 16Z"/></svg></span>
            <input class="bc-input" type="time" v-model="editForm.end_time">
          </div>
        </div>

        <div class="col-6 col-md-4">
          <label class="bc-label">Places</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13z"/></svg></span>
            <input class="bc-input" type="number" v-model="editForm.nb_place" placeholder="20">
          </div>
        </div>

        <div class="col-6 col-md-4">
          <label class="bc-label">Honoraire (€)</label>
          <div class="bc-field">
            <span class="bc-icon"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.5 5.5a6.5 6.5 0 0 0-6.32 5H6v2h2.86a6.5 6.5 0 0 0 6.64 5 6.47 6.47 0 0 0 4.8-2.15l-1.5-1.32A4.48 4.48 0 0 1 15.5 16a4.5 4.5 0 0 1-4.09-2.5h5.59v-2h-6.2a4.5 4.5 0 0 1 4.7-3.5 4.48 4.48 0 0 1 3.3 1.47l1.5-1.33A6.47 6.47 0 0 0 15.5 5.5Z"/></svg></span>
            <input class="bc-input bc-input-suffix" type="number" step="0.01" v-model="editForm.honoraire" placeholder="60.00">
            <span class="bc-suffix">€</span>
          </div>
        </div>

        <div class="col-12 d-flex justify-content-center gap-2 mt-2">
          <button type="button" class="bc-btn bc-btn-ghost" @click="showEditModal=false">Annuler</button>
          <button type="submit" class="bc-btn bc-btn-warning">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>

  <!-- ta modale de confirmation existante -->
  <div v-if="showConfirmModal" class="modal-overlay">
    <div class="modal-content text-center">
      <h5 class="modal-title">Êtes-vous sûr de vouloir supprimer cette disponibilité ?</h5>
      <div class="mt-3 d-flex justify-content-center gap-3">
        <button class="btn btn-outline-primary btn-sm" @click="showConfirmModal=false">Annuler</button>
        <button class="btn btn-primary btn-sm" @click="performDelete">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<style>
/* ===== Overlay & Card (look & feel mockup) ===== */
.bc-modal{position:fixed; inset:0; background:rgba(0,0,0,.35); backdrop-filter:blur(3px);
  display:flex; align-items:center; justify-content:center; z-index:9999; padding:28px;}
.bc-modal-card{width:100%; max-width:740px; border-radius:26px; background:#F1FAFF;
  box-shadow:0 18px 60px rgba(0,81,131,.35); padding:34px 28px; position:relative; animation:fade-in .2s ease-out;}
.bc-close{position:absolute; top:10px; right:14px; border:none; background:transparent; font-size:28px; opacity:.55; cursor:pointer;}
@keyframes fade-in{from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);}}

/* ===== Header bloc ===== */
.bc-hero{display:flex; flex-direction:column; align-items:center; text-align:center; margin-bottom:18px;}
.bc-hero--compact{margin-bottom:6px;}
.bc-hero h4{margin:8px 0 2px; color:#003366; font-weight:700;}
.bc-hero p{margin:0; color:#6E8CA5; font-size:13px;}
.bc-hero-icon{
  width:110px; height:110px; border-radius:26px; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(180deg,#E9F5FF 0%, #D6EEFF 100%); color:#0093EE; font-size:56px; font-weight:900;
  box-shadow:0 10px 22px rgba(0,147,238,.25), inset 0 1px 0 #fff;
}

/* ===== Labels ===== */
.bc-label{display:block; font-size:12px; font-weight:700; color:#5F7D95; margin-bottom:6px;}

/* ===== Field wrapper (icône + input) ===== */
.bc-field{position:relative;}
.bc-icon{
  position:absolute; top:50%; left:14px; transform:translateY(-50%);
  color:#76A8C8; opacity:.95; display:inline-flex;
}
.bc-input{
  width:100%; height:52px; border-radius:14px; padding:12px 14px 12px 44px;
  background:#fff; border:1.5px solid #E1EEF6; color:#163B57;
  box-shadow:0 6px 16px rgba(0,81,131,.08);
  outline:none; transition:border-color .15s, box-shadow .15s;
  appearance:none;
}
.bc-input::placeholder{color:#9BB3C7;}
.bc-input:focus{border-color:#0093EE; box-shadow:0 0 0 4px rgba(0,147,238,.15);}
select.bc-input{padding-right:38px;}
.bc-input::-webkit-calendar-picker-indicator{filter:grayscale(100%); opacity:.6;}
/* suffix € */
.bc-input-suffix{padding-right:48px;}
.bc-suffix{
  position:absolute; right:14px; top:50%; transform:translateY(-50%);
  color:#6A8FA8; font-weight:700;
}

/* ===== Buttons (look mockup) ===== */
.bc-btn{height:46px; padding:0 18px; border-radius:14px; font-weight:700; border:0;}
.bc-btn-primary{background:#0093EE; color:#fff; box-shadow:0 8px 18px rgba(0,147,238,.35);}
.bc-btn-warning{background:#FFB156; color:#fff; box-shadow:0 8px 18px rgba(255,177,86,.35);}
.bc-btn-ghost{background:#E7F2FB; color:#0B74BD;}
.bc-btn:hover{filter:brightness(.98);}

/* ta modale de confirmation existante conserve son style */
.modal-overlay{
  position:fixed; inset:0; background:rgba(0,0,0,.35);
  backdrop-filter: blur(3px);
  display:flex; align-items:center; justify-content:center;
  z-index:9999; padding:24px;
}.modal-content{background:#fff; border-radius:25px; padding:40px; width:100%; max-width:700px;
  box-shadow:0 10px 30px rgba(0,0,0,.3);}

  .menu-trigger{
  background:#0093EE; border:0; border-radius:12px;
  width:54px; height:36px; display:flex; align-items:center; justify-content:center;
  box-shadow:0 8px 18px rgba(0,147,238,.35); cursor:pointer;
}
.menu-trigger:focus{ outline: none; box-shadow:0 0 0 4px rgba(0,147,238,.2); }
.menu-trigger .dots{ display:flex; gap:6px; align-items:center; }
.menu-trigger .dots i{ width:6px; height:6px; background:#fff; border-radius:50%; display:block; }

/* popover */
.action-popover{ position:relative; }
.menu-panel{
  position:absolute; right:0; top:42px; z-index:20;
  background:#fff; border-radius:14px; min-width:180px; padding:8px;
  border:1px solid #E6EEF6; box-shadow:0 18px 40px rgba(0,81,131,.18);
}
.menu-items{
  display: inline-flex;         
  align-items: center;          
  gap: 10px;                     
  white-space: nowrap;         
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  background: transparent;
  border: 0;
  color: #134B6D;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}
.menu-items svg{
  flex: 0 0 18px;                /* icône taille stable */
  display: inline-block;
}
.menu-items span{
  display: inline-block;
  line-height: 1;
}
.menu-items:hover{ background:#EAF5FF; }
.menu-items.danger{ color:#B00020; }
.menu-items.danger:hover{ background:#FDE7EA; }

/* accessibilité */
.visually-hidden{
  position:absolute; width:1px; height:1px; padding:0; margin:-1px;
  overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0;
}
</style>
