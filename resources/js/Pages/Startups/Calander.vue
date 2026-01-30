<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

const props = defineProps({
  availabilities: Array,
  coachs: Array,
})

/* ------- ÉTATS ------- */
const selectedSpecialty = ref(null)
const search = ref('')
const currentDate = ref(new Date())
const selectedEvent = ref(null)

/* Modal */
const showModal = ref(false)
const openModal = () => { showModal.value = true; document.body.style.overflow = 'hidden' }
const closeModal = () => { showModal.value = false; document.body.style.overflow = '' }
const onKeydown = (e) => { if (e.key === 'Escape') closeModal() }
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

/* ------- LABEL MOIS ------- */
const monthLabel = computed(() =>
  currentDate.value.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
)

/* ------- HELPERS ------- */
const specialties = computed(() => {
  return [...new Set((props.coachs || []).map(c => c.specialty).filter(Boolean))]
})

const filteredCoachs = computed(() => {
  if (!selectedSpecialty.value) return []
  return (props.coachs || []).filter(c => c.specialty === selectedSpecialty.value)
})

/* dispo filtrées du domaine */
const domainAvailabilities = computed(() => {
  if (!selectedSpecialty.value) return []
  const coachIds = filteredCoachs.value.map(c => c.coach_id)
  return (props.availabilities || []).filter(a => coachIds.includes(a.coach_id) && a.statut === 'available')
})

/* Map par date */
const availByDate = computed(() => {
  const m = new Map()
  ;(domainAvailabilities.value || []).forEach(a => {
    if (!a?.date) return
    const key = a.date
    m.set(key, (m.get(key) || false) || a.statut === 'available')
  })
  return m
})

/* 42 cases du calendrier (7x6) */
const calendarDays = computed(() => {
  const d = new Date(currentDate.value)
  d.setDate(1)
  const firstOfMonth = new Date(d)
  const currentMonth = d.getMonth()

  const jsDay = firstOfMonth.getDay() // dimanche=0
  const mondayIndex = (jsDay + 6) % 7  // lundi=0
  const start = new Date(firstOfMonth)
  start.setDate(1 - mondayIndex)

  const days = []
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start)
    dt.setDate(start.getDate() + i)

    const y = dt.getFullYear()
    const m = String(dt.getMonth() + 1).padStart(2, '0')
    const day = String(dt.getDate()).padStart(2, '0')
    const ymd = `${y}-${m}-${day}`

    let type = 'current'
    if (dt.getMonth() !== currentMonth) type = dt < firstOfMonth ? 'prev' : 'next'

    const dayEvents = (domainAvailabilities.value || []).filter(av => av.date === ymd)

    days.push({
      key: ymd,
      label: dt.getDate(),
      type,
      isAvailable: !!availByDate.value.get(ymd),
      events: dayEvents
    })
  }
  return days
})

/* ------- NAV ------- */
const prevMonth = () => { const d = new Date(currentDate.value); d.setMonth(d.getMonth() - 1); currentDate.value = d }
const nextMonth = () => { const d = new Date(currentDate.value); d.setMonth(d.getMonth() + 1); currentDate.value = d }
const goToday   = () => { currentDate.value = new Date() }

/* ------- Utils coach & tooltip ------- */
const getCoachById = (id) => (props.coachs || []).find(c => c.coach_id === id)
const getCoachName = (id) => getCoachById(id)?.name || 'Formateur'

const showTooltip = (e, avail) => {
  const coach = getCoachById(avail.coach_id)
  const avatar = coach?.avatar || '/assets/img/avatars/1.png'
  const date = new Date(`${avail.date}T${avail.start_time}`).toLocaleDateString('fr-FR')
  const start = new Date(`${avail.date}T${avail.start_time}`).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})
  const end   = new Date(`${avail.date}T${avail.end_time}`).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})

  if (e.target._tippy) e.target._tippy.destroy()
  tippy(e.target, {
    allowHTML: true,
    animation: 'scale',
    theme: 'light',
    interactive: true,
    content: `
      <div style="padding:10px; width: 198px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <img src="${avatar}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
          <strong>${coach?.name || 'Inconnu'}</strong>
        </div>
        <div>📍 ${avail.title || ''}</div>
        <div>📅 ${date}</div>
        <div>⏰ ${start} - ${end}</div>
        <div>🧑‍💻 Formation en ligne</div>
        <div>🟢 ${avail.statut}</div>
      </div>`
  })
}

