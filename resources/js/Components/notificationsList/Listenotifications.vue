<template>
  <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
    <!-- Icône cloche -->
    <a class="nav-link dropdown-toggle hide-arrow btn-top"
       href="javascript:void(0);" data-bs-toggle="dropdown"
       data-bs-auto-close="outside" aria-expanded="false">
      <i class="ti ti-bell ti-md text-dark"></i>
      <span v-if="notifications.length"
            class="badge bg-danger rounded-pill badge-notifications">
        {{ notifications.length }}
      </span>
    </a>

    <!-- Dropdown -->
    <ul class="dropdown-menu dropdown-menu-end notificationBox py-0">
      <li class="dropdown-menu-header border-bottom">
        <div class="dropdown-header d-flex align-items-center py-3">
          <h5 class="text-body mb-0 me-auto text-primary title-notif">Notifications</h5>
        </div>
      </li>

      <!-- Liste scrollable -->
      <li class="dropdown-notifications-list scrollable-container">
        <ul class="list-group list-group-flush">
          <!-- ✅ notif est défini uniquement ici -->
          <li v-for="notif in notifications"
              :key="notif.id"
              class="list-group-item list-group-item-action dropdown-notifications-item">

            <div class="d-flex flex-column">
              <h6 class="mb-1">
                {{ notif.startup?.user?.name || 'Startup' }} - Réservation
              </h6>
              <p class="mb-1">
                {{ notif.message || 'Nouvelle réservation' }} <br>
                Heure : {{ notif.meeting_time }} <br>
                Statut :
                <span :class="{
                  'text-warning': notif.statut === 'en attente',
                  'text-success': notif.statut === 'acceptée',
                  'text-danger': notif.statut === 'refusée'
                }">
                  {{ notif.statut }}
                </span>
              </p>

              <!-- Boutons -->
              <div class="d-flex gap-2 mt-2">
                <button class="btn btn-success btn-sm"
                        @click="updateReservation(notif.id, 'acceptée')"
                        :disabled="notif.statut !== 'en attente'">
                  {{ notif.statut === 'en attente' ? 'Accepter' : 'Acceptée' }}
                </button>
                <button class="btn btn-danger btn-sm"
                        @click="updateReservation(notif.id, 'refusée')"
                        :disabled="notif.statut !== 'en attente'">
                  {{ notif.statut === 'en attente' ? 'Refuser' : 'Refusée' }}
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!-- ✅ message si aucune notif -->
        <div v-if="!notifications.length" class="text-center text-muted p-3">
          Aucune réservation en attente
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      notifications: []
    };
  },
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get("/notifications");
        // garde uniquement celles avec un statut en attente
        this.notifications = response.data.filter(
          notif => notif && notif.statut === "en attente"
        );
      } catch (error) {
        console.error("Erreur chargement notifications", error);
      }
    },
    async updateReservation(reservationId, statut) {
      try {
        await axios.post(`/api/startup/reservation/respond/${reservationId}`, { statut });

        const notif = this.notifications.find(n => n.id === reservationId);
        if (notif) notif.statut = statut;

        this.$toast.success(`Réservation ${statut}`);
      } catch (error) {
        this.$toast.error("Erreur lors de la mise à jour");
      }
    }
  }
};
</script>


<style scoped>
.dropdown-notifications-item {
  cursor: pointer;
}
.btn-sm {
  font-size: 12px;
  padding: 4px 8px;
}

/* Scroll pour la liste */
.scrollable-container {
  max-height: 300px;   /* ajuste selon tes besoins */
  overflow-y: auto;
}

/* Barre de scroll personnalisée */
.scrollable-container::-webkit-scrollbar {
  width: 6px;
}
.scrollable-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Désactiver visuellement les boutons */
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
