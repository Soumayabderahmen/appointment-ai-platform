<script>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'

export default {
  name: "Step5N8N",

  props: {
    previewBase: { type: String, default: '' },
    apiProjectsUrl: { type: String, default: '/api/n8n/projects' },
    apiProjectWorkflowsBase: { type: String, default: '/api/n8n/projects' }, // + /{projectId}/workflows
    scenarios: { type: Array, default: () => [] },
    autoOpenFirstProject: { type: Boolean, default: true },
    defaultProjectId: { type: String, default: '' },

    // v-model
    title:   { type: String, default: '' },
    mission: { type: String, default: '' },
  },

  emits: ['update:title', 'update:mission', 'select-workflow', 'customize', 'preview'],

  setup(props, { emit }) {
    // --------- v-model proxies ---------
    const titleProxy = computed({
      get: () => props.title,
      set: v => emit('update:title', v)
    })
    const missionProxy = computed({
      get: () => props.mission,
      set: v => emit('update:mission', v)
    })

    // ---------------- Utils ----------------
    const axiosErr = (e, fallback) =>
      (e?.response?.data?.message || e?.message || fallback)

    const ICONS = {
      personal: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/user.svg',
      team: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/users.svg',
      Gmail: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-gmail.svg',
      Slack: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-slack.svg',
      Stripe: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-stripe.svg',
      'Google Sheets': 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/file-spreadsheet.svg',
      Notion: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-notion.svg',
      PDF: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/file-text.svg',
      _default: 'https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/route.svg'
    }
    const pickIcon = (key) => ICONS[key] || ICONS._default

    const toPlain = (s) => String(s || '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\/?[^>]+>/g, '')
      .replace(/[#*_`>]+/g, '')
      .trim()

    const pretty = (v) => {
      try { return JSON.stringify(v ?? {}, null, 2) } catch { return String(v ?? '') }
    }
// --- Ne garder que la section "Objectif" (fr/en) ---
function extractObjective(raw, fallback = '') {
  const plain = toPlain(raw || fallback || '').replace(/\r\n/g, '\n')
  if (!plain) return ''

  // 1) repère le début : "Objectif / Objectifs / But / Goal / Purpose"
  const startRe = /(^|\n)\s*(?:##\s*)?(Objectif|Objectifs|But|Goal|Purpose)\b[^\n]*\n/i
  const mStart = plain.match(startRe)

  // si pas d'Objectif → on tente 1er paragraphe court
  if (!mStart) {
    const first = (plain.split(/\n{2,}/).find(p => p.trim().length) || '').trim()
    return first
  }

  const contentStart = (mStart.index ?? 0) + mStart[0].length

  // 2) repère la prochaine section (Webhook | Contrat | Exemple | …)
  const after = plain.slice(contentStart)
  const endRe = /(^|\n)\s*(?:##\s*)?(Webhook|Contrat(?:\s*\([^)]*\))?|Entrée|Inputs?|Exemple|Examples?|Output|Sortie|Notes?)\b/ig
  const mEnd = endRe.exec(after)
  const contentEnd = mEnd ? contentStart + mEnd.index : plain.length

  // 3) nettoie le bloc
  let chunk = plain.slice(contentStart, contentEnd).trim()
  // vire une ligne seule "json" si présente
  chunk = chunk.replace(/^\s*json\s*$/im, '').trim()
  // supprime puces vides
  chunk = chunk.replace(/^\s*[-–•]\s*$/gm, '').trim()

  return chunk
}


    // ---------------- State projets ----------------
    const loadingProjects = ref(false)
    const errorProjects = ref('')
    const projects = ref([])

    const qProject = ref('')
    const typeFilter = ref('')
    const projectTypes = computed(() => {
      const set = new Set(projects.value.map(p => p.type).filter(Boolean))
      return Array.from(set)
    })
    const filteredProjects = computed(() => {
      const qv = qProject.value.toLowerCase()
      return projects.value.filter(p => {
        const matchQ = !qv || (p.name || '').toLowerCase().includes(qv)
        const matchType = !typeFilter.value || p.type === typeFilter.value
        return matchQ && matchType
      })
    })

    async function fetchProjects() {
      loadingProjects.value = true
      errorProjects.value = ''
      try {
        const { data } = await axios.get(props.apiProjectsUrl)
        projects.value = data?.data ?? data ?? []

        await nextTick()
        if (projects.value.length > 0 && !selectedProjectId.value) {
          let toOpen = null
          if (props.defaultProjectId) {
            toOpen = projects.value.find(p => String(p.id) === String(props.defaultProjectId)) || null
          }
          if (!toOpen && props.autoOpenFirstProject) {
            toOpen = projects.value[0]
          }
          if (toOpen) loadWorkflowsOf(toOpen)
        }
      } catch (e) {
        errorProjects.value = axiosErr(e, 'Erreur de chargement des projets')
      } finally {
        loadingProjects.value = false
      }
    }

    onMounted(fetchProjects)

    // ---------------- State workflows d’un projet ----------------
    const loadingWf = ref(false)
    const errorWf = ref('')
    const workflows = ref([])
    const selectedProjectId = ref('')
    const selectedProjectName = ref('')
    const iframeKey = ref(0)

    const mapApiWfToUi = (w) => {
      const rawTags = Array.isArray(w.tags) ? w.tags : []
      const tags = rawTags.map(t => typeof t === 'string' ? t : (t?.name || '')).filter(Boolean)
      const domain = tags[0] || 'Général'
      const tools = rawTags.length > 1 ? tags.slice(1) : ['n8n']

      const params = w.params || {}
      const contract = Array.isArray(params?.contract) ? params.contract : []
      const nodesParams = Array.isArray(params?.nodes_parameters) ? params.nodes_parameters : (Array.isArray(w.nodes_parameters) ? w.nodes_parameters : [])

      return {
        id: String(w.id ?? w._id ?? Math.random().toString(36).slice(2)),
        title: w.name || 'Sans nom',
        domain,
        tools,
        icon: pickIcon((tools[0] || domain)),
        workflowId: String(w.id ?? ''),
        previewUrl: w.editorUrl ? `${w.editorUrl}?readOnly=true` : '',
        editorUrl: w.editorUrl || '',
        // garder brut + texte
        descRaw: w.description || '',
        descText: toPlain(w.description || ''),
        webhookUrl: w.webhook_url || '',
        webhookTestUrl: w.webhook_test_url || '',
        webhookMethod: (w.webhook_method || '').toUpperCase(),
        paramsContract: contract,
        paramsNodes: nodesParams
      }
    }

    async function loadWorkflowsOf(project) {
      if (!project || !project.id) return
      selectedProjectId.value = project.id
      selectedProjectName.value = project.name || ''

      q.value = ''
      domain.value = ''
      selectedTools.clear()

      loadingWf.value = true
      errorWf.value = ''
      workflows.value = []
      try {
        const base = props.apiProjectWorkflowsBase.replace(/\/+$/, '')
        const url = `${base}/${encodeURIComponent(project.id)}/workflows?with_details=1`
        const { data } = await axios.get(url)
        const arr = data?.data ?? data ?? []
        workflows.value = arr.map(mapApiWfToUi)
        iframeKey.value++
      } catch (e) {
        errorWf.value = axiosErr(e, 'Erreur de chargement des workflows')
      } finally {
        loadingWf.value = false
      }
    }

    // -------- Sélection workflow --------
    const selectedWorkflowId = ref('')
   function selectWorkflow(item) {
  selectedWorkflowId.value = item.workflowId

  emit('select-workflow', {
    workflowId: item.workflowId,
    name: item.title,
    editorUrl: item.editorUrl,
    webhookUrl: item.webhookUrl,
    webhookTestUrl: item.webhookTestUrl,
    webhookMethod: item.webhookMethod,
    contract: item.paramsContract,
    paramsNodes: item.paramsNodes,
    projectId: selectedProjectId.value,
    projectName: selectedProjectName.value,
  })

  // ⚠️ Toujours mettre à jour le titre et la mission
  emit('update:title', item.title || '')

  // Mission = uniquement la section "Objectif"
  const missionOnly = extractObjective(item.descRaw, item.descText)
  // fallback si rien trouvé
  const finalMission = missionOnly || item.descText || item.domain || ''
  emit('update:mission', finalMission)
}


    // ---------------- Filtres & recherche (workflows) ----------------
    const q = ref('')
    const domain = ref('')
    const selectedTools = reactive(new Set())

    const domains = computed(() => {
      const set = new Set(workflows.value.map(s => s.domain).filter(Boolean))
      return Array.from(set)
    })
    const allTools = computed(() => {
      const set = new Set()
      workflows.value.forEach(s => (s.tools || []).forEach(t => set.add(t)))
      return Array.from(set)
    })
    const topTools = computed(() => {
      const counts = {}
      workflows.value.forEach(s => (s.tools || []).forEach(t => { counts[t] = (counts[t] || 0) + 1 }))
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([t]) => t)
    })

    const filtered = computed(() => {
      const qv = q.value.toLowerCase()
      const needsTools = selectedTools.size > 0
      return workflows.value.filter(s => {
        const matchQ =
          !qv ||
          (s.title || '').toLowerCase().includes(qv) ||
          (s.domain || '').toLowerCase().includes(qv) ||
          (s.descText || '').toLowerCase().includes(qv) ||
          (s.tools || []).some(t => (t || '').toLowerCase().includes(qv)) ||
          (Array.isArray(s.paramsContract) && s.paramsContract.some(f =>
            (f.name || '').toLowerCase().includes(qv) ||
            (f.type || '').toLowerCase().includes(qv) ||
            (f.description || '').toLowerCase().includes(qv)
          ))
        const matchDomain = !domain.value || s.domain === domain.value
        const matchTools = !needsTools || Array.from(selectedTools).every(t => (s.tools || []).includes(t))
        return matchQ && matchDomain && matchTools
      })
    })

    // ---------------- UI: preview & params toggles ----------------
    const openIds = reactive(new Set())
    const openParamIds = reactive(new Set())

    function togglePreview(item) {
      openIds.has(item.id) ? openIds.delete(item.id) : openIds.add(item.id)
      emit('preview', item)
    }
    const isOpen = id => openIds.has(id)

    function toggleParams(item) {
      openParamIds.has(item.id) ? openParamIds.delete(item.id) : openParamIds.add(item.id)
    }
    const isParamsOpen = id => openParamIds.has(id)

    function getPreviewSrc(item) {
      if (item.previewUrl) return item.previewUrl
      if (props.previewBase && item.workflowId) {
        return `${props.previewBase.replace(/\/+$/, '')}/${encodeURIComponent(item.workflowId)}?readOnly=true`
      }
      return ''
    }

    function onCustomize(item) { emit('customize', item) }
    function toggleTool(t) { selectedTools.has(t) ? selectedTools.delete(t) : selectedTools.add(t) }
    function clearTools() { selectedTools.clear(); domain.value = ''; q.value = '' }

    watch(selectedProjectId, () => { openIds.clear(); openParamIds.clear() })

    async function copy(text) {
      try { await navigator.clipboard.writeText(String(text || '')) } catch {}
    }

    return {
      // v-model proxies
      titleProxy, missionProxy,

      // projets
      loadingProjects, errorProjects, projects, qProject, typeFilter, projectTypes, filteredProjects, fetchProjects, loadWorkflowsOf, pickIcon,

      // workflows
      loadingWf, errorWf, workflows, selectedProjectId, selectedProjectName, iframeKey,
      q, domain, selectedTools, domains, allTools, topTools, filtered,
      toggleTool, clearTools, onCustomize, togglePreview, isOpen, getPreviewSrc,
      toggleParams, isParamsOpen, copy, pretty,

      // sélection
      selectedWorkflowId, selectWorkflow,
    }
  }
}
</script>

<template>
  <section class="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
    <header class="mb-3">
      <h4>Paramétrez un outil pour votre agent IA avec les scénarios d’automatisation n8n</h4>
    </header>

    <!-- Champs dynamiques -->
    <label class="form-label">Titre de l’outil <span class="text-orange fw-bold">*</span></label>
    <input
      v-model.trim="titleProxy"
      type="text"
      class="form-control mb-4"
      placeholder="Entrer un titre"
    />

    <label class="form-label">Mission principale de l’outil <span class="text-orange fw-bold">*</span></label>
    <textarea
      v-model.trim="missionProxy"
      class="form-control mb-4"
      rows="4"
      placeholder="Entrer la mission..."
    ></textarea>

    <!-- Workflows -->
    <div v-if="selectedProjectId" class="mt-6">
      <header class="mb-3">
        <h5 class="text-orange fw-bold">Indexez un scénario existant</h5>
        <p class="text-slate-600 text-sm">Projet : <strong>{{ selectedProjectName }}</strong></p>
      </header>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div class="flex gap-3 w-full sm:w-auto">
          <label class="relative w-full sm:w-72">
            <input
              v-model.trim="q"
              type="text"
              placeholder="Chercher (nom, domaine, outils, description, champs…)"
              class="w-full h-10 pl-9 pr-3 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,.05)]
                     focus:outline-none focus:ring-2 focus:ring-[#0093EE]"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </label>

          <div class="relative">
            <select v-model="domain"
                    class="appearance-none w-44 h-10 pl-3 pr-9 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,.05)]
                           focus:outline-none focus:ring-2 focus:ring-[#0093EE]">
              <option value="">Filtre</option>
              <option v-for="d in domains" :key="d" :value="d">{{ d }}</option>
            </select>
            <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button @click="clearTools" class="px-3 h-10 rounded-2xl border">Effacer filtres</button>
          <button @click="loadWorkflowsOf({ id: selectedProjectId, name: selectedProjectName })" class="px-3 h-10 rounded-2xl bg-[#0093EE] text-white">
            Actualiser
          </button>
        </div>
      </div>

      <div v-if="errorWf" class="mb-4 text-red-600 text-sm">Erreur: {{ errorWf }}</div>

      <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :aria-busy="loadingWf">
        <article
          v-for="item in filtered"
          :key="item.id"
          class="bg-white rounded-[18px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)]
                 overflow-hidden p-5 flex flex-col"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <img v-if="item.icon" :src="item.icon" alt="" class="w-5 h-5 opacity-80" />
              <h3 class="text-[16px] text-slate-800 font-bold leading-snug" style="color:#005183;">
                {{ item.title }}
              </h3>
            </div>

            <div class="mt-3 text-[14px] leading-6 space-y-1.5">
              <div>
                <span class="font-extrabold text-slate-700" style="color:#0093EE;">Domaine :</span>
                <span class="text-[#0093EE] font-semibold">{{ item.domain }}</span>
              </div>
              <div>
                <span class="font-extrabold text-slate-700" style="color:#0093EE;">Outils :</span>
                <span class="text-[#0093EE] font-medium">{{ (item.tools || []).join(' + ') }}</span>
              </div>

              <div v-if="item.descText" class="mt-2 text-[13px] text-slate-600 clamp-3">
                {{ item.descText }}
              </div>

              <div v-if="item.webhookUrl" class="mt-2 text-[12px] bg-slate-50 border rounded p-2">
                <div class="flex items-center justify-between gap-2">
                  <div class="truncate">
                    <span class="font-semibold">Webhook (prod):</span>
                    <code class="break-all">{{ item.webhookMethod || 'POST' }} {{ item.webhookUrl }}</code>
                  </div>
                  <button class="ml-2 text-[#0093EE] underline text-xs shrink-0" @click="copy(item.webhookUrl)">Copier</button>
                </div>
                <div v-if="item.webhookTestUrl" class="mt-1 truncate">
                  <span class="font-semibold">Webhook (test):</span>
                  <code class="break-all">{{ item.webhookMethod || 'POST' }} {{ item.webhookTestUrl }}</code>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-3 grid grid-cols-1 gap-3">
            <button
              @click="selectWorkflow(item)"
              :disabled="selectedWorkflowId === item.workflowId"
              class="inline-flex items-center justify-center gap-2 h-10 rounded-lg
                     bg-emerald-600 disabled:opacity-60 hover:brightness-110 text-white font-semibold transition"
            >
              {{ selectedWorkflowId === item.workflowId ? 'Sélectionné ✓' : 'Sélectionner' }}
            </button>

            <button
              @click="toggleParams(item)"
              class="inline-flex items-center justify-center gap-2 h-10 rounded-lg
                     bg-white border hover:bg-slate-50 text-slate-700 font-semibold transition"
            >
              {{ isParamsOpen(item.id) ? 'Masquer paramètres' : 'Voir paramètres' }}
            </button>
          </div>

          <!-- Aperçu IFRAME -->
          <transition name="fade">
            <div v-if="isOpen(item.id)" class="mt-3">
              <div v-if="getPreviewSrc(item)" class="rounded-lg overflow-hidden border">
                <iframe :key="iframeKey" :src="getPreviewSrc(item)" class="w-full h-[420px]" referrerpolicy="no-referrer"></iframe>
              </div>
              <div v-else class="text-xs text-slate-500 p-3 bg-slate-50 rounded">
                Configure <code>previewBase</code> ou fournis <code>previewUrl</code>.
              </div>
            </div>
          </transition>

          <!-- Paramètres -->
          <transition name="fade">
            <div v-if="isParamsOpen(item.id)" class="mt-3 space-y-3">
              <div v-if="item.paramsContract && item.paramsContract.length" class="bg-[#F7FAFF] border rounded-lg p-3">
                <div class="font-semibold mb-2">Contract (entrées attendues)</div>
                <ul class="space-y-1">
                  <li v-for="f in item.paramsContract" :key="f.name" class="text-[13px]">
                    <span class="font-semibold">{{ f.name }}</span>
                    <span class="ml-1 text-slate-500">({{ f.type || 'string' }})</span>
                    <span v-if="f.required" class="ml-2 inline-block px-2 py-[2px] text-[11px] rounded bg-green-100 text-green-800">obligatoire</span>
                    <span v-else class="ml-2 inline-block px-2 py-[2px] text-[11px] rounded bg-slate-100 text-slate-700">optionnel</span>
                    <div v-if="f.description" class="text-slate-600">— {{ f.description }}</div>
                  </li>
                </ul>
              </div>

              <div v-if="item.paramsNodes && item.paramsNodes.length" class="bg-slate-50 border rounded-lg p-3">
                <div class="font-semibold mb-2">Paramètres des nœuds</div>
                <div class="space-y-2">
                  <div v-for="np in item.paramsNodes" :key="np.name + '_' + np.type" class="text-[13px]">
                    <div class="mb-1">
                      <span class="font-semibold">{{ np.name || 'Node' }}</span>
                      <span class="ml-2 text-slate-500">{{ np.type }}</span>
                    </div>
                    <pre class="codeblock">{{ pretty(np.parameters) }}</pre>
                  </div>
                </div>
              </div>

              <div v-if="(!item.paramsContract || !item.paramsContract.length) && (!item.paramsNodes || !item.paramsNodes.length)"
                   class="text-[13px] text-slate-500">
                Aucun paramètre exposé par l’API pour ce workflow.
              </div>
            </div>
          </transition>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.codeblock {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.4;
  max-height: 220px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
