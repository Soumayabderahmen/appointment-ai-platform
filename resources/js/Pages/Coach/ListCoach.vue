<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  coachs: { type: Array, default: () => [] },
});

// ---- UI state
const search = ref("");
const selectedDomain = ref("");
const selectedSkill = ref("");
const page = ref(1);
const pageSize = 6;

// ---- Helpers
const fallbackImg = "/image/default-user.png";

const domains = computed(() => {
  const set = new Set(
    (props.coachs || [])
      .map(c => c.domain || c.coach?.domain || c.specialty || "")
      .filter(Boolean)
  );
  return Array.from(set);
});

const skills = computed(() => {
  const set = new Set(
    (props.coachs || [])
      .flatMap(c => (c.skills || c.coach?.skills || []))
      .filter(Boolean)
  );
  return Array.from(set);
});

// Filtrage
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return (props.coachs || []).filter(c => {
    const name = (c.name || "").toLowerCase();
    const spec = (c.specialty || c.coach?.specialty || "").toLowerCase();
    const desc = (c.coach?.description || "").toLowerCase();
    const mail = (c.email || "").toLowerCase();
    const phone = (c.phone_number || "").toLowerCase();
    const domain = (c.domain || c.coach?.domain || c.specialty || "").toLowerCase();
    const coachSkills = (c.skills || c.coach?.skills || []).map(s => (s || "").toLowerCase());

    const matchesSearch =
      !q ||
      name.includes(q) ||
      spec.includes(q) ||
      desc.includes(q) ||
      mail.includes(q) ||
      phone.includes(q);

    const matchesDomain = !selectedDomain.value || domain === selectedDomain.value.toLowerCase();
    const matchesSkill = !selectedSkill.value || coachSkills.includes(selectedSkill.value.toLowerCase());

    return matchesSearch && matchesDomain && matchesSkill;
  });
});

// Pagination
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const paged = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filtered.value.slice(start, start + pageSize);
});

// Navigation pagination
function goTo(p) {
  if (p < 1 || p > totalPages.value) return;
  page.value = p;
}

// Click "Voir profil"
const getCoachId = (id) => (window.location.href = `/profile/Coach/${id}`);
</script>

<template>
  <!-- Barre de recherche + filtres -->
  <div class="search-filters-container">
    <div class="search-filters-wrapper">
      <div class="px-6 pb-4 flex justify-between items-center">
        <div
          class="col-lg-8 col-md-8 col-sm-8 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-start align-items-center">
          <div class="input-group me-8 mb-4 " style="width: 247px;"> <span class="input-group-text"> <svg
                xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path
                  d="M17.8749 18L12.4244 12.3333M1.52344 7.61111C1.52344 8.47929 1.68792 9.33898 2.00748 10.1411C2.32705 10.9432 2.79544 11.672 3.38592 12.2859C3.9764 12.8998 4.6774 13.3867 5.4489 13.719C6.22039 14.0512 7.04728 14.2222 7.88234 14.2222C8.71741 14.2222 9.54429 14.0512 10.3158 13.719C11.0873 13.3867 11.7883 12.8998 12.3788 12.2859C12.9692 11.672 13.4376 10.9432 13.7572 10.1411C14.0768 9.33898 14.2412 8.47929 14.2412 7.61111C14.2412 6.74293 14.0768 5.88325 13.7572 5.08115C13.4376 4.27905 12.9692 3.55025 12.3788 2.93635C11.7883 2.32245 11.0873 1.83548 10.3158 1.50324C9.54429 1.171 8.71741 1 7.88234 1C7.04728 1 6.22039 1.171 5.4489 1.50324C4.6774 1.83548 3.9764 2.32245 3.38592 2.93635C2.79544 3.55025 2.32705 4.27905 2.00748 5.08115C1.68792 5.88325 1.52344 6.74293 1.52344 7.61111Z"
                  stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg> </span> <input v-model="search" type="text" class="form-control " placeholder="Rechercher"> </div>
          <div class="d-lg-flex d-md-flex d-sm-flex d-block"> <select class="form-select mb-4 me-8"
              style=" border-radius: 15px; background: var(--Color, #FFF); box-shadow: 10px 8px 20px 0px rgba(0, 81, 131, 0.25); padding: 13px 35px; width: 180px; ">
              <option value=""> 🕒 Domaines</option>
              <!-- <option v-for="r in [...new Set(props.reservations.map(res => res.meeting_time))]" :key="r" :value="r"> {{ r }} </option> -->
            </select> </div>
        </div> <!-- <span class="text-sm text-gray-500 ml-4">{{ filteredReservations.length }} résultat(s)</span> -->
      </div>
