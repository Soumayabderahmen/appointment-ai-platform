<template>
  <div class="row">
    <!-- Carte entête -->
    <div class="col-12 mb-5">
      <div class="card card-1 cardDetailsAgent">
        <div class="card-body d-flex gap-4 align-items-start">
          <!-- Avatar -->
         <model-viewer
  v-if="agent.avatar && agent.avatar.glb_url"
  :src="agent.avatar.glb_url"
  bounds="tight"
  camera-target="0m 1.60m 0m"
  camera-orbit="0deg 90deg 0.9m"
  field-of-view="15deg"
  interaction-prompt="none"
  style="width:180px; height:190px; background:transparent;"
  shadow-intensity="0.6"
/>
          <img v-else src="/assets/img/dash/robot_smile_2.png" alt="" style="width:220px;height:220px;object-fit:contain;">

          <!-- Infos -->
          <div class="flex-1">
            <div class="title d-flex justify-content-between align-items-start">
              <h5 class="mb-2">{{ agent.greeting }}</h5>
              <div class="d-flex align-items-center gap-2">
                <template v-if="isOwner">
                  <button class="btn btn-primary fs-sm">Voir les outils</button>
                  <button class="btn btn-primary fs-sm" style="background-color:#E65C00;">Modifier</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary fs-sm">Acheter</button>
                </template>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <img src="/asset/img/icon groupe.png" alt="">
              <h6 class="mb-0" style="color:#FF8B33;">Agent IA {{ agent.type }}</h6>
            </div>

            <br>
            <p class="mb-3">{{ agent.description }}</p>

            <div class="tags d-flex flex-wrap gap-2">
              <span v-for="tag in safeTags" :key="tag">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsabilités -->
    <div class="col-12 mb-5">
      <div class="card card-1 cardTimeline">
        <div class="card-header d-flex align-items-center">
          <h5 class="mb-0">Responsabilités</h5>

<a 
  :href="`/chat/${agent.id}`" 
  class="btn btn-primary fs-sm ms-auto"
>
  Commencez un chat
</a>





        </div>

        <div class="card-body">
          <ul class="timeline mb-0">
            <li v-for="(responsibility, index) in responsibilities" :key="index" class="timeline-item timeline-item-transparent">
              <span class="timeline-point timeline-point-primary"></span>
              <div class="timeline-event p-3">
                <div class="timeline-header mb-3">
                  <h6 class="mb-0">{{ responsibility.title }}</h6>
                </div>
                <div class="content">
                  <ul>
                    <li v-for="(task, taskIndex) in responsibility.tasks" :key="taskIndex">
                      <img src="/assets/img/dash/fleche.png" alt="">
                      {{ task }}
                    </li>
                  </ul>
                  <button v-if="isOwner" class="btn btn-primary fs-sm">Entraîner davantage</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- LISTE DES SOURCES AJOUTÉES -->
    <div class="col-12 mb-5">
      <div class="card card-1 cardSources">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0"><b>Liste des sources ajoutées</b></h5>
          <a v-if="isOwner && addSourceUrl" :href="addSourceUrl" class="btn btn-primary fs-sm">Ajouter une source</a>
        </div>

        <div class="card-body pt-3">
          <!-- En-tête (desktop) -->
          <div class="sources-head d-none d-md-grid">
            <div>Type de source</div>
            <div>Nom/chemin</div>
            <div>Date d’ajout</div>
            <div>Taille</div>
          </div>

          <!-- Lignes -->
          <div v-for="(s, i) in sourcesToShow" :key="i" class="source-card">
            <div class="sources-cell col-type" data-label="Type de source">
              <span class="type-badge">{{ s.type }}</span>
            </div>

            <div class="sources-cell col-name truncate" data-label="Nom/chemin">
              <template v-if="s.url || s.download_url">
                <a :href="s.url || s.download_url" target="_blank" rel="noopener">{{ s.name }}</a>
              </template>
              <template v-else>
                {{ s.name }}
              </template>
            </div>

            <div class="sources-cell col-date" data-label="Date d’ajout">
              {{ formatDate(s.added_at) }}
            </div>

            <div class="sources-cell col-size" data-label="Taille">
              {{ s.size || '—' }}
            </div>
          </div>

          <div v-if="sourcesToShow.length === 0" class="text-center text-muted py-3">
            Aucune source pour le moment.
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'bootstrap';
import '@popperjs/core';