/* ------- CLIC : alimente le panneau droit ------- */
const handleEventClick = (_evt, avail) => {
  const coach = getCoachById(avail.coach_id)
  selectedEvent.value = {
    coachName: coach?.name || 'Formateur',
    coachAvatar: coach?.avatar || '/assets/img/avatars/1.png',
    statut: avail.statut,
    title: avail.title || 'Session',
    date: avail.date,
    price: avail.price_per_hour || coach?.price_per_hour || 20,
    start: avail.start_time,
    end: avail.end_time,
    coachId: avail.coach_id,
    availabilityId: avail.id
  }
}

/* ------- Réservation (bouton) ------- */
/* Ouvre la modal au lieu de rediriger directement */
const goToReservation = () => {
  if (!selectedEvent.value) return
  openModal()
}

const confirmReservation = () => {
  if (!selectedEvent.value) return
  const params = new URLSearchParams({
    coach_id: selectedEvent.value.coachId,
    availability_id: selectedEvent.value.availabilityId
  }).toString()
  window.location.href = `/startup/res/create?${params}`
}
</script>

<template>
  <div class="calendar-container">
    <!-- NAV -->
    <div class="calendar-navigation">
      <div class="nav-left">
        <button class="nav-arrow" @click="prevMonth">‹</button>
        <span class="current-month">{{ monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1) }}</span>
        <button class="nav-arrow" @click="nextMonth">›</button>
        <button class="today-btn" @click="goToday">Aujourd'hui</button>
      </div>

      <div class="nav-right">
        <div class="input-group" style="height:51px;width:180px;">
          <span class="input-group-text">
            <!-- icône loupe -->
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M17.8749 18L12.4244 12.3333M1.52344 7.61111C1.52344 8.47929 1.68792 9.33898 2.00748 10.1411C2.32705 10.9432 2.79544 11.672 3.38592 12.2859C3.9764 12.8998 4.6774 13.3867 5.4489 13.719C6.22039 14.0512 7.04728 14.2222 7.88234 14.2222C8.71741 14.2222 9.54429 14.0512 10.3158 13.719C11.0873 13.3867 11.7883 12.8998 12.3788 12.2859C12.9692 11.672 13.4376 10.9432 13.7572 10.1411C14.0768 9.33898 14.2412 8.47929 14.2412 7.61111C14.2412 6.74293 14.0768 5.88325 13.7572 5.08115C13.4376 4.27905 12.9692 3.55025 12.3788 2.93635C11.7883 2.32245 11.0873 1.83548 10.3158 1.50324C9.54429 1.171 8.71741 1 7.88234 1C7.04728 1 6.22039 1.171 5.4489 1.50324C4.6774 1.83548 3.9764 2.32245 3.38592 2.93635C2.79544 3.55025 2.32705 4.27905 2.00748 5.08115C1.68792 5.88325 1.52344 6.74293 1.52344 7.61111Z"
                    stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <input v-model="search" type="text" class="form-control" placeholder="Rechercher">
        </div>

        <select id="specialtySelect" v-model="selectedSpecialty" class="form-select" style="width:180px;">
          <option :value="null" disabled>Domaine</option>
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
      </div>
    </div>

    <!-- LAYOUT : calendrier + (optionnel) panneau détail -->
    <div class="layout" :class="{ 'has-detail': !!selectedEvent }">
      <!-- CALENDRIER -->
      <div class="custom-calendar">
        <!-- En-tête -->
        <div class="calendar-header">
          <div class="day-header">Lundi</div>
          <div class="day-header">Mardi</div>
          <div class="day-header">Mercredi</div>
          <div class="day-header">Jeudi</div>
          <div class="day-header">Vendredi</div>
          <div class="day-header">Samedi</div>
          <div class="day-header">Dimanche</div>
        </div>

        <!-- Grille des jours -->
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
            <span class="day-number">{{ cell.label }}</span>

            <!-- évènements -->
            <div v-for="(avail, i) in cell.events" :key="`${cell.key}-${i}`" class="event-container">
              <div
                class="event-item"
                @click="handleEventClick($event, avail)"
                @mouseenter="(e) => showTooltip(e, avail)"
              >
                {{ getCoachName(avail.coach_id) }}...
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANNEAU DÉTAIL DROIT (uniquement après clic) -->
      <aside v-if="selectedEvent" class="detail-card">
        <h4 class="detail-title">Détail de la disponibilité</h4>

        <div class="detail-header">
          <img :src="selectedEvent.coachAvatar" alt="avatar" class="detail-avatar" />
          <div>
            <div class="detail-name">{{ selectedEvent.coachName }}</div>
            <div class="detail-status available">Disponible</div>
          </div>
        </div>

        <ul class="detail-list">
          <li><span class="icon">🎓</span> {{ selectedEvent.title }}</li>
          <li><span class="icon">📅</span> {{ new Date(selectedEvent.date).toLocaleDateString('fr-FR') }}</li>
          <li><span class="icon">🏷️</span> L’heure à {{ selectedEvent.price }}€</li>
          <li><span class="icon">⏰</span> Du {{ selectedEvent.start }} au {{ selectedEvent.end }}</li>
        </ul>

        <button class="reserve-btn" @click="goToReservation">Réserver une réunion</button>
      </aside>
    </div>

    <!-- MODAL CONFIRMATION -->
    <teleport to="body">
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="52" height="52" fill="currentColor">
          <path d="M3 5h18a2 2 0 0 1 2 2v2H1V7a2 2 0 0 1 2-2zm-2 6h22v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6zm5 5h6v-2H6v2z"/>
        </svg>
      </div>
      <h3 id="modal-title" class="modal-title">
        Voulez-vous réserver une réunion avec « {{ selectedEvent?.coachName }} » ?
      </h3>
      <div class="modal-actions">
        <button class="btn btn-primary" @click="confirmReservation">Réserver et payer via Stripe</button>
        <button class="btn btn-secondary" @click="closeModal">Annuler</button>
      </div>
    </div>
  </div>