</div></div>
      <!-- Grille de cartes - EXACTEMENT comme la maquette -->
      <div class="trainers-grid-container">
        <div class="trainers-grid">
          <div v-for="(coach, index) in paged" :key="coach.id" class="trainer-card">
            <!-- Avatar circulaire -->
            <div class="trainer-avatar">
              <img :src="coach.coach?.profile_image ? `/storage/${coach.coach.profile_image}` : fallbackImg"
                :alt="`Photo ${coach.name || 'Formateur'}`" class="avatar-image" />
            </div>

            <!-- Nom du formateur -->
            <h3 class="trainer-name">
              {{ coach.name || `Formateur ${index + 1}` }}
            </h3>

            <!-- Spécialité -->
            <p class="trainer-specialty">
              {{ coach.specialty || coach.coach?.specialty || 'Consultant en transformation numérique' }}
            </p>

            <!-- Informations de contact -->
            <div class="contact-info">
              <div class="contact-item">
                <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="#FF8C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <polyline points="22,6 12,13 2,6" stroke="#FF8C00" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <span class="contact-text">{{ coach.email || 'consultant2@example.com' }}</span>
              </div>

              <div class="contact-item">
                <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M22 16.92V19.92C22 20.52 21.39 21 20.77 21C9.43 21 0.51 12.08 0.51 0.77C0.51 0.15 0.99 -0.46 1.61 -0.46H4.61C5.21 -0.46 5.67 0.05 5.67 0.65V3.65"
                    stroke="#FF8C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="contact-text">{{ coach.phone_number || '+33 6 23 45 67 89' }}</span>
              </div>
            </div>

            <!-- Bouton Voir profil -->
            <button class="view-profile-btn" @click="getCoachId(coach.id)">
              <span>Voir profil</span>
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="currentColor" />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav class="pagination-nav" v-if="totalPages > 1">
        <button class="pagination-btn nav-btn" :disabled="page === 1" @click="goTo(page - 1)">‹</button>
        <button v-for="p in totalPages" :key="p" class="pagination-btn page-btn" :class="{ active: p === page }"
          @click="goTo(p)">
          {{ p }}
        </button>
        <button class="pagination-btn nav-btn" :disabled="page === totalPages" @click="goTo(page + 1)">›</button>
      </nav>
</template>

<style scoped>
/* ==================== BARRE DE RECHERCHE ==================== */
.search-filters-container {
  padding: 0 24px 24px;
  margin-bottom: 32px;
}

.search-filters-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.search-group {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  width: 280px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 50px;
  border: none;
  border-radius: 12px;
  background: #fff;
  box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
  font-size: 14px;
  color: #333;
  outline: none;
}

.search-input::placeholder {
  color: #C6C6C6;
}

.filters-wrapper {
  display: flex;
  gap: 20px;
}

.filter-select {
  width: 200px;
  height: 48px;
  padding: 0 40px 0 16px;
  border: none;
  border-radius: 12px;
  background: #fff;
  box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
}

/* ==================== GRILLE DE FORMATEURS ==================== */
.trainers-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
  justify-items: center;
}

.trainer-card {
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 32px 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.trainer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* Avatar */
.trainer-avatar {
  margin-bottom: 20px;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f7ff;
}

/* Nom du formateur */
.trainer-name {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #00AEEF;
  line-height: 1.3;
}

/* Spécialité */
.trainer-specialty {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #666666;
  line-height: 1.4;
  font-weight: 500;
}

/* Informations de contact */
.contact-info {
  width: 100%;
  margin-bottom: 28px;
}

.contact-item {
  display: flex;
  align-items: center;
 justify-content: center;

  gap: 12px;
  margin-bottom: 12px;
  padding: 0 8px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.contact-text {
  font-size: 13px;
  color:#666666;
  font-weight: 500;
  word-break: break-all;
}

/* Bouton Voir profil */
.view-profile-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #00AEEF;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 174, 239, 0.3);
}

.view-profile-btn:hover {
  background: #0096d1;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 174, 239, 0.4);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* ==================== PAGINATION ==================== */
.pagination-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 48px 0 24px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #E6EEF7;
  border-radius: 8px;
  background: #ffffff;
  color: #00AEEF;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 81, 131, 0.1);
}

.pagination-btn:hover:not(:disabled) {
  background: #f0f7ff;
  border-color: #00AEEF;
}

.pagination-btn.active {
  background: #00AEEF;
  color: #ffffff;
  border-color: #00AEEF;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1024px) {
  .trainers-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 20px;
  }
}

@media (max-width: 768px) {
  .search-group {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-wrapper,
  .filter-select {
    width: 100%;
  }

  .trainers-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .trainer-card {
    max-width: 400px;
  }
}

@media (max-width: 480px) {

  .search-filters-container,
  .trainers-grid-container {
    padding: 0 16px;
  }

  .trainer-card {
    padding: 24px 20px;
  }

  .trainer-name {
    font-size: 16px;
  }

  .trainer-specialty {
    font-size: 13px;
  }
}
</style>