export default {
  name: 'detailsAgentsIA',
  props: {
    agent:        { type: Object,  required: true },
    isOwner:      { type: Boolean, default: false },
    // 🔹 Ajout: données des sources (RAG + Documents) passées par Blade
    sources:      { type: Array,   default: () => [] },
    // 🔹 Ajout: URL facultative pour bouton "Ajouter une source"
    addSourceUrl: { type: String,  default: '' },
  },
  data() {
    return {
      responsibilities: [
        {
          title: 'Optimisation des campagnes publicitaires',
          tasks: [
            'Analyser les performances des publicités.',
            'Proposer des recommandations pour améliorer le ROI.',
            'Ajuster automatiquement les budgets et audiences.',
          ]
        },
        {
          title: 'Génération et qualification de leads',
          tasks: [
            'Identifier les prospects qualifiés via les interactions.',
            'Automatiser l’envoi de messages personnalisés.',
            'Intégrer les leads qualifiés dans le CRM.',
          ]
        },
      ],
      messages: [
        { text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ?', sender: 'bot', time: '10:00' }
      ],
      newMessage: '',
      isTyping: false,
      selectedFiles: [],
    };
  },
  computed: {
    // 🔹 sécurise agent.tags
    safeTags() {
      return Array.isArray(this.agent?.tags) ? this.agent.tags : [];
    },
    // 🔹 garantit un tableau (évite l’erreur .length sur undefined)
    sourcesToShow() {
      return Array.isArray(this.sources) ? this.sources : [];
    },
  },
  methods: {
    handleFileUpload(event, type) {
      const files = event.target.files;
      if (!files?.length) return;
      Array.from(files).forEach(file => {
        if (type === 'photo' && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => {
            this.selectedFiles.push({ file, name: file.name, type: 'image', preview: e.target.result });
          };
          reader.readAsDataURL(file);
        } else if (type === 'doc' && ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
          this.selectedFiles.push({ file, name: file.name, type: 'document' });
        }
      });
      event.target.value = '';
    },
    removeFile(index) { this.selectedFiles.splice(index, 1); },
    sendMessage() {
      if (!this.newMessage.trim() && this.selectedFiles.length === 0) return;
      this.messages.push({ text: this.newMessage, sender: 'user', time: this.getCurrentTime(), files: [...this.selectedFiles] });
      this.isTyping = true;
      setTimeout(() => {
        this.messages.push({ text: 'Fonctionnalité bientôt disponible !', sender: 'bot', time: this.getCurrentTime() });
        this.isTyping = false;
      }, 800);
      this.newMessage = ''; this.selectedFiles = [];
      this.$nextTick(this.scrollToBottom);
    },
    getCurrentTime() {
      const n = new Date();
      return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
    },
    scrollToBottom() {
      const c = this.$refs.chatContainer;
      if (c) c.scrollTop = c.scrollHeight;
    },
    // 🔹 formatage JJ/MM/AAAA
    formatDate(d) {
      if (!d) return '—';
      const dt = new Date(d);
      if (isNaN(dt)) return d; // déjà formaté
      const dd = String(dt.getDate()).padStart(2, '0');
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yy = dt.getFullYear();
      return `${dd}/${mm}/${yy}`;
    },
  },
  mounted() { this.scrollToBottom(); }
};
</script>

<style>
.cardSources .card-header h5 { color:#0093EE; }

/* grille de l’en-tête (desktop) */
.sources-head{
  display:grid;
  grid-template-columns: 1.1fr 2.2fr 1.2fr 0.8fr;
  column-gap:16px;
  font-weight:700;
  color:#0093EE;
  padding:0 6px 10px 6px;
}

/* chaque ligne = carte */
.source-card{
  display:grid;
  grid-template-columns: 1.1fr 2.2fr 1.2fr 0.8fr;
  column-gap:16px;
  align-items:center;
  background:#fff;
  border:1px solid #E5EAF0;
  border-radius:16px;
  box-shadow:0 8px 18px rgba(0,0,0,0.06);
  padding:14px 16px;
  margin-bottom:14px;
  position:relative;
}

.source-card::before{
  content:"";
  position:absolute; left:0; top:10px; bottom:10px; width:6px;
  background:linear-gradient(180deg,#E7F4FF, #F6FBFF);
  border-radius:12px 0 0 12px;
}

.sources-cell{ font-size:14px; color:#1f2937; }
.col-type .type-badge{ font-weight:700; color:#0f172a; }
.truncate{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* Mobile */
@media (max-width: 767px){
  .sources-head{ display:none; }
  .source-card{
    grid-template-columns:1fr;
    row-gap:6px;
    padding:14px;
  }
  .sources-cell{
    display:flex; justify-content:space-between; gap:12px;
  }
  .sources-cell::before{
    content:attr(data-label);
    font-weight:600; color:#0093EE; flex:0 0 auto;
  }
  .truncate{ white-space:normal; }
}
</style>