</teleport>

  </div>
</template>

<style scoped>
/* ===== Base / Nav ===== */
.calendar-container{background-color:#f8fafc;padding:20px;font-family:'Inter',sans-serif}
.form-select{border-radius:15px;background:#FFF;box-shadow:10px 8px 20px 0 rgba(0,81,131,.25);padding:13px 35px;border:1px solid #ddd}
.calendar-navigation{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;margin-bottom:20px;border-radius:8px}
.nav-left{display:flex;align-items:center;gap:15px}
.nav-arrow{background:none;border:none;font-size:35px;color:#ff8533;cursor:pointer;padding:5px 10px;border-radius:4px;transition:.2s}
.nav-arrow:hover{background:#f0f0f0}
.current-month{font-size:18px;font-weight:600;color:#ff8533}
.nav-right{display:flex;align-items:center;gap:15px}
.today-btn{background:#0089DB;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;box-shadow:0 2px 4px rgba(91,192,222,.3);transition:.2s}
.today-btn:hover{background:#44a5c2;transform:translateY(-1px)}

/* ===== Layout : calendrier seul / + panneau ===== */
.layout{display:grid;grid-template-columns:1fr;gap:20px}
.layout.has-detail{grid-template-columns:1fr 360px;align-items:start}

/* ===== Calendrier (header & body alignés) ===== */
.custom-calendar{
  display:grid;
  grid-template-columns:repeat(7,minmax(0,1fr));
  border:1px solid #0072B6;border-radius:12px;overflow:hidden;background:#fff;
  box-shadow:0 4px 12px rgba(0,0,0,.1);
}
.calendar-header,.calendar-grid{display:contents}
.day-header,.calendar-day{box-sizing:border-box;border-right:1px solid #5bc0de}
.day-header:nth-child(7n),.calendar-day:nth-child(7n){border-right:none}
.day-header{padding:15px 10px;text-align:center;font-size:14px;font-weight:700;color:#0098F3;background:#fff;border-bottom:1px solid #5bc0de;font-family:'Poppins',sans-serif}
.calendar-day{min-height:87px;padding:12px;background:#fff;border-bottom:1px solid #5bc0de;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start}
.calendar-day:nth-last-child(-n+7){border-bottom:none}
.day-number{font-size:16px;font-weight:700;color:#444;margin-bottom:8px;align-self:center}
.calendar-day.prev-month .day-number,.calendar-day.next-month .day-number{color:#9ca3af}
.calendar-day.prev-month,.calendar-day.next-month{background:#f9fafb}

/* Événements */
.event-container{width:100%}
.event-item{background:linear-gradient(135deg,#4ade80 0%,#22c55e 100%);color:#fff;font-size:11px;padding:4px 8px;border-radius:6px;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;box-shadow:0 1px 3px rgba(34,197,94,.3);border:1px solid rgba(255,255,255,.2);cursor:pointer;transition:.2s;width:100%}
.event-item:hover{background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%);transform:scale(1.02)}

/* Tooltip */
.tippy-box[data-theme~='light']{background:#fff;border:1px solid #eee;box-shadow:0 2px 8px rgba(91,192,222,.3);border-radius:12px;padding:0;color:#5bc0de;font-size:13px}

/* Quand le panneau est visible : bord droit ouvert */
.layout.has-detail .custom-calendar{border:2px solid #5bc0de;box-shadow:none}
.layout.has-detail .custom-calendar{min-height:560px}

/* ===== Panneau droit ===== */
.detail-card{background:#fff;border-radius:16px;box-shadow:0 18px 40px rgba(0,0,0,.12);padding:18px;top:10px;height:100%}
.detail-title{color:#ff8533;font-weight:700;font-size:16px;margin:0 0 14px 0}
.detail-header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.detail-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover}
.detail-name{font-weight:700;color:#0E2E5C}
.detail-status{font-size:13px;font-weight:600}
.detail-status.available{color:#22C55E}
.detail-list{list-style:none;padding:0;margin:14px 0;display:flex;flex-direction:column;gap:10px}
.detail-list .icon{margin-right:8px}
.reserve-btn{width:100%;background:#0d6efd;color:#fff;border:none;border-radius:12px;padding:12px 16px;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 6px 14px rgba(13,110,253,.25)}
.reserve-btn:hover{filter:brightness(.95)}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;           /* plus haut que navbar/sidebar */
  background: rgba(15, 23, 42, .46);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Cacher navbar / sidebar pendant la modal 
   ⚠️ adapte les sélecteurs ci-dessous à tes classes réelles si besoin */
:global(body.has-modal .navbar),
:global(body.has-modal .topbar),
:global(body.has-modal .sidebar),
:global(body.has-modal .sidenav) {
  display: none !important;
}

/* Carte de la modal (tu peux garder tes styles existants) */
.modal-card {
  width: min(440px, 92vw);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,.25);
  padding: 28px 24px;
  text-align: center;
}
.modal-icon{
  width:72px;height:72px;margin:0 auto 14px;
  display:grid;place-items:center;border-radius:20px;
  background:linear-gradient(135deg,#e6f0ff 0%,#cfe3ff 100%); color:#0d6efd;
}
.modal-title{
  font-weight:800; font-size:20px; line-height:1.25; color:#0E2E5C; margin:6px 0 18px;
}
.modal-actions{display:flex;gap:12px;justify-content:center;margin-top:8px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;border:none;cursor:pointer;border-radius:10px;padding:12px 16px;font-weight:800}
.btn-primary{background:#0d6efd;color:#fff;box-shadow:0 6px 14px rgba(13,110,253,.25)}
.btn-primary:hover{filter:brightness(.95)}
.btn-secondary{background:#ff6a00;color:#fff}
.btn-secondary:hover{filter:brightness(.95)}

/* ===== Responsive ===== */
@media (max-width: 992px){
  .layout, .layout.has-detail { grid-template-columns: 1fr; }
  .layout.has-detail .custom-calendar{border-right:2px solid #5bc0de;border-radius:14px}
}
</style>
