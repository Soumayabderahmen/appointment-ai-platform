<!-- CoachCalendarWithPanel.vue -->
<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const props = defineProps({
  // Chaque disponibilité: { id, date, start_time, end_time, statut, nb_place?, honoraire?, titre?, type_formation?, coach_id? | coach?:{...} }
  availabilities: { type: Array, default: () => [] },

  // Liste des coachs pour faire le mapping (id -> nom, avatar)
  // Ex. d’objets acceptés (souples) :
  // { id, coach_id, name, user:{name}, profile_image, avatarUrl }
  coachs: { type: Array, default: () => [] },

  // Valeurs par défaut si coachs[] non fourni
  fallbackCoachName:   { type: String, default: "Formateur" },
  fallbackCoachAvatar: { type: String, default: "/image/default-user.png" },
});

const fullCalendar  = ref(null);
const monthLabel    = ref("");
const selectedEvent = ref(null); // détails affichés dans le panneau

/* ------------------ Helpers coach ------------------ */
function getCoachIdFromRaw(raw) {
  return raw?.coach_id ?? raw?.coachId ?? raw?.coach?.id ?? raw?.coach?.coach_id ?? null;
}

function findCoachById(id) {
  if (!id) return null;
  return (props.coachs || []).find(c =>
    c?.id === id || c?.coach_id === id || c?.user_id === id
  ) || null;
}

function getCoachName(coachObj) {
  return (
    coachObj?.name ||
    coachObj?.user?.name ||
    coachObj?.user?.username ||
    props.fallbackCoachName
  );
}

function getCoachAvatarUrl(coachObj) {
  const img =
    coachObj?.profile_image ||
    coachObj?.avatarUrl ||
    coachObj?.user?.avatar ||
    coachObj?.photo;

  if (img) {
    // si c'est un path de stockage Laravel
    if (typeof img === "string" && !img.startsWith("http")) {
      return `/storage/${img}`.replace("//", "/");
    }
    return img;
  }
  return null; // on fera le fallback lettre
}

function firstLetter(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

/* ------------------ Mois (nav) ------------------ */
function updateMonthLabel(dateLike) {
  const d = new Date(dateLike || Date.now());
  monthLabel.value = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/* Badge "Disponible" par date (visuel) */
const availByDate = computed(() => {
  const m = new Map();
  for (const a of props.availabilities) {
    if (a?.date && a.statut === "available") m.set(a.date, true);
  }
  return m;
});

/* Événements pour FullCalendar (on injecte l'objet brut en extendedProps) */
const fcEvents = computed(() =>
  props.availabilities.map((a) => ({
    id: String(a.id),
    title: (a.titre ?? a.title ?? "Créneau").toString(),
    start: `${a.date}T${a.start_time}`,
    end:   `${a.date}T${a.end_time}`,
    color: a.statut === "available" ? "#22c55e" : "#ef4444",
    extendedProps: { raw: a }
  }))
);

/* Nav custom */
const prevMonth = () => fullCalendar.value?.getApi()?.prev();
const nextMonth = () => fullCalendar.value?.getApi()?.next();
const goToday   = () => fullCalendar.value?.getApi()?.today();

/* Options FullCalendar */
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin],
  headerToolbar: false,
  initialView: "dayGridMonth",
  firstDay: 1,
  dayMaxEvents: true,
  selectable: false,
  editable: false,
  events: fcEvents.value,

  datesSet(arg) { updateMonthLabel(arg.start); },

  dayCellDidMount(info) {
    const ymd = info.date.toISOString().slice(0, 10);
    if (availByDate.value.get(ymd)) {
      const badge = document.createElement("span");
      badge.className = "availability-badge";
      badge.textContent = "Disponible";
      info.el.querySelector(".fc-daygrid-day-frame")?.appendChild(badge);
    }
  },

  eventDidMount(info) {
    const start = new Date(info.event.start);
    const end   = new Date(info.event.end);
    const date  = start.toLocaleDateString("fr-FR");
    const sh    = start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const eh    = end.toLocaleTimeString("fr-FR",   { hour: "2-digit", minute: "2-digit" });
    const raw   = info.event.extendedProps?.raw || {};
    const statut = raw.statut ?? "available";
    const colorIco = statut === "available" ? "🟢" : "🔴";

    // Coach name dans le tooltip
    const coachObj  = findCoachById(getCoachIdFromRaw(raw));
    const coachName = getCoachName(coachObj);

    tippy(info.el, {
      allowHTML: true,
      theme: "light",
      animation: "scale",
      interactive: true,
      content: `
        <div style="padding:10px; width:210px;">
          <div><strong>${coachName}</strong></div>
          <div>📍 ${info.event.title || "Créneau"}</div>
          <div>📅 ${date}</div>
          <div>⏰ ${sh} - ${eh}</div>
          <div>${colorIco} ${statut}</div>
        </div>
      `,
    });
  },

  eventClick: handleEventClick,
});

/* Maj auto si la source change */
watch(fcEvents, (val) => { calendarOptions.value.events = val; });

onMounted(async () => {
  await nextTick();
  const api = fullCalendar.value?.getApi();
  if (api?.view?.currentStart) updateMonthLabel(api.view.currentStart);
});

