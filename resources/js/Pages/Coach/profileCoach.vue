<!-- resources/js/components/ProfileCoach.vue -->
<script setup>
import { ref, defineProps, watch, computed , onMounted, onBeforeUnmount} from "vue";
import axios from "axios";
import Chart from "chart.js/auto";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { toast } from 'vue3-toastify';

const props = defineProps({
  coach: Object,
  availabilities: Array,
  coachs: Object,
  myReservations: { type: Array, default: () => [] },
  canFilterByStartup: { type: Boolean, default: false },
  tabs: {
    type: Array,
    default: () => [
      { name: "À propos", url: "", icon: "🔵" },
      { name: "Les Disponibilités", url: "", icon: "📅" },
      { name: "Les Statistiques", url: "", icon: "📋" },
      { name: "Les réservations", url: "", icon: "📋" },
    ],
  },
});

/* ---------- Réservations ---------- */
const allReservations = ref([...props.myReservations]);
const reservations    = ref([...allReservations.value]);

// état/pagination
const loadingRes = ref(false);
const errorRes   = ref("");
const page       = ref(1);
const perPage    = ref(5); // 🔹 5 par page

const totalRows = computed(() => reservations.value?.length || 0);
const lastPage  = computed(() => Math.max(1, Math.ceil(totalRows.value / perPage.value)));

const pagedReservations = computed(() => {
  const start = (page.value - 1) * perPage.value;
  return reservations.value.slice(start, start + perPage.value);
});

