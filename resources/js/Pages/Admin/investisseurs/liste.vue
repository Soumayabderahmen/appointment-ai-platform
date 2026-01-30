<template>
  <div class="resources-table-responsive">
    <!-- En-têtes -->
     <div class="row filters mb-4 mx-3">
      <div class="col-lg-8 col-md-8 col-sm-8 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-start align-items-center">
          <div class="search-container me-3">
              <div class="custom-search-frame">
                  <div class="search-input-wrapper">
                      <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="rgba(0, 0, 0, 0.49)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14 14L11.1 11.1" stroke="rgba(0, 0, 0, 0.49)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <input type="text" v-model="searchQuery" @input="searchResources" class="custom-search-input" placeholder="Chercher">
                  </div>
              </div>
          </div>
         
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-end align-items-center">
          <a href="/admin/addInvestisseurs" class="primary-button" style="text-decoration: none;">
            <div class="button">Ajouter une publication</div>
            <svg class="heroicons-outlineplus-circle" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16667V15.8333" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16667 10H15.8333" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
      </div>
  </div>
  
    <div class="table-headers">
      <div class="header-row">
        <div class="header-cell header-nom">Nom</div>
        <div class="header-cell header-operator">Opérateur</div>
        <div class="header-cell header-description">Description</div>
        <div class="header-cell header-amount">Montant</div>
        <div class="header-cell header-date">Date de création</div>
        <div class="header-cell header-action">Action</div>
      </div>
    </div>

    <!-- Aucune donnée -->
    <div v-if="fundings.length === 0" class="empty-state">
      <p class="empty-message">Aucun financement disponible</p>
    </div>

    <!-- Lignes -->
    <div v-else class="resources-grid">
      <div v-for="funding in fundings" :key="funding.id" class="resource-card">
        <div class="card-content">
          <!-- Nom -->
          <div class="resource-title">{{ funding.title }}</div>

          <!-- Opérateur -->
          <div class="resource-operator">{{ funding.operator }}</div>

          <!-- Description -->
          <div class="resource-description">
            {{ funding.description ? funding.description.slice(0, 60) + '…' : '-' }}
          </div>

          <!-- Montant -->
          <div class="resource-amount">
            <span v-if="funding.amount_max">
              {{ funding.amount_min ? funding.amount_min + ' € - ' : '' }}{{ funding.amount_max }} €
            </span>
            <span v-else>-</span>
          </div>

          <!-- Date -->
          <div class="resource-date">{{ formatDate(funding.created_at) }}</div>

          <!-- Actions -->
          <div class="resource-actions">
           
            <button class="btn btn-sm btn-danger" @click="deleteFunding(funding.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publication",
  props: {
    fundings: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("fr-FR");
    },
    editFunding(id) {
      window.location.href = `/admin/fundings/${id}/edit`;
    },
    async deleteFunding(id) {
      if (!confirm("Voulez-vous vraiment supprimer ce financement ?")) return;
      try {
        await axios.delete(`/api/fundings/${id}`);
        this.$emit("deleted", id); // possibilité de répercuter côté parent
      } catch (e) {
        console.error("Erreur lors de la suppression:", e);
      }
    }
  }
};
</script>

<style scoped>
.header-row {
  display: flex;
  font-weight: 700;
  color: #00588f;
  padding: 15px 20px;
}
.header-cell {
  flex: 1;
}
.header-amount, .header-date, .header-action {
  flex: 0 0 150px;
  text-align: center;
}
.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.resource-card {
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,81,131,0.13);
  background: #fff;
}
.custom-search-frame {
    width: 250px;
    max-width: 100%;
    position: relative;
    box-shadow: 5px 4px 15px rgba(0, 81, 131, 0.25);
    border-radius: 8px;
    background-color: #fff;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 12px 23px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.search-input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 19px;
    width: 100%;
}

.search-icon {
    width: 16px;
    position: relative;
    max-height: 100%;
    flex-shrink: 0;
}

.custom-search-input {
    width: 112px;
    position: relative;
    line-height: 24px;
    display: flex;
    align-items: center;
    height: 15px;
    flex-shrink: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.49);
    font-family: 'Poppins', sans-serif;
    flex: 1;
}

.custom-search-input::placeholder {
    color: rgba(0, 0, 0, 0.49);
}

/* Custom Select Styles */
.custom-select-frame {
    width: 180px;
    max-width: 100%;
    position: relative;
    box-shadow: 5px 4px 15px rgba(0, 81, 131, 0.25);
    border-radius: 8px;
    background-color: #fff;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 12px 23px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
}

.select-display-wrapper {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 36px;
}

.category-text {
    width: 86px;
    position: relative;
    line-height: 24px;
    display: flex;
    align-items: center;
    height: 15px;
    flex-shrink: 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.49);
    font-family: 'Poppins', sans-serif;
    flex: 1;
}
.primary-button {
    position: relative;
    border-radius: 8px;
    background-color: #0089db;
    width: auto;
    min-width: 180px;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    box-sizing: border-box;
    gap: 8px;
    text-align: left;
    font-size: 16px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    white-space: nowrap;
}

.primary-button:hover {
    background-color: #0077c2;
    transform: translateY(-1px);
}

.primary-button .button {
    position: relative;
    line-height: 24px;
    font-weight: 600;
}
.card-content {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}
.resource-title { flex: 1; font-weight: 600; }
.resource-operator { flex: 1; }
.resource-description { flex: 2; font-size: 0.9rem; color: #666; }
.resource-amount { flex: 0 0 150px; text-align: center; }
.resource-date { flex: 0 0 150px; text-align: center; }
.resource-actions { flex: 0 0 150px; text-align: center; }
.empty-state {
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
}
.empty-message {
  color: #6c757d;
  font-style: italic;
}
</style>
