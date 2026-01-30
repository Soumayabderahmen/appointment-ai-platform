<template>
  <div class="row">
    <div class="col-12 mb-4">
      <h4>Sources de Connaissances RAG</h4>
      <p class="text-orange fw-bold">
        Ajoutez les sources de données que votre agent IA pourra utiliser pour enrichir ses réponses
      </p>
    </div>

    <div class="rag-wrapper">
      <!-- Header -->
      <div class="rag-header d-flex align-items-start gap-3 mb-4">
        <div class="rag-badge"><span class="plus">+</span></div>
        <div>
          <h4 class="mb-1 fw-semibold">Ajouter une Source de Connaissances</h4>
          <p class="text-muted mb-0">Sélectionnez le type de contenu à indexer pour votre agent IA</p>
        </div>
      </div>

      <!-- Grid -->
      <div class="rag-grid">
        <!-- Fichiers -->
        <button class="rag-card" :class="{ active: selectedSource==='files' }" @click="onSelect('files')" type="button">
          <span class="icon" v-html="icons.pdf"></span>
          <div class="title">Fichiers</div>
          <div class="sub">PDF</div>
          <div class="desc">Documents, manuels, guides</div>
        </button>

        <!-- URL / Site Web -->
        <button class="rag-card" :class="{ active: selectedSource==='url' }" @click="onSelect('url')" type="button">
          <span class="icon" v-html="icons.globe"></span>
          <div class="title">URL / Site Web</div>
          <div class="sub">Pages web, articles</div>
          <div class="desc">Documentation en ligne</div>
        </button>

        <!-- Données Internes -->
        <button class="rag-card" :class="{ active: selectedSource==='internal' }" @click="onSelect('internal')" type="button">
          <span class="icon" v-html="icons.db"></span>
          <div class="title">Données Internes</div>
          <div class="sub">CRM, Google Sheets</div>
          <div class="desc">Bases de données</div>
        </button>

        <!-- Notes Manuelles -->
        <button class="rag-card" :class="{ active: selectedSource==='notes' }" @click="onSelect('notes')" type="button">
          <span class="icon" v-html="icons.note"></span>
          <div class="title">Notes Manuelles</div>
          <div class="sub">Instructions spécifiques</div>
          <div class="desc">Règles métier</div>
        </button>

        <!-- API Externe -->
        <button class="rag-card" :class="{ active: selectedSource==='api' }" @click="onSelect('api')" type="button">
          <span class="icon" v-html="icons.code"></span>
          <div class="title">API Externe</div>
          <div class="sub">Données JSON</div>
          <div class="desc">Intégrations temps réel</div>
        </button>

        <!-- Notion / Airtable -->
        <button class="rag-card" :class="{ active: selectedSource==='collab' }" @click="onSelect('collab')" type="button">
          <span class="icon" v-html="icons.tools"></span>
          <div class="title">Notion / Airtable</div>
          <div class="sub">Bases de connaissances</div>
          <div class="desc">Outils collaboratifs</div>
        </button>
      </div>

     
     <!-- Step4Rag.vue -->
<div v-if="selectedSource==='files'" class="config-wrapper mt-4">
  <div class="config-title">Configuration - Fichiers</div>

  <div class="dropzone" :class="{ 'is-dragover': isDragOver }"
       @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave"
       @drop.prevent="onDrop" @click="triggerFileSelect">
    <div class="cloud"> ...svg... </div>
    <div class="dz-text">
      <div class="dz-bold">Glissez vos fichiers ici</div>
      <div class="dz-or">ou cliquez pour sélectionner</div>
      <div class="dz-small">PDF, DOCX, TXT — Max 50 MB par fichier</div>
    </div>
    <input ref="fileInput" type="file" class="d-none" multiple :accept="accepted" @change="onFilesSelected" />
  </div>

  <!-- Liste fichiers -->
  <ul v-if="files.length" class="file-list mt-3">
    <li v-for="(f,i) in files" :key="i" class="file-item">
      <span class="fname">{{ f.name }}</span>
      <span class="fsize">{{ humanSize(f.size) }}</span>
    </li>
  </ul>

  <div class="mt-3 d-flex gap-2">
    <button class="btn btn-outline-secondary" @click="clearFiles" :disabled="!files.length">Effacer</button>
  </div>
