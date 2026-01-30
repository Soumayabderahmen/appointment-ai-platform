<template>
  <section class="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
    <!-- Titre -->
    <h2 class="text-[22px] sm:text-[26px] font-semibold text-slate-800">
      Testez votre agent IA
    </h2>

    <!-- Onglets -->
    <div class="mt-3 flex gap-8 text-[15px] font-semibold">
      <button
        class="text-slate-600 relative pb-2"
        :class="activeTab==='avatar' ? 'text-[#FF7A00]' : ''"
        @click="activeTab='avatar'"
      >
        Voir l’avatar final
        <span
          v-if="activeTab==='avatar'"
          class="absolute left-0 -bottom-[2px] h-[3px] w-full bg-[#FF7A00] rounded-full"
        />
      </button>

      <button
        class="text-slate-600 relative pb-2"
        :class="activeTab==='sandbox' ? 'text-[#FF7A00]' : ''"
        @click="activeTab='sandbox'"
      >
        Tester l’Agent IA (Sandbox)
        <span
          v-if="activeTab==='sandbox'"
          class="absolute left-0 -bottom-[2px] h-[3px] w-full bg-[#FF7A00] rounded-full"
        />
      </button>
    </div>

    <!-- ====== CONTENU AVATAR ====== -->
    <div v-if="activeTab==='avatar'" class="mt-5 grid gap-6 lg:grid-cols-[2fr,1fr]">
      <!-- Colonne gauche : Viewer 3D -->
      <div class="bg-white rounded-[16px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)] p-5">
        <h5 class="text-[16px] font-bold mb-3">Aperçu 3D de l'avatar</h5>

        <div v-if="hasGlb">
          <Avatar3DViewer
            :glbUrl="glbUrlResolved"
            :audioUrl="voiceAudioUrl"
          />
        </div>
        <div v-else class="text-slate-500 text-sm">
          Aucun modèle 3D n’est sélectionné pour l’instant.
        </div>
      </div>

      <!-- Colonne droite : Voix liée -->
      <div class="bg-[#F7FAFF] rounded-[16px] border border-slate-200 shadow-[0_10px_28px_rgba(0,83,135,.08)] p-5">
        <template v-if="voiceFromDb">
          <h6 class="font-semibold mb-2 flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="10" rx="3" stroke="currentColor" stroke-width="2"/>
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Voix associée : <span class="text-[#0B74C7]">{{ voiceFromDb.voice_name }}</span>
          </h6>

          <p class="text-slate-600 text-sm">{{ voiceFromDb.voice_description }}</p>

          <audio :src="voiceFromDb.audio_url" controls class="w-full mt-3">
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </template>

        <template v-else>
          <div class="text-slate-600 text-sm">
            Aucune voix n’est liée à cet avatar pour le moment.
          </div>
        </template>
      </div>
    </div>

    <!-- ====== CONTENU SANDBOX (chat + infos) ====== -->
    <div v-else class="mt-5 grid gap-6 lg:grid-cols-[2fr,1fr]">
      <!-- Chat -->
      <div class="bg-white rounded-[16px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)] overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <img :src="avatarUrl" alt="" class="w-9 h-9 rounded-full ring-2 ring-sky-100 object-cover" />
          <div class="font-semibold text-slate-800">{{ agentName }}</div>
        </div>

        <div class="p-5 h-[360px] overflow-y-auto bg-white">
          <div v-for="(m, i) in messages" :key="i" class="mb-3 flex" :class="m.role==='user' ? 'justify-start' : 'justify-start'">
            <div class="max-w-[80%] rounded-xl px-4 py-2 text-white bg-[#3FA6F1] shadow text-[14px] leading-5">
              {{ m.text }}
            </div>
          </div>
        </div>

        <div class="px-5 pb-5">
          <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <input
              v-model="inputText"
              type="text"
              placeholder="Message"
              @keydown.enter.prevent="sendMessage"
              class="flex-1 outline-none text-[14px] placeholder:text-slate-400"
            />
            <button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Emoji">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <circle cx="9" cy="10" r="1" fill="currentColor"/>
                <circle cx="15" cy="10" r="1" fill="currentColor"/>
                <path d="M8 14a4 4 0 0 0 8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Pièce jointe">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
                <path d="M7 12.5V8a5 5 0 1 1 10 0v8a4 4 0 0 1-8 0V9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Micro">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
                <rect x="9" y="3" width="6" height="10" rx="3" stroke="currentColor" stroke-width="2"/>
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button @click="sendMessage" class="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg bg-[#0093EE] text-white font-semibold hover:brightness-110 transition" title="Envoyer">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M3 12l18-9-6 9 6 9-18-9z"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Panneau d'infos -->
      <aside class="bg-[#EAF6FF] rounded-[16px] border border-[#B6E0FF] shadow-[0_10px_28px_rgba(0,83,135,.08)] p-5">
        <div class="text-[#FF6A00] font-semibold">Informations générales sur l’agent “{{ agentShortName }}”</div>

        <div class="mt-3">
          <div class="font-semibold text-slate-800">Prompt système</div>
          <p class="text-slate-700 text-[14px] mt-1 whitespace-pre-line">{{ systemPrompt }}</p>
        </div>

        <div class="mt-4">
          <div class="font-semibold text-slate-800">Scénario N8N</div>
          <ol class="list-decimal ml-5 mt-1 text-slate-700 text-[14px] space-y-1">
            <li v-for="(s, idx) in scenario" :key="idx">{{ s }}</li>
          </ol>
        </div>

        <div class="mt-4">
          <div class="font-semibold text-slate-800">APIs Connectées</div>
          <div class="flex gap-2 mt-2 flex-wrap">
            <span v-for="(api, idx) in apis" :key="idx" class="bg-[#FF7A00] text-white text-[12px] font-bold px-3 py-1 rounded-full">
              {{ api }}
            </span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