/* ------------------ Clic: alimente le panneau ------------------ */
function handleEventClick(clickInfo) {
  const e   = clickInfo.event;
  const raw = e.extendedProps?.raw || {};

  const start = new Date(e.start);
  const end   = new Date(e.end);

  // Coach
  const coachObj       = findCoachById(getCoachIdFromRaw(raw));
  const coachName      = getCoachName(coachObj);
  const coachAvatarUrl = getCoachAvatarUrl(coachObj);
  const coachInitial   = firstLetter(coachName);

  selectedEvent.value = {
    id: e.id,
    titre: raw.titre ?? e.title ?? "Créneau",
    statut: raw.statut ?? "available",
    dateStr: start.toLocaleDateString("fr-FR"),
    startStr: start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    endStr:   end.toLocaleTimeString("fr-FR",   { hour: "2-digit", minute: "2-digit" }),
    nb_place: raw.nb_place ?? null,
honoraire: raw.honoraire ?? null,
    coachName,
    coachAvatarUrl,   // peut être null
    coachInitial,     // fallback pour avatar
  };
}
</script>

<template>
  <!-- NAV -->
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

  <!-- LAYOUT : calendrier + panneau -->
  <div class="layout" :class="{ 'has-detail': !!selectedEvent }">
    <!-- Calendrier (style du 1er design) -->
    <div class="custom-calendar">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>

    <!-- PANNEAU DROIT -->
    <aside v-if="selectedEvent" class="detail-card">
      <h4 class="detail-title">Détail de la disponibilité</h4>

      <div class="detail-header">
        <!-- Avatar image OU fallback initiale -->
        <img
          v-if="selectedEvent.coachAvatarUrl"
          :src="selectedEvent.coachAvatarUrl"
          alt="avatar"
          class="detail-avatar"
        />
        <div v-else class="avatar-fallback">{{ selectedEvent.coachInitial }}</div>

        <div>
          <div class="detail-name">{{ selectedEvent.coachName }}</div>
          <div class="detail-status" :class="{ available: selectedEvent.statut === 'available' }">
            {{ selectedEvent.statut === 'available' ? 'Disponible' : 'Indisponible' }}
          </div>
        </div>
      </div>

      <ul class="detail-list">
        <li><span class="icon">📅</span> {{ selectedEvent.dateStr }}</li>
        <li><span class="icon">⏰</span> De {{ selectedEvent.startStr }} à {{ selectedEvent.endStr }}</li>
        <li v-if="selectedEvent.nb_place != null"><span class="icon">👥</span> {{ selectedEvent.nb_place }} place(s)</li>
                <li v-if="selectedEvent.honoraire != null"><span class="icon">👥</span> {{ selectedEvent.honoraire }} place(s)</li>

      </ul>
    </aside>
  </div>
</template>

<style scoped>
/* NAV */
.calendar-navigation{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;background:white;margin-bottom:20px;border-radius:8px}
.nav-left{display:flex;align-items:center;gap:15px}
.nav-arrow{background:none;border:none;font-size:20px;color:#ff8533;cursor:pointer;padding:5px 10px;border-radius:4px;transition:background-color .2s}
.nav-arrow:hover{background-color:#f0f0f0}
.current-month{font-size:18px;font-weight:600;color:#ff8533}
.nav-right{display:flex;align-items:center;gap:10px}
.today-btn{background-color:#5bc0de;color:white;border:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;transition:background-color .2s}
.today-btn:hover{background-color:#2c5aa0}

/* Layout panneau droit */
.layout{display:grid;grid-template-columns:1fr;gap:20px}
.layout.has-detail{grid-template-columns:1fr 360px;align-items:start}

/* FullCalendar skin */
.custom-calendar{background:white;border:2px solid #5bc0de;border-radius:10px;overflow:hidden}
:deep(.fc .fc-col-header){background-color:#f8f9fa;border-bottom:1px solid #5bc0de}
:deep(.fc .fc-col-header-cell){color:#5bc0de;font-weight:600;border-right:1px solid #5bc0de}
:deep(.fc .fc-col-header-cell:last-child){border-right:none}
:deep(.fc-theme-standard td), :deep(.fc-theme-standard th){border-color:#5bc0de !important}
:deep(.fc .fc-daygrid-day){border-right:1px solid #5bc0de;border-bottom:1px solid #5bc0de}
:deep(.fc .fc-daygrid-day:last-child){border-right:none}
:deep(.fc .fc-daygrid-day-number){font-weight:500;color:#333}
:deep(.fc .fc-daygrid-day.fc-day-other .fc-daygrid-day-frame){background-color:#f8f9fa}
:deep(.fc .fc-daygrid-day.fc-day-other .fc-daygrid-day-number){color:#ccc}
:deep(.fc-daygrid-event){
  background-color:#5bc0de !important;color:white !important;
  font-size:12px;font-weight:500;padding:4px 6px;border-radius:4px;border:none !important
}
:deep(.fc-daygrid-event:hover){background-color:#2c5aa0 !important}

/* Badge “Disponible” */
.availability-badge{background-color:#DEF6E7;color:#22C55E;font-size:10px;padding:3px 8px;border-radius:5px;margin-top:8px;display:inline-block;font-weight:500}

/* Panneau droit */
.detail-card{background:#fff;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.12);padding:18px;height:100%}
.detail-title{color:#ff8533;font-weight:700;font-size:16px;margin:0 0 14px 0}
.detail-header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.detail-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover}
.avatar-fallback{
  width:48px;height:48px;border-radius:50%;
  display:grid;place-items:center;
  background:#e3f2fd;color:#2c5aa0;font-weight:800;font-size:18px;
}
.detail-name{font-weight:700;color:#0E2E5C}
.detail-status{font-size:13px;font-weight:600}
.detail-status.available{color:#22C55E}
.detail-list{list-style:none;padding:0;margin:14px 0;display:flex;flex-direction:column;gap:10px}
.detail-list .icon{margin-right:8px}

/* Responsive */
@media (max-width: 992px){
  .layout, .layout.has-detail { grid-template-columns: 1fr; }
}
</style>