</div>

      <!-- CONFIG — URL -->
     <!-- CONFIG — URL -->
<div v-if="selectedSource==='url'" class="config-wrapper mt-4">
  <div class="config-title">Configuration - URL / Site Web</div>

  <label class="form-label small mb-1">URL à indexer</label>
  <input
    v-model.trim="urlConfig.target"
    :class="['form-control','mb-1', urlError? 'is-invalid':'']"
    type="text"
    placeholder="https://votre-site.com/documentation"
    @input="onUrlInput"
  />
  <div v-if="urlError" class="invalid-feedback mb-2">{{ urlError }}</div>
  <small v-else-if="urlConfig.target" class="text-muted d-block mb-2">
    {{ urlStatusMsg }}
  </small>

  <label class="form-label small mb-1">Profondeur de crawl</label>
  <div class="select-wrap mb-1">
    <select v-model="urlConfig.depth" class="form-select" @change="onDepthChange">
      <option value="single">Page unique</option>
      <option value="site">Tout le site (même domaine)</option>
      <option value="path">Même chemin (sous-pages)</option>
      <option value="sitemap">Depuis sitemap.xml</option>
      <option value="levels-2">Jusqu’à 2 niveaux</option>
      <option value="levels-3">Jusqu’à 3 niveaux</option>
    </select>
    <span class="chev">▾</span>
  </div>

  <div class="mt-2">
    <button class="btn btn-outline-secondary" @click="resetUrl">Réinitialiser</button>
  </div>
</div>


      <!-- CONFIG — DONNÉES INTERNES -->
      <div v-if="selectedSource==='internal'" class="config-wrapper mt-4">
        <div class="config-title">Configuration - Données Internes</div>

        <label class="form-label small mb-1">Type de source</label>
        <div class="select-wrap mb-3">
          <select v-model="internalConfig.type" class="form-select">
            <option value="sheets">Google Sheets</option>
            
          </select>
          <span class="chev">▾</span>
        </div>
     
        <label  class="form-label small mb-1">URL ou ID de la source</label>
        <input  v-model.trim="internalConfig.url" type="text" class="form-control mb-3" placeholder="ID Google Sheets / Chaîne de connexion / URL API"/>



        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="resetInternal">Réinitialiser</button>
        </div>
      </div>

      <!-- CONFIG — NOTES MANUELLES -->
      <div v-if="selectedSource==='notes'" class="config-wrapper mt-4">
        <div class="config-title">Configuration - Notes Manuelles</div>
        <label class="form-label small mb-1">Titre de la note</label>
        <input v-model.trim="noteConfig.title"   @input="onNoteInput"   type="text" class="form-control mb-3" placeholder="Ex: Règles de pricing"/>

        <label class="form-label small mb-1">Contenu</label>
        <textarea v-model.trim="noteConfig.content"   @input="onNoteInput"   class="form-control" rows="6" placeholder="Saisissez vos instructions ou règles métier..."></textarea>

        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="resetNote">Effacer</button>
        </div>
      </div>

     <!-- CONFIG — API EXTERNE -->
