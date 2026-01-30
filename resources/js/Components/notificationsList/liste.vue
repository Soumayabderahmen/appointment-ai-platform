<template>
  <div class="row">
    <div class="col-12 mb-4">
      <div class="card card-1 cardNotifs">
        <div class="card-body p-0">
          <ul class="list-group list-group-flush">
            <li
              v-for="item in notifications"
              :key="item.id"
              class="list-group-item list-group-item-action dropdown-notifications-item"
            >
              <div class="d-flex align-items-start justify-content-between">
                <!-- Icon + contenu -->
                <div class="d-flex">
                  <div class="icon me-3" v-html="getIcon(item.type)"></div>
                  <div>
                    <h5 class="mb-1">{{ item.title }}</h5>
                    <p class="mb-0">{{ item.time }} | Le {{ item.date }}</p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="d-flex">
                  <!-- Boutons spécifiques pour les réservations -->
                  <template v-if="item.type === 'reservation'">
                    <button
                      class="btn btn-sm btn-success me-2"
                      @click="handleAction(item, 'accept')"
                    >
                      Accepter
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="handleAction(item, 'reject')"
                    >
                      Refuser
                    </button>
                  </template>

                  <!-- Boutons génériques -->
                  <template v-else>
                    <button class="btn btn-sm btn-light me-2">
                      <i class="ti ti-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-danger text-white">
                      <i class="ti ti-x"></i>
                    </button>
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        {
          id: 1,
          title: 'Nouvelle réservation avec Client X',
          time: 'Il y a 15 min',
          date: '01/10/2025',
          type: 'reservation',
        },
        {
          id: 2,
          title: 'Nom prénom 1 a ajouté son daily',
          time: 'Il y a 2h',
          date: '10/01/2025',
          type: 'daily',
        },
        {
          id: 3,
          title: 'Projet 1 : tâche terminé',
          time: 'Aujourd’hui',
          date: '10/01/2025',
          type: 'task',
        },
      ],
    };
  },
  methods: {
    getIcon(type) {
      const icons = {
        reservation: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
        daily: `<svg ... />`,
        task: `<svg ... />`,
        default: `<svg ... />`,
      };
      return icons[type] || icons.default;
    },
    handleAction(item, action) {
      if (action === 'accept') {
        console.log('✅ Réservation acceptée :', item);
        // ici tu peux lancer une requête API pour valider
      } else {
        console.log('❌ Réservation refusée :', item);
        // ici pareil pour refuser
      }
    },
  },
};
</script>
