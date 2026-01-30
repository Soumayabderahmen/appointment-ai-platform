<template>
  <div class="row">
    <!-- KPI -->
    <div class="col-12 mb-4">
      <div class="row g-3 kpi-row">
        <div class="col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="kpi-card">
            <img src="/asset/img/logo2.png" alt="" class="kpi-icon">
            <p class="kpi-label">Nombre des agents en total</p>
            <p class="kpi-value">
              {{ kpiTotalAll != null ? kpiTotalAll : (Array.isArray(marketplaceAgents) ? marketplaceAgents.length : '—') }}
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="kpi-card">
            <img src="/asset/img/logo3.png" alt="" class="kpi-icon">
            <p class="kpi-label">Nombre total de mes agents</p>
            <p class="kpi-value">
              {{ kpiTotalMine != null ? kpiTotalMine : ((mesagents && mesagents.length) ? mesagents.length : 0) }}
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-12">
          <div class="kpi-card">
            <img src="/asset/img/logo2.png" alt="" class="kpi-icon">
            <p class="kpi-label">Taux de gain de vente</p>
            <p class="kpi-value">{{ kpiSalesRate != null ? (kpiSalesRate + '%') : '—' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Onglets -->
    <div class="col-12 mb-4">
      <div class="nav-align-top shadow-none mb-4">
        <ul class="nav" role="tablist">
          <li class="nav-item">
            <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                    data-bs-target="#navs-top-agents" aria-controls="navs-top-agents" aria-selected="true">
              Mes agents IA
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                    data-bs-target="#navs-top-solde" aria-controls="navs-top-solde" aria-selected="false">
              Solde de vente des agents
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                    data-bs-target="#navs-top-marketplace" aria-controls="navs-top-marketplace" aria-selected="false">
              Marketplace
            </button>
          </li>
        </ul>

        <div class="tab-content px-0">
          <!-- MES AGENTS -->
          <div class="tab-pane fade show active" id="navs-top-agents" role="tabpanel">
            <!-- Filtres -->
            <div class="row filters">
              <div class="col-lg-8 col-md-8 col-sm-8 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-start align-items-center">
                <div class="input-group me-2 mb-4">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M17.8749 18L12.4244 12.3333M1.52344 7.61111C1.52344 8.47929 1.68792 9.33898 2.00748 10.1411C2.32705 10.9432 2.79544 11.672 3.38592 12.2859C3.9764 12.8998 4.6774 13.3867 5.4489 13.719C6.22039 14.0512 7.04728 14.2222 7.88234 14.2222C8.71741 14.2222 9.54429 14.0512 10.3158 13.719C11.0873 13.3867 11.7883 12.8998 12.3788 12.2859C12.9692 11.672 13.4376 10.9432 13.7572 10.1411C14.0768 9.33898 14.2412 8.47929 14.2412 7.61111C14.2412 6.74293 14.0768 5.88325 13.7572 5.08115C13.4376 4.27905 12.9692 3.55025 12.3788 2.93635C11.7883 2.32245 11.0873 1.83548 10.3158 1.50324C9.54429 1.171 8.71741 1 7.88234 1C7.04728 1 6.22039 1.171 5.4489 1.50324C4.6774 1.83548 3.9764 2.32245 3.38592 2.93635C2.79544 3.55025 2.32705 4.27905 2.00748 5.08115C1.68792 5.88325 1.52344 6.74293 1.52344 7.61111Z"
                        stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <input v-model="searchMine" type="text" class="form-control" placeholder="Chercher">
                </div>

                <!-- Filtre par domaine -->
                <select v-model="selectedCategoryMine" class="form-select mb-4">
                  <option value="">Tous les domaines</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-4 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-end align-items-center">
                <a :href="'/agentia/add'" class="btn btn-primary fs-sm mb-4">
                  Ajouter un agent IA
                </a>
              </div>
            </div>

            <!-- Liste -->
            <div class="row">
              <div v-if="filteredAgentsMine.length === 0" class="col-12">
                <div class="alert alert-info">Aucun agent trouvé.</div>
              </div>

              <div v-for="item in filteredAgentsMine" :key="item.id" class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <AgentCard :item="item" />
              </div>
            </div>
          </div>

         

          <!-- MARKETPLACE -->
          <div class="tab-pane fade" id="navs-top-marketplace" role="tabpanel">
            <!-- Filtres marketplace -->
            <div class="row filters">
              <div class="col-lg-9 col-md-9 col-sm-12 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-start align-items-center">
                <div class="input-group me-2 mb-4">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M17.8749 18L12.4244 12.3333M1.52344 7.61111C1.52344 8.47929 1.68792 9.33898 2.00748 10.1411C2.32705 10.9432 2.79544 11.672 3.38592 12.2859C3.9764 12.8998 4.6774 13.3867 5.4489 13.719C6.22039 14.0512 7.04728 14.2222 7.88234 14.2222C8.71741 14.2222 9.54429 14.0512 10.3158 13.719C11.0873 13.3867 11.7883 12.8998 12.3788 12.2859C12.9692 11.672 13.4376 10.9432 13.7572 10.1411C14.0768 9.33898 14.2412 8.47929 14.2412 7.61111C14.2412 6.74293 14.0768 5.88325 13.7572 5.08115C13.4376 4.27905 12.9692 3.55025 12.3788 2.93635C11.7883 2.32245 11.0873 1.83548 10.3158 1.50324C9.54429 1.171 8.71741 1 7.88234 1C7.04728 1 6.22039 1.171 5.4489 1.50324C4.6774 1.83548 3.9764 2.32245 3.38592 2.93635C2.79544 3.55025 2.32705 4.27905 2.00748 5.08115C1.68792 5.88325 1.52344 6.74293 1.52344 7.61111Z"
                        stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <input v-model="searchAll" type="text" class="form-control" placeholder="Chercher dans la marketplace">
                </div>

                <select v-model="selectedCategoryAll" class="form-select mb-4 me-2">
                  <option value="">Tous les domaines</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>

                <select v-model="selectedVisibility" class="form-select mb-4">
                  <option value="">Toutes visibilités</option>
                  <option value="public">Public</option>
                  <option value="private">Privée</option>
                </select>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-end align-items-center">
                <div class="d-flex gap-2 mb-4">
                  <select v-model="sortBy" class="form-select">
                    <option value="recent">Plus récents</option>
                    <option value="alpha">A → Z</option>
                    <option value="popular">Populaires</option>
                  </select>
                  <select v-model.number="perPage" class="form-select">
                    <option :value="6">6 / page</option>
                    <option :value="9">9 / page</option>
                    <option :value="12">12 / page</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Liste marketplace -->
            <div class="row">
              <div v-if="paginatedMarketplace.length === 0" class="col-12">
                <div class="alert alert-info">Aucun agent trouvé dans la marketplace.</div>
              </div>

              <div v-for="item in paginatedMarketplace" :key="item.id" class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <AgentCard :item="item" />
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="d-flex justify-content-center mt-3">
              <nav aria-label="Pagination agents">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage = Math.max(1, currentPage - 1)">Précédent</button>
                  </li>
                  <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: currentPage === p }">
                    <button class="page-link" @click="currentPage = p">{{ p }}</button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="currentPage = Math.min(totalPages, currentPage + 1)">Suivant</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div> <!-- /MARKETPLACE -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* Carte réutilisable */
const AgentCard = {
  name: 'AgentCard',
  props: { 
    item: { type: Object, required: true },
    isMine: { type: Boolean, default: false } // ✅ permet de savoir si c'est "mes agents"
  },
  data() {
    return {
    csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
  },
  methods: {
    labelVisibility(v) {
      if (!v) return '—';
      const s = (v + '').toLowerCase();
      if (s.includes('public')) return 'Agent public';
      if (s.includes('priv'))  return 'Agent privé';
      return v;
    },
    fmt(n) {
      return n ? new Intl.NumberFormat('fr-FR', { 
        minimumFractionDigits: 2, maximumFractionDigits: 2 
      }).format(n) + ' €' : '—';
    }
  },
  template: `
  <div class="card card-1 cardAgent">
    <div class="card-header pb-2">
      <center>
        <model-viewer
          v-if="item.avatar_url"
          :src="item.avatar_url"
          bounds="tight"
          camera-target="0m 1.60m 0m"
          camera-orbit="0deg 90deg 0.9m"
          field-of-view="15deg"
          interaction-prompt="none"
          style="width:180px; height:150px; background:transparent;"
          shadow-intensity="0.6"
          @error="() => { item.avatar_url = null }"
        />
        <img v-else src="/assets/img/dash/robot_smile.png" alt="" style="width:180px;height:180px;object-fit:contain;">
      </center>
      <h4 class="mt-2">{{ item.nom || item.name }}</h4>
    </div>

    <div class="card-body pb-0">
      <p>{{ item.description }}</p>
    </div>

    <div class="card-header pb-2">
      <h4 style="color:#FF8B33;">
        <i class="heroicons-outline/user"></i>
        {{ labelVisibility(item.type || item.visibility) }}
      </h4>
    </div>

    <!-- Boutons -->
    <center class="btns pt-3 flex gap-2 justify-center">
      <!-- Voir plus -->
      <a :href="\`/agentia/details/\${item.id}\`" class="btn btn-primary mb-2">
        Voir plus
      </a>

      <!-- Paiement : visible seulement si prix existe & pas mes agents -->
   <form 
  v-if="!isMine && item.total_price" 
  v-bind:action="'/agentia/' + item.id + '/pay'" 
  method="POST" 
  style="display:inline;"
>
  <input type="hidden" name="_token" :value="csrfToken">
  <button 
    type="submit" 
    class="btn mb-2 text-white" 
    style="background-color:#E65C00;"
  >
    {{ fmt(item.total_price) }}
  </button>
</form>



    </center>
  </div>
  `,
};

export default {
  name: 'AgentsIAListe',
  components: { AgentCard },
  props: {
    mesagents:           { type: Array, required: true },
    marketplaceAgents:   { type: Array, default: () => [] }, // ⚠️ camelCase côté JS
    categories:          { type: Array, default: () => [] },
    kpiTotalAll:         { type: [Number, null], default: null },
    kpiTotalMine:        { type: [Number, null], default: null },
    kpiSalesRate:        { type: [Number, null], default: null },
  },
  data() {
    return {
      // Mes agents
      searchMine: '',
      selectedCategoryMine: '',
      // Marketplace
      searchAll: '',
      selectedCategoryAll: '',
      selectedVisibility: '',
      sortBy: 'recent',
      perPage: 9,
      currentPage: 1,
    };
  },
  computed: {
    /* Mes agents */
    filteredAgentsMine() {
      let list = Array.isArray(this.mesagents) ? this.mesagents.slice() : [];
      // recherche
      if (this.searchMine && this.searchMine.trim()) {
        const q = this.searchMine.toLowerCase();
        list = list.filter(a =>
          ((a.nom || a.name || '') + '').toLowerCase().includes(q) ||
          ((a.type || a.visibility || '') + '').toLowerCase().includes(q) ||
          ((a.description || '') + '').toLowerCase().includes(q) ||
          (((a.category && a.category.name) || '') + '').toLowerCase().includes(q) ||
          (((a.subcategory && a.subcategory.name) || '') + '').toLowerCase().includes(q)
        );
      }
      // catégorie
      if (this.selectedCategoryMine) {
        list = list.filter(a => String(a.category_id) === String(this.selectedCategoryMine));
      }
      return list;
    },

    /* Marketplace */
    filteredMarketplace() {
      let list = Array.isArray(this.marketplaceAgents) ? this.marketplaceAgents.slice() : [];

      // recherche
      if (this.searchAll && this.searchAll.trim()) {
        const q = this.searchAll.toLowerCase();
        list = list.filter(a =>
          ((a.nom || a.name || '') + '').toLowerCase().includes(q) ||
          ((a.type || a.visibility || '') + '').toLowerCase().includes(q) ||
          ((a.description || '') + '').toLowerCase().includes(q) ||
          (((a.category && a.category.name) || '') + '').toLowerCase().includes(q) ||
          (((a.subcategory && a.subcategory.name) || '') + '').toLowerCase().includes(q)
        );
      }

      // catégorie
      if (this.selectedCategoryAll) {
        list = list.filter(a => String(a.category_id) === String(this.selectedCategoryAll));
      }

      // visibilité
      if (this.selectedVisibility) {
        const vis = this.selectedVisibility.toLowerCase();
        list = list.filter(a => ((a.type || a.visibility || '') + '').toLowerCase().includes(vis));
      }

      // tri
      if (this.sortBy === 'alpha') {
        list.sort((a, b) => (a.nom || a.name || '').localeCompare(b.nom || b.name || ''));
      } else if (this.sortBy === 'popular') {
        list.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
      } else {
        // recent
        list.sort((a, b) => {
          const ad = new Date(a.created_at || 0).getTime() || a.id || 0;
          const bd = new Date(b.created_at || 0).getTime() || b.id || 0;
          return bd - ad;
        });
      }

      return list;
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.filteredMarketplace.length / this.perPage));
    },
    paginatedMarketplace() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredMarketplace.slice(start, start + this.perPage);
    },
  },
  watch: {
    // reset pagination si filtres changent
    searchAll() { this.currentPage = 1; },
    selectedCategoryAll() { this.currentPage = 1; },
    selectedVisibility() { this.currentPage = 1; },
    sortBy() { this.currentPage = 1; },
    perPage() { this.currentPage = 1; },
  },
  methods: {
    labelVisibility(v) {
      if (!v) return '—';
      const s = (v + '').toLowerCase();
      if (s.includes('public')) return 'Agent public';
      if (s.includes('priv'))  return 'Agent privé';
      return v;
    },
   
  },
};
</script>

<style scoped>
.kpi-card {
  width: 286px;
  height: 130px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5eaf0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  padding: 12px 16px;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  transition: all .2s ease;
}
.kpi-card:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,0.1); }
.kpi-icon { width: 42px; height: 42px; margin-bottom: 6px; }
.kpi-label { font-size: 13px; font-weight: 500; color: #0093EE; margin: 0; }
.kpi-value { font-size: 22px; font-weight: 700; color: #005183 !important; margin: 0; }
</style>