<div v-if="selectedSource==='api'" class="config-wrapper mt-4">
  <div class="config-title">Configuration - API Externe</div>

  <label class="form-label small mb-1">URL de l'API</label>
  <input v-model.trim="apiConfig.url"
         @input="emitApi"
         type="text"
         class="form-control mb-3"
         placeholder="https://api.exemple.com/data"/>

  <label class="form-label small mb-1">Clé d’authentification</label>
  <input v-model.trim="apiConfig.key"
         @input="emitApi"
         type="text"
         class="form-control mb-3"
         placeholder="Votre clé API"/>

  <label class="form-label small mb-1">Structure JSON attendue</label>
  <textarea v-model.trim="apiConfig.structure"
            @input="emitApi"
            class="form-control"
            rows="4"
            placeholder='{"data":[{"title":"","content":""}]}'></textarea>

  <div class="mt-3 d-flex gap-2">
    <button class="btn btn-outline-secondary" @click="resetApi">Réinitialiser</button>
  </div>
</div>

      <!-- CONFIG — NOTION / AIRTABLE -->
      <div v-if="selectedSource==='collab'" class="config-wrapper mt-4">
        <div class="config-title">Configuration - Notion / Airtable</div>

        <label class="form-label small mb-1">Plateforme</label>
        <div class="select-wrap mb-3">
          <select v-model="collabConfig.platform" class="form-select">
            <option value="notion">Notion</option>
          
          </select>
          <span class="chev">▾</span>
        </div>

        <label class="form-label small mb-1">ID de la base / page</label>
        <input v-model.trim="collabConfig.id"  @input="emitCollab" type="text" class="form-control mb-3" placeholder="ID ou URL de votre base"/>

        <label class="form-label small mb-1">Token d’accès</label>
        <input v-model.trim="collabConfig.token"  @input="emitCollab" type="text" class="form-control mb-3" placeholder="Token d'intégration"/>

        <div class="mt-2 d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="resetCollab">Réinitialiser</button>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
  export default {
  name: "Step4Rag",
  // props:{
  //   agentId: { type: [Number, String], required: true }
  
  // },
  emits: ["select-source", "files-selected", "url-config", "internal-config", "note-submit", "api-config", "collab-config"],
  data() {
    return {
      selectedSource: null,
      urlConfig: { target: "", depth: "single" },
      urlError: null,
      _debounceTimer: null,
      internalConfig: {
        type: "sheets", // sheets | sql | crm
        url: "",
        sql: { host: "", port: 3306, db: "", user: "", pass: "" }
      },
      noteConfig: { title: "", content: "", format: "markdown" },
 apiConfig: { url: "", key: "", structure: "" },
     collabConfig: { platform: "notion", id: "", token: "" },


      // Files
      accepted: ".pdf,.doc,.docx,.txt",
      files: [],
      isDragOver: false,

      // URL config
      urlConfig: { target: "", depth: "single" },
      urlError: null,

      // Internal data
      internalConfig: {
        type: "sheets", // sheets | sql | crm
        url: "",
        sql: { host: "", port: 3306, db: "", user: "", pass: "" }
      },

      // Notes
      noteConfig: { title: "", content: "" },

      // API
      apiConfig: { url: "", key: "", structure: "" },

      // Notion/Airtable
      collabConfig: { platform: "notion", id: "", token: "" },

      // SVG icons
      icons: {
        pdf: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <path d="M30 4H14a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V12z" fill="#e8f2ff"/>
            <path d="M30 4v8a4 4 0 0 0 4 4h8" fill="none" stroke="#1b78f2" stroke-width="2"/>
            <path d="M13 30h22M13 36h14" stroke="#1b78f2" stroke-width="2"/>
            <rect x="10" y="10" width="18" height="12" rx="2" fill="#1b78f2"/>
            <text x="19" y="20" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PDF</text>
          </svg>`,
        globe: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M4 24h40M24 4c6 6 9 14 9 20s-3 14-9 20c-6-6-9-14-9-20S18 10 24 4Z" fill="none" stroke="#1b78f2" stroke-width="2"/>
          </svg>`,
        db: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <ellipse cx="24" cy="10" rx="14" ry="6" fill="#1b78f2"/>
            <path d="M10 10v14c0 3.3 6.3 6 14 6s14-2.7 14-6V10" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M10 24c0 3.3 6.3 6 14 6s14-2.7 14-6M10 18c0 3.3 6.3 6 14 6s14-2.7 14-6" fill="none" stroke="#1b78f2" stroke-width="2"/>
          </svg>`,
        note: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <rect x="8" y="6" width="28" height="36" rx="4" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M16 14h12M16 20h16M16 26h10" stroke="#1b78f2" stroke-width="2"/>
            <path d="M36 30l4 8-8-4z" fill="#1b78f2"/>
          </svg>`,
        code: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M19 16l-7 8 7 8M29 16l7 8-7 8" fill="none" stroke="#1b78f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        tools: `
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M28 14l6 6-12 12-6-6z" fill="none" stroke="#1b78f2" stroke-width="2"/>
            <path d="M20 28l-6 6" stroke="#1b78f2" stroke-width="2" stroke-linecap="round"/>
          </svg>`
      }
    };
  },
  computed: {
    canSubmitUrl() { return this.urlConfig.target && !this.urlError; },
    urlStatusMsg() {
      return this.urlError ? "" : "👍 URL valide — sera incluse automatiquement lors de l’ajout de l’agent";
    }
  },
  methods: {
     _debounce(fn, delay = 600) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(fn, delay);
    },
    onNoteInput() {
      // émet (debounced) vers le parent dès que l’utilisateur tape
      this._debounce(() => {
        this.emitNote(); // envoie le payload au parent
      });
    },
    emitNote() {
      // on n’envoie que si l’un des deux champs est rempli
      if (!this.noteConfig.title && !this.noteConfig.content) return;
      this.$emit("note-submit", {
        title:   (this.noteConfig.title || "").trim(),
        content: (this.noteConfig.content || "").trim(),
        format:  this.noteConfig.format || "markdown",
      });
    },
    resetNote() {
      this.noteConfig = { title: "", content: "", format: "markdown" };
      // optionnel: prévenir le parent qu’on “vide” la note
      this.$emit("note-submit", { title: "", content: "", format: "markdown" });
    },
 emitApi() {
      // On remonte tel quel (le parent décidera d’envoyer ou non)
      this.$emit("api-config", {
        url: (this.apiConfig.url || "").trim(),
        api_key: (this.apiConfig.key || "").trim(),
        structure: this.apiConfig.structure || "" // string JSON
      });
    },
    resetApi() {
      this.apiConfig = { url: "", key: "", structure: "" };
      this.$emit("api-config", { url: "", api_key: "", structure: "" });
    },
    emitInternalAuto() {
      // Normalise la charge utile (évite d’envoyer des champs vides inutiles)
      const t = this.internalConfig?.type || null;
      const payload = {
        type: t,
        url: this.internalConfig?.url || null
      };
      if (t === 'sql') {
        const s = this.internalConfig.sql || {};
        payload.sql = {
          host: s.host || "",
          port: Number.isFinite(+s.port) ? +s.port : 3306,
          db:   s.db   || "",
          user: s.user || "",
          pass: s.pass || ""
        };
      }
      this.$emit("internal-config", payload);
    },
    onSelect(type) {
      this.selectedSource = type;
      this.$emit("select-source", type);
    },
 formatDate(d) {
    try {
      const date = new Date(d);
      return date.toLocaleDateString('fr-FR');
    } catch { return d || '—'; }
  },
 onDepthChange() {
      // si l’URL est valide, on renvoie immédiatement la config
      this.validateUrl();
      this.autoSendUrl();
    },
   onUrlInput() {
      // valide au fil de la saisie (avec debounce pour éviter spam)
      this._debounce(() => {
        this.validateUrl();
        this.autoSendUrl();
      });
    },
     validateUrl() {
      this.urlError = null;
      const val = this.urlConfig.target;
      if (!val) return; // vide = pas d’erreur, pas d’envoi
      try {
        const u = new URL(val);
        if (!/^https?:$/.test(u.protocol)) throw new Error();
      } catch {
        this.urlError = "URL invalide. Utilisez un lien commençant par http(s)://";
      }
    },
    autoSendUrl() {
      if (!this.urlConfig.target || this.urlError) return;
      // on émet automatiquement la config vers le parent (Add.vue)
      this.$emit("url-config", { ...this.urlConfig });
    },
    resetUrl() {
      this.urlConfig = { target: "", depth: "single" };
      this.urlError = null;
      // on peut notifier le parent qu’il doit vider l’URL si besoin :
      this.$emit("url-config", { target: "", depth: "single" });
    },

    // -------- Files
    triggerFileSelect() { this.$refs.fileInput?.click(); },
      onFilesSelected(e) {
      const picked = Array.from(e.target.files || []);
      this.addFiles(picked);
      e.target.value = "";
    },
    onDragOver() { this.isDragOver = true; },
    onDragLeave() { this.isDragOver = false; },
      onDrop(e) {
      this.isDragOver = false;
      const dropped = Array.from(e.dataTransfer.files || []);
      this.files = [...this.files, ...dropped];
      this.$emit("files-change", this.files);   // 👈 émet instantanément
    },
async emitFiles() {
    if (!this.files.length) return;

    const formData = new FormData();
    formData.append('file', this.files[0]); // si un seul fichier
    formData.append('agent_i_a_id', this.agentId); // l’ID de l’agent IA
    formData.append('type_label', 'Fichier PDF');
    formData.append('config', JSON.stringify({}));

    try {
        const res = await axios.post('/api/agentia/rag-sources/file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Fichier envoyé', res.data);
    } catch (err) {
        console.error(err.response?.data || err);
    }
},
addFiles(list) {
      // (optionnel) validations simples côté front
      const MAX = 50 * 1024 * 1024; // 50MB
      const allowed = ["pdf","doc","docx","txt"];
      const clean = [];

      for (const f of list) {
        const ext = (f.name.split(".").pop() || "").toLowerCase();
        if (!allowed.includes(ext)) {
          // tu peux mettre un toast ici si tu utilises un toaster global
          console.warn(`Extension non autorisée: ${f.name}`);
          continue;
        }
        if (f.size > MAX) {
          console.warn(`Fichier trop volumineux (>50MB): ${f.name}`);
          continue;
        }
        clean.push(f);
      }

      this.files = [...this.files, ...clean];
      // 👉 on remonte TOUTE la liste au parent; le parent l’enverra dans submitForm()
      this.$emit("files-selected", this.files);
    },
    humanSize(bytes) {
      if (!bytes && bytes !== 0) return "";
      const k=1024, sizes=["B","KB","MB","GB"];
      const i=Math.floor(Math.log(bytes)/Math.log(k));
      return (bytes/Math.pow(k,i)).toFixed(1)+" "+sizes[i];
    },

    // -------- URL
    validateUrl() {
      this.urlError = null;
      const val = this.urlConfig.target;
      if (!val) return;
      try {
        const u = new URL(val);
        if (!/^https?:$/.test(u.protocol)) throw new Error();
      } catch {
        this.urlError = "URL invalide. Utilisez un lien commençant par http(s)://";
      }
    },
    emitUrlConfig() {
      this.validateUrl();
      if (this.urlError) return;
      this.$emit("url-config", { ...this.urlConfig });
    },
    resetUrl() { this.urlConfig = { target: "", depth: "single" }; this.urlError = null; },

    // -------- Internal
    emitInternal() { this.$emit("internal-config", JSON.parse(JSON.stringify(this.internalConfig))); },
    resetInternal() {
      this.internalConfig = { type: "sheets", url: "", sql: { host:"", port:3306, db:"", user:"", pass:"" } };
    },
    clearFiles() {
      this.files = [];
      this.$emit("files-change", this.files);
    },

    // -------- Notes
    emitNote() { this.$emit("note-submit", { ...this.noteConfig }); },
    resetNote() { this.noteConfig = { title: "", content: "" }; },

    // -------- API
    emitApi() { this.$emit("api-config", { ...this.apiConfig }); },
    resetApi() { this.apiConfig = { url: "", key: "", structure: "" }; },

    // -------- Notion/Airtable
    emitCollab() { this.$emit("collab-config", { ...this.collabConfig }); },
    resetCollab() { this.collabConfig = { platform: "notion", id: "", token: "" }; }
  },
  watch: {
    // À chaque changement du type ou de l’URL => on émet automatiquement (debounced)
    "internalConfig.type"(v) { this._debounce(() => this.emitInternalAuto()); },
    "internalConfig.url"(v)  { this._debounce(() => this.emitInternalAuto()); },
    apiConfig: {
      deep: true,
      handler() { this._debounce(() => this.emitApi()); }
    },

    // Et pour tous les champs SQL
    "internalConfig.sql.host"(v) { this._debounce(() => this.emitInternalAuto()); },
    "internalConfig.sql.port"(v) { this._debounce(() => this.emitInternalAuto()); },
    "internalConfig.sql.db"(v)   { this._debounce(() => this.emitInternalAuto()); },
    "internalConfig.sql.user"(v) { this._debounce(() => this.emitInternalAuto()); },
    "internalConfig.sql.pass"(v) { this._debounce(() => this.emitInternalAuto()); },
  }
};
</script>

<style scoped>
/* Wrapper & header */
.rag-wrapper { background:#fff; border-radius:12px; border:1px solid #edf0f5; padding:24px; }
.rag-header .rag-badge{ width:36px; height:36px; border-radius:999px; background:#e8f2ff; color:#1b78f2; display:inline-flex; align-items:center; justify-content:center; border:1px solid #d7e7ff; }
.rag-header .plus{ font-weight:700; font-size:18px; line-height:1; }

/* Grid */
.rag-grid{ display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px){ .rag-grid{ grid-template-columns:repeat(3,1fr); } }

/* Cards */
.rag-card{ text-align:center; background:#fff; border:1px solid #e9edf4; border-radius:14px; padding:28px 22px; box-shadow:0 4px 14px rgba(18,38,63,.05); transition:all .18s ease; cursor:pointer; }
.rag-card:hover{ transform:translateY(-2px); border-color:#cfe2ff; box-shadow:0 10px 22px rgba(27,120,242,.08); }
.rag-card.active{ border-color:#1b78f2; box-shadow:0 0 0 3px rgba(27,120,242,.12); }
.rag-card .icon{ display:inline-flex; margin-bottom:12px; }
.title{ font-weight:700; color:#222; font-size:18px; margin-bottom:4px; }
.sub{ font-size:13px; color:#1b78f2; font-weight:600; }
.desc{ font-size:13px; color:#6b7280; }

/* Config panes */
.config-wrapper{ background:#fff; border:1px solid #e9edf4; border-radius:12px; padding:16px; }
.config-title{ font-weight:700; color:#2a2f45; margin-bottom:12px; }

/* Dropzone */
.dropzone{ border:2px dashed #b7d3ff; background:#ebf4ff; border-radius:12px; padding:32px 16px; text-align:center; cursor:pointer; transition:all .15s ease; }
.dropzone:hover, .dropzone.is-dragover{ border-color:#1b78f2; background:#e6f0ff; }
.cloud{ display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
.dz-text .dz-bold{ font-weight:700; color:#2a2f45; }
.dz-text .dz-or{ font-size:13px; color:#6b7280; margin-top:2px; }
.dz-text .dz-small{ font-size:12px; color:#718096; margin-top:6px; }

/* Files list */
.file-list{ list-style:none; padding:0; margin:0; }
.file-item{ display:flex; justify-content:space-between; padding:10px 12px; border:1px solid #edf0f5; border-radius:10px; margin-bottom:8px; background:#fff; }
.fname{ font-weight:600; color:#2a2f45; }
.fsize{ color:#6b7280; font-size:13px; }

/* Inputs & selects */
.form-control,.form-select{ border:1px solid #e1e7f0; border-radius:10px; padding:10px 12px; box-shadow:none; outline:none; }
.form-control:focus,.form-select:focus{ border-color:#1b78f2; box-shadow:0 0 0 3px rgba(27,120,242,.12); }
.is-invalid{ border-color:#dc3545 !important; }
.invalid-feedback{ color:#dc3545; }

/* Select caret */
.select-wrap{ position:relative; }
.select-wrap .chev{ position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:#4b5563; }

/* Buttons (utilise classes Bootstrap si disponibles) */
.btn{ border-radius:10px; padding:.55rem 1rem; }
.btn-primary{ background:#1b78f2; border-color:#1b78f2; }
.btn-primary:disabled{ opacity:.65; }
.btn-outline-secondary{ border-color:#cbd5e1; color:#334155; background:#fff; }

/* Tableau */
.sources-wrapper{ background:#fff; border:1px solid #e9edf4; border-radius:12px; padding:16px; }
.hdr-icon{ color:#1b78f2; font-size:18px; }

.rag-table { width:100%; border-collapse:separate; border-spacing:0 8px; }
.rag-table thead th{
  font-size:13px; color:#6b7280; font-weight:600; border:none; padding:10px 14px;
}
.rag-table tbody tr{
  background:#fff; border:1px solid #edf0f5; border-radius:12px;
}
.rag-table tbody td{
  padding:12px 14px; border-top:1px solid #edf0f5; border-bottom:1px solid #edf0f5;
}
.rag-table tbody tr td:first-child { border-left:1px solid #edf0f5; border-top-left-radius:12px; border-bottom-left-radius:12px; }
.rag-table tbody tr td:last-child  { border-right:1px solid #edf0f5; border-top-right-radius:12px; border-bottom-right-radius:12px; }
.truncate{ max-width:380px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.src-link{ color:#111827; text-decoration:none; }
.src-link:hover{ text-decoration:underline; }

/* Type badges */
.type-badge{ display:inline-block; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:700; }
.type-file{ background:#eaf2ff; color:#1b78f2; }
.type-url{ background:#f3e8ff; color:#7c3aed; }
.type-api{ background:#e6f7ef; color:#059669; }
.type-db{ background:#fff7e6; color:#d97706; }
.type-note{ background:#eef2ff; color:#3b82f6; }
.type-collab{ background:#eefdfd; color:#0891b2; }

/* Status pills */
.status-pill{ display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:600; }
.status-pill .dot{ width:8px; height:8px; border-radius:999px; background:#9ca3af; }
.st-indexed{ background:#e7f6ec; color:#15803d; }
.st-indexed .dot{ background:#22c55e; }
.st-running{ background:#fff7e6; color:#b45309; }
.st-running .dot{ background:#f59e0b; }
.st-connected{ background:#e7f6ec; color:#15803d; }
.st-connected .dot{ background:#22c55e; }
.st-error{ background:#fee2e2; color:#b91c1c; }
.st-error .dot{ background:#ef4444; }

/* Action buttons */
.btns{ display:inline-flex; gap:8px; }
.icon-btn{
  border:1px solid #e5e7eb; background:#fff; border-radius:8px;
  width:34px; height:34px; display:inline-flex; align-items:center; justify-content:center;
  color:#4b5563; transition:.15s;
}
.icon-btn:hover{ border-color:#cfe2ff; color:#1b78f2; box-shadow:0 0 0 3px rgba(27,120,242,.12); }
.icon-btn.danger:hover{ border-color:#fecaca; color:#dc2626; box-shadow:0 0 0 3px rgba(220,38,38,.12); }

</style>