import Avatar3DViewer from './Avatar3DViewer.vue'

export default {
  name: 'Step7Final', // garde le même nom que le fichier/component parent utilise
  components: { Avatar3DViewer },

  props: {
    avatar: { type: Object, default: () => ({ glbUrl: '' }) },
    voiceFromDb: { type: Object, default: null },
    initialTab: { type: String, default: 'avatar' }, // 👉 ouvrir l’onglet Avatar par défaut
    agentName: { type: String, default: 'Agent IA – MarketingGPT' },
    agentShortName: { type: String, default: 'Marketing GPT' },
    avatarUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80&auto=format'
    }
  },

  data() {
    return {
      activeTab: this.initialTab, // ✅ lire la prop (pas une chaîne littérale)
      inputText: '',
      messages: [
        { role: 'user', text: 'Ceci est un message test' },
        { role: 'agent', text: 'Ceci est une réponse test' }
      ],
      systemPrompt:
        "Tu es un expert en stratégie marketing B2B pour startups. Tu analyses les besoins, proposes des solutions concrètes et actionnables.",
      scenario: [
        'Réception input utilisateur',
        'Analyse contexte marketing',
        'Appel APIs externes',
        'Génération recommandations'
      ],
      apis: ['API 1', 'API 2', 'API 3', 'API 4']
    }
  },

  computed: {
    // URL audio si une voix liée existe
    voiceAudioUrl() {
      return this.voiceFromDb?.audio_url || ''
    },
    // Normalise l’URL GLB pour le viewer
    glbUrlResolved() {
      const u = this.avatar?.glbUrl || ''
      if (!u) return ''
      if (/^https?:\/\//i.test(u)) return u
      if (u.startsWith('/')) return u
      return `/storage/${u}`
    },
    hasGlb() {
      return !!this.glbUrlResolved
    }
  },

  watch: {
    initialTab(val) {
      this.activeTab = val
    },
    // bascule automatiquement vers l’onglet Avatar dès qu’un GLB arrive
    'avatar.glbUrl'(val) {
      if (val) this.activeTab = 'avatar'
    }
  },

  methods: {
    // permet au parent d’ouvrir directement l’onglet avatar
    openAvatar3D() {
      this.activeTab = 'avatar'
    },
    sendMessage() {
      const txt = (this.inputText || '').trim()
      if (!txt) return
      this.messages.push({ role: 'user', text: txt })
      this.inputText = ''
      setTimeout(() => {
        this.messages.push({ role: 'agent', text: 'Réponse simulée (sandbox) : bonne réception ✅' })
      }, 300)
    }
  }
}
</script>