// Fenêtre de pagination (max 5 boutons)
const pages = computed(() => {
  const maxBtns = 5;
  let start = Math.max(1, page.value - Math.floor(maxBtns / 2));
  let end   = Math.min(lastPage.value, start + maxBtns - 1);
  start     = Math.max(1, end - maxBtns + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const goTo  = (p) => { if (p < 1) p = 1; if (p > lastPage.value) p = lastPage.value; page.value = p; };
const prev  = () => goTo(page.value - 1);
const next  = () => goTo(page.value + 1);

// Si Blade renvoie à nouveau la page avec d’autres données
watch(
  () => props.myReservations,
  (val) => {
    allReservations.value = Array.isArray(val) ? [...val] : [];
    reservations.value    = [...allReservations.value];
    page.value = 1;
  }
);

// Filtre (si activé)
const startupSearch = ref("");
const selectedStartupId = ref(null);

const uniqueStartups = computed(() => {
  const map = new Map();
  for (const r of allReservations.value) {
    if (r?.startup?.id && r?.startup?.name) map.set(r.startup.id, r.startup.name);
  }
  return Array.from(map, ([id, name]) => ({ id, name }));
});

watch([selectedStartupId, startupSearch], () => {
  page.value = 1;
  let rows = [...allReservations.value];

  if (props.canFilterByStartup && selectedStartupId.value) {
    rows = rows.filter((r) => r?.startup?.id === selectedStartupId.value);
  } else if (props.canFilterByStartup && startupSearch.value.trim()) {
    const q = startupSearch.value.toLowerCase();
    rows = rows.filter(
      (r) =>
        (r?.startup?.name || "").toLowerCase().includes(q) ||
        (r?.startup?.email || "").toLowerCase().includes(q)
    );
  }
  reservations.value = rows;
});
const menuOpenId    = ref(null);      // id de la réservation dont le menu est ouvert
const showConfirm   = ref(false);     // modal de confirmation
const deleteTarget  = ref(null);      // réservation à supprimer
const deleting      = ref(false);

const toggleMenu = (id) => {
  menuOpenId.value = (menuOpenId.value === id ? null : id);
};
const closeMenu = () => { menuOpenId.value = null; };

// click hors menu → fermer
const onDocClick = (e) => {
  if (!(e.target.closest && e.target.closest(".action-cell"))) {
    closeMenu();
  }
};
onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

// demande de suppression
const askDelete = (r) => {
  deleteTarget.value = r;
  showConfirm.value = true;
  closeMenu();
};

// supprime localement + ajuste la page
const removeLocal = (id) => {
  allReservations.value = allReservations.value.filter(x => x.id !== id);
  reservations.value    = reservations.value.filter(x => x.id !== id);
  // si la page devient vide, recule d'une page
  if ((page.value - 1) * perPage.value >= reservations.value.length && page.value > 1) {
    page.value -= 1;
  }
};

const confirmDelete = async () => {
  if (!deleteTarget.value) return;
  deleting.value = true;
  errorRes.value = "";

  try {
    await axios.delete(`/api/startup/reservation/${deleteTarget.value.id}/delete`);
    removeLocal(deleteTarget.value.id);
    showConfirm.value = false;
    deleteTarget.value = null;
        toast.success(' La reservation suprrimée avec succès.')

  } catch (err) {
    errorRes.value = "Suppression impossible. Réessayez.";
    console.error(err);
    toast.error=('Suppression impossible. Réessayez.')
  } finally {
    deleting.value = false;
  }
};
const cancelDelete = () => {
  showConfirm.value = false;
  deleteTarget.value = null;
};

/* ---------- Calendrier simple ---------- */
const currentDate = ref(new Date());
const monthLabel = computed(() =>
  currentDate.value.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
);

const availByDate = computed(() => {
  const m = new Map();
  (props.availabilities || []).forEach((a) => {
    if (!a || !a.date) return;
    const key = a.date; // "YYYY-MM-DD"
    const isAvail = a.statut === "available";
    m.set(key, (m.get(key) || false) || isAvail);
  });
  return m;
});

const calendarDays = computed(() => {
  const d = new Date(currentDate.value);
  d.setDate(1);
  const firstOfMonth = new Date(d);
  const currentMonth = d.getMonth();

  const jsDay = firstOfMonth.getDay();     // 0=dimanche
  const mondayIndex = (jsDay + 6) % 7;     // semaine commence lundi

  const start = new Date(firstOfMonth);
  start.setDate(1 - mondayIndex);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);

    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    const ymd = `${y}-${m}-${day}`;

    let type = "current";
    if (dt.getMonth() !== currentMonth) type = dt < firstOfMonth ? "prev" : "next";

    days.push({ key: ymd, label: dt.getDate(), type, isAvailable: !!availByDate.value.get(ymd) });
  }
  return days;
});

const prevMonth = () => { const d = new Date(currentDate.value); d.setMonth(d.getMonth() - 1); currentDate.value = d; };
const nextMonth = () => { const d = new Date(currentDate.value); d.setMonth(d.getMonth() + 1); currentDate.value = d; };
const goToday   = () => { currentDate.value = new Date(); };

/* ---------- Onglets + Graphiques ---------- */
const activeTab = ref("À propos");
let reservationsChartInstance = null;

watch(activeTab, async (tab) => {
  if (tab === "Les Statistiques") {
    setTimeout(async () => {
      const ctx = document.getElementById("projectChart");
      if (!ctx) return;
      try {
        const res = await axios.get(`/api/coach/availability/${props.coach.id}/reservations-per-day`);
        const data = res.data || [];
        const labels = data.map((item) => item.date);
        const values = data.map((item) => item.total);

        if (reservationsChartInstance) reservationsChartInstance.destroy();

        reservationsChartInstance = new Chart(ctx, {
          type: "bar",
          data: { labels, datasets: [{ label: "Nombre de réservations", data: values }] },
          options: {
            responsive: true,
            plugins: { legend: { display: false }, title: { display: true, text: "Réservations par jour" } },
            scales: { y: { beginAtZero: true, title: { display: true, text: "Nombre" } }, x: { title: { display: true, text: "Date" } } },
          },
        });
      } catch (error) {
        console.error("Erreur chargement données chart :", error);
      }
    }, 100);
  }
});

watch(activeTab, (tab) => {
  if (tab === "Les réservations") {
    reservations.value = [...allReservations.value];
    page.value = 1;
  }
});
</script>

<template>
  <div class="profile-container">
    <!-- Sidebar gauche -->
    <div class="sidebar">
      <div class="profile-photo-container">
        <div class="profile-photo-wrapper">
          <img
            :src="coach.coach?.profile_image ? `/storage/${coach.coach.profile_image}` : '/image/default-user.png'"
            alt="Photo de profil"
            class="profile-image"
          />
        </div>
      </div>

      <div class="profile-info">
        <h2 class="profile-name">{{ coach.name || 'Formateur 3' }}</h2>
        <p class="profile-title">{{ coach.specialty || 'Consultant en transformation numérique' }}</p>
      </div>

      <nav class="sidebar-nav">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          :class="['nav-item', { 'active': activeTab === tab.name }]"
          @click="activeTab = tab.name"
        >
          <div class="nav-bullet" :class="{ 'active': activeTab === tab.name }"></div>
          <span class="nav-text">{{ tab.name }}</span>
        </div>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div v-if="activeTab !== 'Les réservations'" class="main-content">
      <!-- À propos -->
      <div v-if="activeTab === 'À propos'" class="content-section">
        <div class="section-block">
          <h3 class="section-title"><b>Description</b></h3>
          <p class="section-text">
            {{ coach.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' }}
          </p>
        </div>

        <div class="section-block">
          <h3 class="section-title"><b>Contact</b></h3>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">✉</span>
              <a href="#" class="contact-link">{{ coach.email || 'consultant2@example.com' }}</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <span class="contact-link">{{ coach.phone || '+33 6 23 45 67 89' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Disponibilités -->
      <div v-else-if="activeTab === 'Les Disponibilités'" class="content-section">
        <div class="section-block full-width">
          <div class="calendar-navigation">
            <div class="nav-left">
              <button class="nav-arrow" @click="prevMonth">‹</button>
              <span class="current-month">{{ monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1) }}</span>
              <button class="nav-arrow" @click="nextMonth">›</button>
            </div>
            <div class="nav-right">
              <button class="today-btn" @click="goToday">Aujourd'hui</button>
            </div>
          </div>

          <div class="custom-calendar">
            <div class="calendar-header">
              <div class="day-header">Lundi</div>
              <div class="day-header">Mardi</div>
              <div class="day-header">Mercredi</div>
              <div class="day-header">Jeudi</div>
              <div class="day-header">Vendredi</div>
              <div class="day-header">Samedi</div>
              <div class="day-header">Dimanche</div>
            </div>

            <div class="calendar-grid">
              <div
                v-for="cell in calendarDays"
                :key="cell.key"
                :class="[
                  'calendar-day',
                  cell.type === 'prev' ? 'prev-month' : '',
                  cell.type === 'next' ? 'next-month' : '',
                  cell.isAvailable ? 'has-availability' : ''
                ]"
              >
                {{ cell.label }}
                <span v-if="cell.isAvailable" class="availability-badge">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques -->
      <div v-else-if="activeTab === 'Les Statistiques'" class="content-section">
        <div class="section-block full-width">
          <h3 class="section-title">📊 Statistiques des Réservations</h3>
          <div class="chart-container">
            <canvas :key="coach.id" id="projectChart" width="600" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Réservations -->
    <div v-if="activeTab === 'Les réservations'" class="reservations-content">
      <div v-if="loadingRes" style="padding:12px;">Chargement…</div>
      <div v-else>
        <div v-if="errorRes" class="section-text" style="color:#ef4444">{{ errorRes }}</div>

        <div class="reservations-header">
          <div class="header-column">Date de création</div>
          <div class="header-column">Durée</div>
          <div class="header-column">Date de réunion</div>
          <div class="header-column">Statut</div>
          <div class="header-column">Action</div>
        </div>

        <div class="reservations-list">
          <div v-if="pagedReservations.length === 0" class="section-text" style="padding:12px;">
            Aucune réservation pour le moment.
          </div>

          <div class="reservation-card" v-for="r in pagedReservations" :key="r.id">
            <div class="card-column">{{ r.dateCreation }}</div>
            <div class="card-column">{{ r.duree }}</div>
            <div class="card-column">{{ r.dateReunion }} </div>
            <div class="card-column">
              <span :class="['status-badge', (r.statut || '').toLowerCase().replaceAll(' ', '-')]">
                {{ r.statut }}
              </span>
            </div>
           <div class="card-column action-cell">
              <button class="action-btn" @click.stop="toggleMenu(r.id)">⋯</button>

              <div v-if="menuOpenId === r.id" class="action-popover">
                <button class="delete-btn" @click.stop="askDelete(r)">
                  <!-- icône poubelle -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" v-if="lastPage > 1">
          <button class="pagination-btn" :disabled="page === 1" @click="prev">‹</button>

          <button
            v-for="p in pages"
            :key="p"
            class="pagination-btn"
            :class="{ active: p === page }"
            @click="goTo(p)"
          >
            {{ p }}
          </button>

          <button class="pagination-btn" :disabled="page === lastPage" @click="next">›</button>
        </div>

        <!-- <div style="text-align:center; font-size:12px; color:#6c757d" v-if="totalRows">
          {{ (page - 1) * perPage + 1 }}–{{ Math.min(page * perPage, totalRows) }} sur {{ totalRows }}
        </div> -->
      </div>
    </div>
    <div v-if="showConfirm" class="modal-backdrop">
      <div class="modal-card">
        <h4>Supprimer la réservation de {{props.myReservations.dateCreation}}?</h4>
        <p>Cette action est définitive.</p>
        <div class="modal-actions">
          <button class="btn-cancel" :disabled="deleting" @click="cancelDelete">Annuler</button>
          <button class="btn-danger" :disabled="deleting" @click="confirmDelete">
            {{ deleting ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  gap: 20px;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background-color: white;
  padding: 25px 20px;
  border-radius: 8px;
  box-shadow: 10px 8px 20px 0px rgba(0, 81, 131, 0.25);
}

.profile-photo-container { display: flex; justify-content: center; margin-bottom: 20px; }
.profile-photo-wrapper { width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; overflow: hidden; }
.profile-image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

.profile-info { text-align: center; margin-bottom: 30px; }
.profile-name { font-size: 18px; font-weight: 700; color: #5bc0de; margin: 0 0 5px 0; }
.profile-title { font-size: 12px; color: #666; margin: 0; line-height: 1.3; }

.sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
.nav-item { display: flex; align-items: center; padding: 12px 15px; cursor: pointer; transition: all 0.3s ease; border-radius: 45px; }
.nav-item.active { background-color: #e3f2fd; }
.nav-bullet { width: 8px; height: 8px; border-radius: 50%; background-color: #ccc; margin-right: 10px; transition: all 0.3s ease; }
.nav-item.active .nav-bullet { background-color: #5bc0de; }
.nav-text { font-size: 13px; color: #666; font-weight: 400; }
.nav-item.active .nav-text { color: #2c5aa0; font-weight: 500; }

/* MAIN */
.main-content {
  flex: 1;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 35px 40px;
}

.content-section { max-width: 100%; }
.section-block { margin-bottom: 35px; background: white; padding: 0; }
.section-block.full-width { border-radius: 10px; margin-bottom: 0; }
.section-title { color: #ff8533; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; }
.section-text { color: #333; font-size: 14px; line-height: 1.6; margin: 0; text-align: justify; }

.contact-info { display: flex; flex-direction: column; gap: 15px; }
.contact-item { display: flex; align-items: center; gap: 10px; }
.contact-icon { font-size: 16px; width: 20px; color: #5bc0de; }
.contact-link { color: #5bc0de; text-decoration: underline; font-size: 14px; }
.contact-link:hover { color: #2c5aa0; }

/* CALENDRIER */
.calendar-navigation { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; background: white; margin-bottom: 20px; }
.nav-left { display: flex; align-items: center; gap: 15px; }
.nav-arrow { background: none; border: none; font-size: 20px; color: #ff8533; cursor: pointer; padding: 5px 10px; border-radius: 4px; transition: background-color 0.2s; }
.nav-arrow:hover { background-color: #f0f0f0; }
.current-month { font-size: 18px; font-weight: 600; color: #ff8533; }
.nav-right { display: flex; align-items: center; gap: 10px; }
.today-btn { background-color: #5bc0de; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; }
.today-btn:hover { background-color: #2c5aa0; }

.custom-calendar { background: white; border: 2px solid #5bc0de; border-radius: 10px; overflow: hidden; }
.calendar-header { display: grid; grid-template-columns: repeat(7, 1fr); background-color: #f8f9fa; border-bottom: 1px solid #5bc0de; }
.day-header { padding: 15px 10px; text-align: center; font-size: 14px; font-weight: 600; color: #5bc0de; border-right: 1px solid #5bc0de; }
.day-header:last-child { border-right: none; }

.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.calendar-day { position: relative; aspect-ratio: 1; padding: 15px 10px; border-right: 1px solid #5bc0de; border-bottom: 1px solid #5bc0de; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; font-size: 16px; font-weight: 500; color: #333; background: white; min-height: 80px; }
.calendar-day:last-child { border-right: none; }
.calendar-day.prev-month, .calendar-day.next-month { color: #ccc; background-color: #f8f9fa; }
.calendar-day.has-availability { background-color: white; }
.availability-badge { background-color: #DEF6E7; color: #22C55E; font-size: 10px; padding: 3px 8px; border-radius: 5px; margin-top: 8px; font-weight: 500; }

/* RÉSERVATIONS */
.reservations-content { flex: 1; }
.reservations-header {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 100px; gap: 22px;
  background: white; padding: 10px 12px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  align-items: center; margin-bottom: 15px;
}
.header-column { font-weight: 600; color: #5bc0de; text-align: left; }

.reservations-list { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
.reservation-card {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 100px; gap: 20px;
  background: white; padding: 20px 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  align-items: center; transition: all 0.2s ease;
}
.reservation-card:hover { box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12); transform: translateY(-2px); }

.card-column { font-size: 14px; color: #333; display: flex; align-items: center; }

.status-badge { padding: 8px 16px; border-radius: 9px; font-size: 12px; font-weight: 500; text-transform: capitalize; white-space: nowrap; }
.status-badge.acceptée { background-color: #22c55e; color: #fff; }
.status-badge.en-attente { background-color: #f59e0b; color: #fff; }
.status-badge.refusée { background-color: #ef4444; color: #fff; }

.action-btn { background: #1e90ff; color: white; border: none; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.action-btn:hover { background: #1c7ed6; transform: scale(1.05); }
.action-cell { position: relative; }
.action-btn { background: #1e90ff; color: #fff; border: none; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all .2s; }
.action-btn:hover { background: #1c7ed6; transform: scale(1.05); }

.action-popover {
  position: absolute; right: 0; top: 44px;
  background: #fff; border-radius: 12px; padding: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
  z-index: 20;
}
.action-popover::before{
  content:""; position:absolute; top:-8px; right:16px; width:16px; height:16px;
  background:#fff; transform:rotate(45deg);
  box-shadow: -2px -2px 4px rgba(0,0,0,.04);
}
.delete-btn{
  background:#ff8533; color:#fff; border:none; border-radius:10px;
  padding:10px 14px; font-weight:600; display:flex; align-items:center; gap:8px; cursor:pointer;
}
.delete-btn:hover{ filter:brightness(0.95); }

/* Modal */
.modal-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.2); display:flex; align-items:center; justify-content:center;
}
.modal-card{
  background:#fff; border-radius:14px; padding:20px; width:320px; box-shadow:0 10px 30px rgba(0,0,0,.15);
}
.modal-actions{ display:flex; justify-content:flex-end; gap:10px; margin-top:16px; }
.btn-cancel{ background:#e5e7eb; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
.btn-danger{ background:#ef4444; color:#fff; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
.btn-cancel:disabled, .btn-danger:disabled{ opacity:.7; cursor:not-allowed; }

/* PAGINATION */
.pagination-container { display: flex; justify-content: center; align-items: center; gap: 8px; padding: 20px 0; }
.pagination-btn { background: white; border: 1px solid #dee2e6; padding: 10px 14px; border-radius: 8px; font-size: 14px; cursor: pointer; transition: all 0.2s; color: #6c757d; min-width: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
.pagination-btn:hover:not(:disabled) { background-color: #f8f9fa; border-color: #adb5bd; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
.pagination-btn.active { background-color: #5bc0de; border-color: #5bc0de; color: white; box-shadow: 0 4px 12px rgba(91, 192, 222, 0.3); }
.pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Responsive */
@media (max-width: 768px) {
  .profile-container { flex-direction: column; padding: 10px; gap: 15px; }
  .sidebar { width: 100%; padding: 20px; }
  .main-content { padding: 25px; }
  .reservations-header, .reservation-card { grid-template-columns: 1fr 80px 1fr 100px 60px; gap: 10px; }
  .header-column, .card-column { font-size: 12px; padding: 8px 5px; }
  .reservation-card { padding: 15px 10px; }
}
</style>
