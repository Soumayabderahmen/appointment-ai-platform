<template>


    <div class="mt-3 formulaire">
        <div class="col-12">
            <div class="card card-1">
                <div class="card-body px-lg-4 px-md-3 px-2">
                    <div class="bs-stepper wizard-numbered shadow-none mt-2">
                        <!-- Header avec navigation des étapes -->
                        <div class="bs-stepper-header border-0 px-lg-5 px-md-4 px-2">
                            <div class="step" :class="{ 'active': currentStep === 1 }" data-target="#account-details">
                                <button type="button" class="step-trigger p-0" @click="goToStep(1)">
                                    <span class="bs-stepper-circle shadow-none mx-0">1</span>
                                </button>

                            </div>
                            <div class="line" :class="{ 'active-line': currentStep >= 1 }"></div>
                            <div class="step" :class="{ 'active': currentStep === 2 }" data-target="#personal-info">
                                <button type="button" class="step-trigger p-0" @click="goToStep(2)">
                                    <span class="bs-stepper-circle">2</span>
                                </button>

                            </div>
                            <div class="line" :class="{ 'active-line': currentStep >= 2 }"></div>
                            <div class="step" :class="{ 'active': currentStep === 3 }" data-target="#social-links">
                                <button type="button" class="step-trigger p-0" @click="goToStep(3)">
                                    <span class="bs-stepper-circle">3</span>
                                </button>

                            </div>
                            <div class="line" :class="{ 'active-line': currentStep >= 3 }"></div>
                            <div class="step" :class="{ 'active': currentStep === 4 }" data-target="#rag-links">
                                <button type="button" class="step-trigger p-0" @click="goToStep(4)">
                                    <span class="bs-stepper-circle">4</span>
                                </button>


                            </div>
                                  <div class="line" :class="{ 'active-line': currentStep >= 4 }"></div>
                            <div class="step" :class="{ 'active': currentStep === 5 }" data-target="#rag-links">
                                <button type="button" class="step-trigger p-0" @click="goToStep(5)">
                                    <span class="bs-stepper-circle">5</span>
                                </button>


                            </div>

                              <div class="line" :class="{ 'active-line': currentStep >= 5}"></div>
                            <div class="step" :class="{ 'active': currentStep === 6 }" data-target="#rag-links">
                                <button type="button" class="step-trigger p-0" @click="goToStep(6)">
                                    <span class="bs-stepper-circle">6</span>
                                </button>

                            </div>
                            <!-- <div class="line" :class="{ 'active-line': currentStep >= 6}"></div>
                            <div class="step" :class="{ 'active': currentStep === 7 }" data-target="#rag-links">
                                <button type="button" class="step-trigger p-0" @click="goToStep(7)">
                                    <span class="bs-stepper-circle">7</span>
                                </button>

                            </div> -->

                        </div>

                        <div class="bs-stepper-content px-2">
                            <!-- Composants d'étapes -->
                            <Step1Infos v-show="currentStep === 1" v-model:agent="agent"  :categories="categories" v-model:newTag="newTag"
                                @add-tag="addTag" @remove-tag="removeTag" @add-sous-titre="addSousTitre"
                                @add-responsibility="addResponsibility" />

                            <Step2Personnalite v-show="currentStep === 2" v-model:personnalite="personnalite"
                                v-model:tonalites="tonalites" v-model:generatedPrompt="generatedPrompt" :agent="agent"
                                :showUseButton="showUseButton" @update-sliders="updateSliders"
                                @improve-prompt="improvePromptWithGPT" @use-generated-prompt="useGeneratedPrompt"
                                @copy-prompt="copyPromptToClipboard" />

                            <Step3AvatarVoix v-show="currentStep === 3" v-model:avatarTab="avatarTab"
                                v-model:selectedTypes="selectedTypes" v-model:avatar="avatar" v-model:voix="voix"
                                v-model:isLoading="isLoading" v-model:resembleVoices="resembleVoices"
                                v-model:customVoices="customVoices" v-model:customVoicesLoading="customVoicesLoading"
                                v-model:customVoicesError="customVoicesError" :agent="agent" :voixIA="voixIA"
                                :languesDisponibles="languesDisponibles" :availableTypes="availableTypes"
                                :iframeUrl="iframeUrl" :selectedVoiceData="selectedVoiceData"
                                :loadingLanguages="loadingLanguages" :custom-voices="customVoices"
                                :custom-voices-loading="customVoicesLoading" :custom-voices-error="customVoicesError"
                                :voice-from-db="voiceFromDb" @update-avatar-prompt="updateAvatarPrompt"
                                @generate-avatar-prompt-system="generateAvatarPromptSystem"
                                @handle-rpm-message="handleRPMMessage" @load-resemble-voices="loadResembleVoices"
                                @ecouter-voix-resemble="ecouterVoixResemble" @ecouter-voix="ecouterVoix"
                                @selectionner-voix="selectionnerVoix" @handle-voice-upload="handleVoiceUpload"
                                @creer-voix="creerVoix" @preview-selected-voice="previewSelectedVoice"
                                @on-language-change="onLanguageChange" @test-lip-sync="testLipSync"
                                @get-slider-label="getSliderLabel" @afficher-nom-langue="afficherNomLangue"
                                @stop-current-audio="stopCurrentAudio" @refresh-custom-voices="loadCustomVoices"
                                @show-toast="showToast" @voice-selected="onVoiceSelected"
                                @voice-settings-changed="onVoiceSettingsChanged"
                                 @open-sandbox-3d="handleOpenSandbox3D" />


                              <Step4Rag
  v-show="currentStep === 4"
  @files-selected="onRagFilesChange"
  @files-change="onRagFilesChange"
  @url-config="cfg => { ragUrl = cfg.target; ragUrlDepth = cfg.depth; }"
    @internal-config="cfg => (internalConfig = cfg)"
    @note-submit="val => (noteConfig = val)"
    @api-config="cfg => (externalApi = cfg)"
    @collab-config="cfg => (collabConfig = cfg)"

/>
<Step5N8N
v-show="currentStep === 5"
previewBase="https://n8n.braindcode.com/embed"
 api-projects-url="/api/n8n/projects?only_personal=1"
  @select-workflow="onSelectWorkflow"
  v-model:title="n8nTool.title"
  v-model:mission="n8nTool.mission"
  :auto-open-first-project="true"
  default-project-id="PJIQt6ioQ3BaQbhr"
/>
<Step6ModelEco
v-show="currentStep === 6"
  v-model="agentPricing"
  ref="step6"


/>

                            <!-- Navigation entre les étapes -->
                            <div class="col-12 mb-4 mt-4 d-flex"
                                :class="{ 'justify-content-between': currentStep > 1, 'justify-content-end': currentStep === 1 }">
                                <button v-if="currentStep > 1" class="btn btn-primary fs-sm px-3 py-2"
                                    @click="prevStep">Précédent</button>
                                <button class="btn btn-primary fs-sm px-3 py-2" @click="handleFinalStep">{{ currentStep
                                    === 6 ? 'Ajouter' : 'Suivant' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>
import { toast } from 'vue3-toastify'
import Step1Infos from './StepsAdd/Step1Infos.vue'
import Step2Personnalite from './StepsAdd/Step2Personnalite.vue'
import Step3AvatarVoix from './StepsAdd/Step3AvatarVoix.vue'
import Step4Rag from './StepsAdd/Step4Rag.vue'
import Step5N8N from './StepsAdd/Step5N8N.vue'
import Step6ModelEco from './StepsAdd/Step6ModelEco.vue'
import Step7Final from './StepsAdd/Step7Final.vue'
import { isProxy, toRaw } from 'vue'        // +++

export default {
    name: 'AddAgent',
    components: {
        Step1Infos,
        Step2Personnalite,
        Step3AvatarVoix,
        Step4Rag,
        Step5N8N,
        Step6ModelEco,
        Step7Final
    },
props: {
    categories: { type: Array, default: () => [] }
  },
    data() {
        return {
             agentPricing: {
      features: [],
      price_startup: 0,
      total_cost: 0,
      creator_share: 0,
      platform_share: 0
    },
            currentStep: 1,
            SANDBOX_STEP: 7,
            sandboxAvatar: { glbUrl: '' },
            // Données Step 1
            ragFiles: [],
            uploadingRag: false,
            ragFiles: [],
ragUrl: "",
ragUrlDepth: "single",
 internalConfig: null,
noteConfig: { title: "", content: "", format: "markdown" },
externalApi: { url: "", api_key: "", structure: "" },
collabConfig: { platform: "notion", id: "", token: "" },

            agent: {
                nom: '',

                description: '',
                type: '',
                tags: [],
                  category_id: null,
        subcategory_id: null,
                sousTitres: [{
                    titre: '',
                    responsabilites: ['']
                }]

            },
            newTag: '',

            // Données Step 2
            personnalite: {
                role: '',
                mission: '',
                tonalite_id: null,
                style_reponse: 'Synthétique',
                contraintes_specifiques: ''
            },
            tonalites: {
                travaillomane: { id: 1, value: 16.67 },
                perseverant: { id: 2, value: 16.67 },
                empathique: { id: 3, value: 16.67 },
                reveur: { id: 4, value: 16.67 },
                promoteur: { id: 5, value: 16.67 },
                rebelle: { id: 6, value: 16.67 }
            },
            generatedPrompt: '',
            promptAmeliore: '',
            showUseButton: false,

            // Données Step 3
            avatarTab: 'prompt',
            selectedTypes: [],
            avatar: {
                avatar_name: '',
                avatar_domaine: '',
                outfit: '',
                hair: '',
                glasses: '',
                top: '',
                facewear: '',
                facemask: '',
                hero_character: '',
                glbUrl: '',
                gender: 'male',
                body_type: 'full_body',
                avatar_prompt: '',
                glbData: null,
                sourceImage: null,
                previewUrl: '',
                imageFile: null
            },
            voix: {
                selectedVoice: '',
                langue: 'fr',
                settings: {
                    vitesse: 1,
                    intonation: 1,
                    volume: 1
                },
                customVoiceFile: null,
                isPlaying: false,
                currentAudio: null,
                playingVoice: null
            },
n8nTool: {
      title: '',
      mission: '',
      workflow: {
        id: '',
        editor_url: '',
        webhook_url: '',
        webhook_test_url: '',
        webhook_method: '',
        contract: [],
        params_nodes: [],
        project_id: '',
        project_name: ''
      }
    },
            // Audio context et gestion avancée
            audioContext: null,
            audioSource: null,
            gainNode: null,
            audioBuffer: null,
            startTime: 0,
            pauseTime: 0,
            isPaused: false,

            isLoading: false,
            resembleVoices: [],
            customVoices: [],

            languesDisponibles: [
                { value: 'fr', label: 'Français' },
                { value: 'en', label: 'Anglais' },
                { value: 'es', label: 'Espagnol' },
                { value: 'de', label: 'Allemand' },
                { value: 'it', label: 'Italien' }
            ],
            availableTypes: [
                { label: 'Outfit', value: 'outfit' },
                { label: 'Hair', value: 'hair' },
                { label: 'Glasses', value: 'glasses' },
                { label: 'Top', value: 'top' },
                { label: 'Facewear', value: 'facewear' },
                { label: 'Facemask', value: 'facemask' },
                { label: 'Hero Character', value: 'hero_character' }
            ],
            loadingLanguages: false,
            settingsTimeout: null,
            testTexts: {
                'fr': "Bonjour, je suis une voix générée par l'intelligence artificielle.",
                'en': "Hello, I am a voice generated by artificial intelligence.",
                'es': "Hola, soy una voz generada por inteligencia artificial.",
                'de': "Hallo, ich bin eine Stimme, die von künstlicher Intelligenz generiert wurde.",
                'it': "Ciao, sono una voce generata dall'intelligenza artificiale.",
                'pt': "Olá, sou uma voz gerada por inteligência artificial.",
                'nl': "Hallo, ik ben een stem gegenereerd door kunstmatige intelligentie.",
                'ru': "Привет, я голос, созданный искусственным интеллектом.",
                'ja': "こんにちは、私は人工知能によって生成された音声です。",
                'ko': "안녕하세요, 저는 인공지능으로 생성된 음성입니다.",
                'zh': "你好，我是由人工智能生成的声音。",
                'ar': "مرحباً، أنا صوت مُولد بواسطة الذكاء الاصطناعي."
            },

            audioPlayer: null,
            iframeUrl: '',
            customVoicesLoading: false,
            customVoicesError: null,
            voiceFromDb: null,

        }

    },

    computed: {
        selectedVoiceData() {
            if (!this.voix.selectedVoice) return null

            const resembleVoice = this.resembleVoices.find(voice => voice.id === this.voix.selectedVoice)
            if (resembleVoice) return resembleVoice

            return this.voixIA.find(voice => voice.id === this.voix.selectedVoice) || null
        },
        voixIA() {
            return [...this.resembleVoices, ...this.customVoices];
        },
        // ✅ NOUVEAU: Texte de test selon la langue sélectionnée
        currentTestText() {
            return this.testTexts[this.voix.langue] || this.testTexts['en'] || "Hello, I am an AI voice."
        }
    },

    mounted() {
        window.addEventListener('message', this.handleRPMMessage)
        this.loadResembleVoices()
        this.fetchLanguesDisponibles()
        this.initAudioContext()
    },

    beforeUnmount() {
        window.removeEventListener('message', this.handleRPMMessage)
        this.stopCurrentAudio()
        this.cleanupAudioContext()
    },

    methods: {
 onSelectWorkflow(p) {
    // On laisse ce que l’utilisateur tape dans les champs
    this.n8nTool.title   = this.n8nTool.title || ''
    this.n8nTool.mission = this.n8nTool.mission || ''

    // On mappe les infos du workflow sélectionné
    this.n8nTool.workflow = {
      id:               p?.workflowId      || '',
      editor_url:       p?.editorUrl       || '',
      webhook_url:      p?.webhookUrl      || '',
      webhook_test_url: p?.webhookTestUrl  || '',
      webhook_method:   p?.webhookMethod   || '',
      contract:         Array.isArray(p?.contract)    ? p.contract    : [],
      params_nodes:     Array.isArray(p?.paramsNodes) ? p.paramsNodes : [],
      project_id:       p?.projectId       || '',
      project_name:     p?.projectName     || ''
    }

    console.log('✅ n8nTool prêt :', this.n8nTool)
  },

 openSandbox3D(payload) {
    // payload = { glbUrl, voiceFromDb }
    const url = payload?.glbUrl || '';
    // normaliser: si on reçoit 'avatars/xxx.glb', on préfixe
    this.sandboxAvatar.glbUrl = url.startsWith('/storage/')
      ? url
      : (url ? `/storage/${url}` : '');

    if (payload?.voiceFromDb) {
      this.voiceFromDb = payload.voiceFromDb;
    }

   this.currentStep = this.SANDBOX_STEP;
   // laisser le temps au composant de se monter puis forcer l’onglet avatar
   this.$nextTick(() => {
     this.$refs.sandbox?.openAvatar3D?.();
    });
  },


onRagFilesChange(files) {
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  this.ragFiles = files.filter(f => allowed.includes(f.type) || f.name.match(/\.(pdf|docx?|txt)$/i));
  console.log('📎 RAG files:', this.ragFiles.map(f => `${f.name} (${f.size})`));
},

        initAudioContext() {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
                this.gainNode = this.audioContext.createGain()
                this.gainNode.connect(this.audioContext.destination)
                console.log('🎵 AudioContext initialisé')
            } catch (error) {
                console.error('❌ Erreur AudioContext:', error)
                toast.error('Votre navigateur ne supporte pas Web Audio API')
            }
        },
        loadCustomVoices() {
            this.customVoicesLoading = true;

            axios.get('/api/agentia/custom-voices')
                .then(response => {
                    if (response.data.success) {
                        this.customVoices = response.data.voices;
                        console.log(`✅ ${response.data.voices.length} voix personnalisées chargées`);
                    } else {
                        this.customVoicesError = 'Erreur lors du chargement des voix';
                    }
                })
                .catch(error => {
                    console.error('❌ Erreur API custom voices:', error);
                    this.customVoicesError = 'Erreur de connexion au serveur';
                })
                .finally(() => {
                    this.customVoicesLoading = false;
                });
        },

        /**
         * Nettoie le contexte audio
         */
        cleanupAudioContext() {
            if (this.audioContext && this.audioContext.state !== 'closed') {
                this.audioContext.close()
                this.audioContext = null
            }
            this.audioSource = null
            this.gainNode = null
            this.audioBuffer = null
        },


        async generateVoiceSample(voiceId, text = null) {
            try {
                // ✅ MODIFIÉ: Utiliser le texte de test traduit automatiquement
                const sampleText = text || this.currentTestText
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content

                const payload = {
                    voice_id: voiceId,
                    text: sampleText,
                    language: this.voix.langue,
                    settings: {
                        speed: this.voix.settings.vitesse,
                        pitch: this.voix.settings.intonation,
                        volume: this.voix.settings.volume
                    }
                }

                console.log('🎵 Création clip Resemble:', payload)
                console.log('🌍 Texte traduit:', sampleText)

                const response = await axios.post('/api/agentia/generate-sample', payload, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                })

                // Si le clip est prêt immédiatement
                if (response.data.success && response.data.audio_url) {
                    const audioResponse = await fetch(response.data.audio_url)
                    return await audioResponse.arrayBuffer()
                }

                // Si le clip nécessite du polling
                if (response.status === 202 && response.data.clip_uuid) {
                    console.log('🔄 Clip en traitement, polling...')
                    return await this.pollClipStatus(response.data.clip_uuid)
                }

                throw new Error(response.data.message || 'Erreur création clip')

            } catch (error) {
                console.error('❌ Erreur génération:', error)
                throw new Error(error.response?.data?.message || error.message)
            }
        },
        onLanguageChange() {
            console.log('🌍 Langue changée vers:', this.voix.langue)
            console.log('📝 Nouveau texte de test:', this.currentTestText)

            // Afficher une notification de la traduction
            toast.info(`Langue changée: ${this.afficherNomLangue(this.voix.langue)}\nTexte de test mis à jour automatiquement.`)

            // Si une voix était en cours de lecture, l'arrêter
            this.stopCurrentAudio()

            // Optionnel: Rejouer automatiquement avec la nouvelle langue
            if (this.voix.selectedVoice && this.voix.playingVoice) {
                setTimeout(() => {
                    this.previewSelectedVoice()
                }, 500)
            }
        },

        // ✅ NOUVEAU: Méthode pour tester avec un texte personnalisé
        async testWithCustomText(customText) {
            if (!this.voix.selectedVoice) {
                toast.warning('Sélectionnez une voix d\'abord')
                return
            }

            try {
                await this.playVoice(this.voix.selectedVoice, customText)
                toast.success('Test avec texte personnalisé lancé!')
            } catch (error) {
                toast.error('Erreur lors du test: ' + error.message)
            }
        },
        showToast(message, type = 'success') {
            toast[type](message)
        },

        onVoiceSelected(voiceId) {
            this.voix.selectedVoice = voiceId
        },

        onVoiceSettingsChanged(newSettings) {
            this.voix.settings = { ...this.voix.settings, ...newSettings }
        }
        ,
        async pollClipStatus(clipUuid, maxAttempts = 10) {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    console.log(`🔄 Polling tentative ${attempt}/${maxAttempts}`)

                    const response = await axios.get(`/api/agentia/clip-status/${clipUuid}`)

                    if (response.data.success && response.data.audio_url) {
                        console.log('✅ Clip prêt!')
                        const audioResponse = await fetch(response.data.audio_url)
                        return await audioResponse.arrayBuffer()
                    }

                    if (response.status === 202) {
                        // Attendre 3 secondes avant la prochaine tentative
                        await new Promise(resolve => setTimeout(resolve, 3000))
                        continue
                    }

                    throw new Error(response.data.message || 'Erreur polling')

                } catch (error) {
                    if (attempt === maxAttempts) {
                        throw new Error('Timeout: Le clip n\'est pas prêt après ' + maxAttempts + ' tentatives')
                    }
                    await new Promise(resolve => setTimeout(resolve, 3000))
                }
            }
        },


        /**
         * Convertit les données audio en AudioBuffer
         */
        async createAudioBuffer(audioData) {
            try {
                if (!this.audioContext) {
                    this.initAudioContext()
                }

                const audioBuffer = await this.audioContext.decodeAudioData(audioData)
                return audioBuffer
            } catch (error) {
                console.error('❌ Erreur décodage audio:', error)
                throw new Error('Impossible de décoder les données audio')
            }
        },

        /**
         * Configure les nœuds audio pour la lecture
         */
        setupAudioNodes(audioBuffer) {
            if (!this.audioContext || !audioBuffer) return null

            // Arrêter la source précédente
            if (this.audioSource) {
                try {
                    this.audioSource.stop()
                } catch (e) {
                    // Source déjà arrêtée
                }
            }

            // Créer une nouvelle source
            this.audioSource = this.audioContext.createBufferSource()
            this.audioSource.buffer = audioBuffer

            // Appliquer les paramètres
            this.gainNode.gain.value = this.voix.settings.volume

            // Connecter les nœuds
            this.audioSource.connect(this.gainNode)

            // Gérer la fin de lecture
            this.audioSource.onended = () => {
                this.handleAudioEnd()
            }

            return this.audioSource
        },

        /**
         * Gère la fin de lecture audio
         */
        handleAudioEnd() {
            this.voix.isPlaying = false
            this.voix.playingVoice = null
            this.isPaused = false
            this.startTime = 0
            this.pauseTime = 0
            this.audioSource = null
            console.log('🎵 Lecture terminée')
        },

        /**
         * Joue une voix (principale méthode)
         */
        async playVoice(voiceId, text = null) {
            try {
                // Arrêter la lecture en cours
                this.stopVoice()

                // Vérifier si c'est une voix Resemble
                const isResembleVoice = this.resembleVoices.find(v => v.id === voiceId)

                if (isResembleVoice) {
                    await this.playResembleVoice(voiceId, text)
                } else {
                    await this.playDefaultVoice(voiceId)
                }
            } catch (error) {
                console.error('❌ Erreur lecture voix:', error)
                toast.error(error.message || 'Erreur lors de la lecture de la voix')
                this.handleAudioEnd()
            }
        },

        /**
         * Joue une voix Resemble.ai
         */
        async playResembleVoice(voiceId, text = null) {
            this.voix.isPlaying = true
            this.voix.playingVoice = voiceId

            try {
                // Générer l'échantillon
                const audioData = await this.generateVoiceSample(voiceId, text)

                // Créer le buffer audio
                this.audioBuffer = await this.createAudioBuffer(audioData)

                // Configurer et démarrer la lecture
                const source = this.setupAudioNodes(this.audioBuffer)
                if (source) {
                    this.startTime = this.audioContext.currentTime
                    source.start(0)
                    console.log('🎵 Lecture Resemble démarrée:', voiceId)
                }
            } catch (error) {
                this.handleAudioEnd()
                throw error
            }
        },

        /**
         * Joue une voix par défaut (fichier local)
         */
        playDefaultVoice() {
            console.log('🎯 ID sélectionné :', this.voix.selectedVoice)
            console.log('🎧 voixIA:', this.voixIA)

            if (!Array.isArray(this.voixIA)) {
                console.warn('❌ voixIA non définie ou mal formatée')
                return
            }

            const selected = this.voixIA.find(v => v.id === this.voix.selectedVoice)

            if (!selected) {
                toast.warning("⚠️ Voix introuvable.")
                return
            }

            let audioUrl = null;

            if (selected.audio_url && typeof selected.audio_url === 'string') {
                audioUrl = selected.audio_url;
            } else if (selected.file_path instanceof File || selected.file_path instanceof Blob) {
                audioUrl = URL.createObjectURL(selected.file_path);
            } else {
                console.warn('❌ Fichier audio introuvable ou invalide :', selected.file_path);
                toast.warning("⚠️ Aucun fichier audio valide pour cette voix.");
                return;
            }

            console.log("🔊 Lancement audio depuis :", audioUrl);

            const audio = new Audio(audioUrl);

            audio.play()
                .then(() => {
                    console.log(`🎵 Lecture de ${selected.voice_name || 'voix personnalisée'}...`);
                })
                .catch(err => {
                    console.error('❌ Erreur de lecture audio :', err);
                    toast.error("Erreur lors de la lecture de l'audio.");
                });

            audio.onended = () => {
                console.log("✅ Lecture terminée.");
                if (!selected.audio_url) {
                    URL.revokeObjectURL(audioUrl); // Libération mémoire
                }
            };

            audio.onerror = () => {
                toast.error("⚠️ Impossible de lire le fichier audio.");
            };
        }




        ,



        /**
         * Arrête la lecture audio
         */
        stopVoice() {
            if (this.audioSource) {
                try {
                    this.audioSource.stop()
                } catch (e) {
                    // Source déjà arrêtée
                }
                this.audioSource = null
            }

            // Nettoyer l'audio HTML5 de fallback
            if (this.voix.currentAudio) {
                this.voix.currentAudio.pause()
                this.voix.currentAudio = null
            }

            if (this.audioPlayer) {
                this.audioPlayer.pause()
                this.audioPlayer = null
            }

            this.handleAudioEnd()
            console.log('⏹️ Lecture arrêtée')
        },

        /**
         * Met en pause la lecture
         */
        pauseVoice() {
            if (this.voix.isPlaying && this.audioSource && !this.isPaused) {
                this.audioSource.stop()
                this.pauseTime = this.audioContext.currentTime - this.startTime
                this.isPaused = true
                this.voix.isPlaying = false
                console.log('⏸️ Lecture en pause')
            }
        },

        /**
         * Reprend la lecture
         */
        resumeVoice() {
            if (this.isPaused && this.audioBuffer) {
                const source = this.setupAudioNodes(this.audioBuffer)
                if (source) {
                    this.startTime = this.audioContext.currentTime - this.pauseTime
                    source.start(0, this.pauseTime)
                    this.voix.isPlaying = true
                    this.isPaused = false
                    console.log('▶️ Lecture reprise')
                }
            }
        },

        /**
         * Méthode d'écoute pour les voix Resemble (compatibilité arrière)
         */
        async ecouterVoixResemble(voiceId) {
            await this.playVoice(voiceId)
        },

        /**
         * Méthode d'écoute générale (compatibilité arrière)
         */
        async ecouterVoix(voiceId) {
            await this.playVoice(voiceId)
        },

        /**
         * Prévisualise la voix sélectionnée
         */
        async previewSelectedVoice() {
            if (!this.voix.selectedVoice) {
                toast.warning('Aucune voix sélectionnée')
                return
            }

            console.log('🎵 Prévisualisation avec texte traduit:', this.currentTestText)
            await this.playVoice(this.voix.selectedVoice, this.currentTestText)
        },

        /**
         * Test de synchronisation labiale
         */
        async testLipSync() {
            if (!this.voix.selectedVoice) {
                toast.warning('Sélectionnez une voix pour tester la synchronisation')
                return
            }

            const lipSyncText = "Test de synchronisation labiale avec Ready Player Me. Cette phrase permet de vérifier la correspondance entre les mouvements des lèvres et la voix générée."

            try {
                await this.playVoice(this.voix.selectedVoice, lipSyncText)
                toast.success('🎭 Test de synchronisation labiale démarré')
            } catch (error) {
                toast.error('Erreur lors du test de synchronisation')
            }
        },

        // ===============================
        // MÉTHODES UTILITAIRES AUDIO
        // ===============================

        /**
         * Arrête tout audio en cours
         */
        stopCurrentAudio() {
            this.stopVoice()
        },

        /**
         * Met à jour les paramètres audio en temps réel
         */
        updateAudioSettings() {
            if (this.gainNode) {
                this.gainNode.gain.value = this.voix.settings.volume
            }

            // Débounce pour éviter trop de requêtes
            if (this.settingsTimeout) {
                clearTimeout(this.settingsTimeout)
            }

            this.settingsTimeout = setTimeout(() => {
                if (this.voix.isPlaying && this.voix.playingVoice) {
                    // Redémarrer avec les nouveaux paramètres
                    const currentVoice = this.voix.playingVoice
                    this.stopVoice()
                    setTimeout(() => {
                        this.playVoice(currentVoice)
                    }, 100)
                }
            }, 500)
        },

        // ===============================
        // MÉTHODES NAVIGATION
        // ===============================

        nextStep() {
            if (this.currentStep < 6) {
                this.currentStep += 1
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep -= 1
            }
        },

        goToStep(step) {
            if (step >= 1 && step <= 7) {
                this.currentStep = step
            }
        },

        handleFinalStep() {
            if (this.currentStep === 6) {
                this.submitForm()
            } else {
                this.nextStep()
            }
        },

        // ===============================
        // MÉTHODES STEP 1
        // ===============================

        addTag() {
            if (this.newTag.trim() && !this.agent.tags.includes(this.newTag.trim())) {
                this.agent.tags.push(this.newTag.trim())
                this.newTag = ''
            }
        },

        removeTag(index) {
            this.agent.tags.splice(index, 1)
        },

        addSousTitre() {
            this.agent.sousTitres.push({
                titre: '',
                responsabilites: ['']
            })
        },

        addResponsibility(sousTitreIndex) {
            this.agent.sousTitres[sousTitreIndex].responsabilites.push('')
        },

        // ===============================
        // MÉTHODES STEP 2
        // ===============================

        updateSliders() {
            const total = Object.values(this.tonalites).reduce((sum, tonalite) => sum + parseFloat(tonalite.value), 0)
            if (total > 100) {
                const excess = total - 100
                const adjustment = excess / 6
                Object.keys(this.tonalites).forEach(key => {
                    this.tonalites[key].value = Math.max(0, Math.min(16.67, this.tonalites[key].value - adjustment))
                })
            }
        },

        improvePromptWithGPT() {
            const promptSysteme = this.generatePrompt()
            if (!promptSysteme.trim()) {
                toast.error("Le prompt système est vide.")
                return
            }

            axios.post('/api/agentia/generate-prompt', {
                prompt: promptSysteme
            })
                .then(response => {
                    this.promptAmeliore = response.data.improvedPrompt
                    this.showUseButton = true
                    toast.success('Prompt IA généré avec succès !')
                })
                .catch(() => {
                    toast.error("Erreur lors de la génération du prompt par l'IA.")
                })
        },

        useGeneratedPrompt() {
            this.generatedPrompt = this.promptAmeliore
            this.showUseButton = false
            toast.success('Le prompt IA est maintenant utilisé.')
        },

        copyPromptToClipboard() {
            const prompt = this.generatedPrompt || this.generatePrompt()
            navigator.clipboard.writeText(prompt)
            toast.success('Prompt copié dans le presse-papiers')
        },
getCategoryLabel () {
    const cats = Array.isArray(this.categories) ? this.categories : []
    const cat = cats.find(c => String(c.id) === String(this.agent.category_id))
    return cat?.name || 'Non spécifiée'
  },

  getSubcategoryLabel () {
    const subId = this.agent.subcategory_id
    if (!subId) return null

    const cats = Array.isArray(this.categories) ? this.categories : []

    // 1) on regarde d'abord dans la catégorie choisie
    const cat = cats.find(c => String(c.id) === String(this.agent.category_id))
    if (cat && Array.isArray(cat.subcategories)) {
      const sc = cat.subcategories.find(s => String(s.id) === String(subId))
      if (sc) return sc.name
    }

    // 2) fallback : on cherche partout (au cas où)
    for (const c of cats) {
      const sc = (c.subcategories || []).find(s => String(s.id) === String(subId))
      if (sc) return sc.name
    }
    return null
  },

      generatePrompt () {
    const catName = this.getCategoryLabel()
    const subName = this.getSubcategoryLabel()
    const subLine = subName ? `\nSous-catégorie : ${subName}\n` : ''

    return `Tu es ${this.agent.nom}, un expert ${this.personnalite.role} spécialisé dans la catégorie « ${catName} ».${subLine}
## Ton rôle
                 ${this.personnalite.mission}.

                ## Ta personnalité
                Ta personnalité est influencée par la tonalité suivante :
                - **Tonalité :** Travaillomane: ${this.tonalites.travaillomane.value}%,
                  Perseverant: ${this.tonalites.perseverant.value}%,
                  Empathique: ${this.tonalites.empathique.value}%,
                  Reveur: ${this.tonalites.reveur.value}%,
                  Promoteur: ${this.tonalites.promoteur.value}%,
                  Rebelle: ${this.tonalites.rebelle.value}%.

                ## Tes réponses doivent être de style :
                ${this.personnalite.style_reponse} : Explications complètes avec exemples.

                ## Contraintes système
                ${this.personnalite.contraintes_specifiques}
            `
        },

        // ===============================
        // MÉTHODES STEP 3 - AVATAR
        // ===============================

        updateAvatarPrompt() {
            const types = this.selectedTypes.join(', ')
            this.avatar.avatar_prompt = `
Je souhaite créer un avatar 3D Ready Player Me avec les caractéristiques suivantes :
- Nom : ${this.avatar.avatar_name || 'Non spécifié'}
- Genre : ${this.avatar.gender || 'Non spécifié'}
- Morphologie : ${this.avatar.body_type || 'Non spécifié'}
- Types sélectionnés : ${types || 'Aucun'}
- Détails :
  - Outfit : ${this.avatar.outfit || '-'}
  - Hair : ${this.avatar.hair || '-'}
  - Glasses : ${this.avatar.glasses || '-'}
  - Top : ${this.avatar.top || '-'}
  - Facewear : ${this.avatar.facewear || '-'}
  - Facemask : ${this.avatar.facemask || '-'}
  - Héros : ${this.avatar.hero_character || '-'}

Merci de générer un prompt professionnel à intégrer dans une URL Ready Player Me.
            `.trim()
        },

        async generateAvatarPromptSystem() {
            try {
                this.updateAvatarPrompt()
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content

                const response = await axios.post('/api/agentia/generate-avatar-prompt', {
                    avatar_name: this.avatar.avatar_name,
                    avatar_prompt: this.avatar.avatar_prompt,
                    gender: this.avatar.gender,
                    body_type: this.avatar.body_type,
                    outfit: this.avatar.outfit,
                    facemask: this.avatar.facemask,
                    hair: this.avatar.hair,
                    glasses: this.avatar.glasses,
                    top: this.avatar.top,
                    facewear: this.avatar.facewear,
                    hero_character: this.avatar.hero_character,
                    selected_types: this.selectedTypes
                }, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    }
                })

                this.avatar.system_prompt = response.data.prompt
                this.avatar.avatar_prompt = response.data.prompt
                this.iframeUrl = response.data.preview_url
            } catch (error) {
                console.error('Erreur lors de la génération du prompt système:', error)
            }
        },

        handleRPMMessage(event) {
            if (!event.data || event.data.source !== 'readyplayerme') return

            const { eventName, data } = event.data

            if (eventName === 'v1.frame.ready') {
                console.log('✅ ReadyPlayerMe prêt')
                const frame = document.getElementById('rpm-frame')
                if (frame) {
                    frame.contentWindow.postMessage({
                        target: 'readyplayerme',
                        type: 'subscribe',
                        eventName: 'v1.user.set',
                    }, '*')

                    frame.contentWindow.postMessage({
                        target: 'readyplayerme',
                        type: 'subscribe',
                        eventName: 'v1.avatar.exported',
                    }, '*')
                }
            }

            if (eventName === 'v1.user.set') {
                console.log('👤 Bouton NEXT cliqué')
                setTimeout(() => {
                    this.triggerExport()
                }, 1500)
            }

            if (eventName === 'v1.avatar.exported') {
                console.log('✅ Avatar exporté :', data.url)
                this.avatar.glbUrl = data.url
            }
        },

        triggerExport() {
            const frame = document.getElementById('rpm-frame')
            if (frame) {
                frame.contentWindow.postMessage(
                    {
                        target: 'readyplayerme',
                        type: 'request',
                        eventName: 'v1.avatar.export',
                    },
                    '*'
                )
                console.log('📤 Export demandé')
            }
        },

        // ===============================
        // MÉTHODES VOIX - CHARGEMENT
        // ===============================

        async loadResembleVoices() {
            this.isLoading = true

            try {
                const response = await axios.get('/api/agentia/resemble-voices')
                if (!response.data) throw new Error('Données voix non reçues')

                this.resembleVoices = response.data.map(voice => ({
                    id: voice.id,
                    nom: voice.name,
                    name: voice.name,
                    description: voice.description,
                    gender: voice.gender,
                    type: voice.gender,
                    language: voice.language || 'fr',
                    avatar_class: this.getAvatarClass(voice.gender),
                    icon: this.getAvatarIcon(voice.gender),
                    isDefault: voice.is_default || false,
                    supported_languages: voice.supported_languages || ['fr']
                }))

                // Ajouter au tableau principal
                // this.voixIA = [...this.voixIA, ...this.resembleVoices]

                console.log("✅ Voix Resemble chargées:", this.resembleVoices.length)
            } catch (error) {
                console.error("❌ Erreur de chargement des voix:", error)

            } finally {
                this.isLoading = false
            }
        },

        getAvatarClass(gender) {
            switch (gender) {
                case 'female': return 'bg-pink-100 text-pink-500'
                case 'male': return 'bg-blue-100 text-blue-500'
                default: return 'bg-gray-100 text-gray-500'
            }
        },

        getAvatarIcon(gender) {
            switch (gender) {
                case 'female': return 'fas fa-user-circle'
                case 'male': return 'fas fa-user-circle'
                default: return 'fas fa-robot'
            }
        },

        selectionnerVoix(voiceId) {
            this.voix.selectedVoice = voiceId
            const voice = this.voixIA.find(v => v.id === voiceId)
            toast.success(`Voix sélectionnée: ${voice?.nom || voiceId}`)
        },

        handleVoiceUpload(event) {
            const file = event.target.files[0]
            if (file) {
                if (!file.type.startsWith('audio/')) {
                    toast.error('Veuillez sélectionner un fichier audio valide')
                    return
                }

                if (file.size > 10 * 1024 * 1024) { // 10MB
                    toast.error('Le fichier est trop volumineux (max 10MB)')
                    return
                }

                this.voix.customVoiceFile = file
                toast.success(`Fichier vocal uploadé: ${file.name}`)
            }
        },

        async creerVoix() {
            if (!this.voix.customVoiceFile) {
                toast.error('Veuillez sélectionner un fichier audio')
                return
            }

            const formData = new FormData()
            formData.append('voice_file', this.voix.customVoiceFile)
            formData.append('voice_name', `Voix Custom ${Date.now()}`)
            formData.append('description', 'Voix personnalisée uploadée')

            try {
                const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content

                const response = await axios.post('/api/agentia/create-custom-voice', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })

                if (response.data.success) {
                    toast.success('Voix personnalisée créée avec succès!')
                    await this.loadResembleVoices() // Recharger la liste
                } else {
                    toast.error('Erreur lors de la création de la voix')
                }
            } catch (error) {
                console.error('Erreur création voix:', error)
                toast.error('Erreur lors de la création de la voix personnalisée')
            }
        },

        onLanguageChange() {
            console.log('Langue changée:', this.voix.langue)
            // Filtrer les voix disponibles selon la langue si nécessaire
        },

        getSliderLabel(type, value) {
            const labels = {
                vitesse: {
                    0.5: 'Très lent',
                    0.75: 'Lent',
                    1: 'Normal',
                    1.25: 'Rapide',
                    1.5: 'Très rapide'
                },
                intonation: {
                    0.5: 'Monotone',
                    0.75: 'Peu expressif',
                    1: 'Normal',
                    1.25: 'Expressif',
                    1.5: 'Très expressif'
                },
                volume: {
                    0.25: 'Très faible',
                    0.5: 'Faible',
                    0.75: 'Modéré',
                    1: 'Normal',
                    1.25: 'Fort'
                }
            }

            return labels[type]?.[value] || value.toString()
        },

        afficherNomLangue(code) {
            const map = {
                'fr': 'Français',
                'en': 'English',
                'es': 'Español',
                'de': 'Deutsch',
                'it': 'Italiano'
            }
            return map[code] || code.toUpperCase()
        },

        async fetchLanguesDisponibles() {
            this.loadingLanguages = true

            try {
                // Simuler un appel API ou utiliser des langues statiques
                this.languesDisponibles = [
                    { value: 'fr', label: 'Français' },
                    { value: 'en', label: 'Anglais' },
                    { value: 'es', label: 'Espagnol' },
                    { value: 'de', label: 'Allemand' },
                    { value: 'it', label: 'Italien' }
                ]
            } catch (error) {
                console.error('Erreur chargement langues :', error)
            } finally {
                this.loadingLanguages = false
            }
        },

        // ===============================
        // SOUMISSION FINALE
        // ===============================

       appendDeep(fd, data, prefix = '') {
    if (data === null || data === undefined) return;

    if (Array.isArray(data)) {
      data.forEach((v, i) => {
        const key = prefix ? `${prefix}[${i}]` : `${i}`;
        this.appendDeep(fd, v, key);
      });
    } else if (data instanceof File || data instanceof Blob) {
      fd.append(prefix, data);
    } else if (typeof data === 'object') {
      Object.entries(data).forEach(([k, v]) => {
        const key = prefix ? `${prefix}[${k}]` : k;
        this.appendDeep(fd, v, key);
      });
    } else {
      fd.append(prefix, data);
    }
  },

async submitForm() {
  if (!this.agent.nom || !this.agent.tags || !this.agent.type) {
    toast.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }
const deproxy = (v) => {
    if (v == null) return v
    if (isProxy(v)) v = toRaw(v)
    if (Array.isArray(v)) return v.map(deproxy)
    if (v instanceof File || v instanceof Blob) return v
    if (typeof v === 'object') {
      try { return JSON.parse(JSON.stringify(v)) }
      catch {
        const out = {}
        for (const k in v) out[k] = deproxy(v[k])
        return out
      }
    }
    return v
  }
  // Voix (rendre optionnelle pour tester)
  const allVoices = [...this.resembleVoices, ...this.customVoices];
  const selectedVoice = allVoices.find(v => v.id === this.voix.selectedVoice);

  const fd = new FormData();

  // --- Agent IA ---
  this.appendDeep(fd, {
    nom: this.agent.nom,
    category_id: this.agent.category_id,
    subcategory_id: this.agent.subcategory_id,
    description: this.agent.description,
    type: this.agent.type,
    tags: this.agent.tags,
    sous_titres: this.agent.sousTitres,
  });

  // --- Personnalité / tonalités ---
  this.appendDeep(fd, {
    role: this.personnalite.role,
    mission: this.personnalite.mission,
    tonalite_id: this.personnalite.tonalite_id,
    style_reponse: this.personnalite.style_reponse,
    contraintes_specifiques: this.personnalite.contraintes_specifiques,
    tonalites: {
      travaillomane: this.tonalites.travaillomane.value,
      perseverant:   this.tonalites.perseverant.value,
      empathique:    this.tonalites.empathique.value,
      reveur:        this.tonalites.reveur.value,
      promoteur:     this.tonalites.promoteur.value,
      rebelle:       this.tonalites.rebelle.value
    }
  });

  // --- Avatar ---
  this.appendDeep(fd, {
    avatar_name: this.avatar.avatar_name,
    avatar_domaine: this.avatar.avatar_domaine,
    avatar_prompt: this.avatar.avatar_prompt,
    gender: this.avatar.gender,
    body_type: this.avatar.body_type,
    selected_types: this.selectedTypes,
    outfit: this.avatar.outfit,
    facemask: this.avatar.facemask,
    hair: this.avatar.hair,
    glasses: this.avatar.glasses,
    top: this.avatar.top,
    facewear: this.avatar.facewear,
    hero_character: this.avatar.hero_character,
    avatar_glb_url: this.avatar.glbUrl || null,
  });

  // --- Voix (si présente) ---
  if (selectedVoice) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const voiceId = uuidRegex.test(selectedVoice.id) ? selectedVoice.id : crypto.randomUUID();

    this.appendDeep(fd, {
      voice_id: voiceId,
      voice_language: this.voix.langue,
      voice_settings: this.voix.settings,
      custom_voice_file: this.voix.customVoiceFile
    });
  }

// --- N8N : workflows (Step5N8N) ---
{
  const toolsPayload = [];

  // util 1 item
  const pushTool = (w) => {
    if (!w || !w.workflow || !w.workflow.id) return;

    toolsPayload.push({
      title:           w.title || '',
      mission:         w.mission || '',
      workflow_id:     w.workflow.id || '',
      editor_url:      w.workflow.editor_url || '',
      webhook_url:     w.workflow.webhook_url || '',
      webhook_test_url:w.workflow.webhook_test_url || '',
      webhook_method:  w.workflow.webhook_method || '',
      contract:        deproxy(w.workflow.contract || []), // ✅ on garde contract
      // ❌ NE PAS ENVOYER : params_nodes
      project_id:      w.workflow.project_id || '',
      project_name:    w.workflow.project_name || ''
    });
  };

  // 1) Plusieurs outils si dispo
  if (Array.isArray(this.n8nTools) && this.n8nTools.length) {
    this.n8nTools.forEach(pushTool);
  } else {
    // 2) Sinon, l’unique n8nTool
    pushTool(this.n8nTool);
  }

  if (toolsPayload.length) {
    this.appendDeep(fd, { n8n_tools: toolsPayload });
  }
}


  // --- Données internes (BDD / Sheets / CRM) ---
  if (this.internalConfig?.type) {
    const t = this.internalConfig.type; // 'sheets' | 'sql' | 'crm'
    const internalPayload = {
      type: t,
      url: this.internalConfig.url || null
    };

    if (t === 'sql' && this.internalConfig.sql) {
      internalPayload.sql = {
        host: this.internalConfig.sql.host || '',
        port: this.internalConfig.sql.port || 3306,
        db:   this.internalConfig.sql.db   || '',
        user: this.internalConfig.sql.user || '',
        pass: this.internalConfig.sql.pass || ''
      };
    }
    this.appendDeep(fd, { internal: internalPayload });
  }

  // --- RAG : FICHIERS ---
  if (this.ragFiles?.length) {
    if (this.ragFiles.length > 1) {
      for (const f of this.ragFiles) fd.append("rag_files[]", f);
    } else {
      fd.append("file", this.ragFiles[0]);
    }
  }

  // --- RAG : URL ---
  if (this.ragUrl) {
    fd.append('rag_url', this.ragUrl);
    fd.append('rag_url_depth', this.ragUrlDepth || 'single');
    fd.append('rag_type_label', 'URL');
  }

  if (this.noteConfig?.title && this.noteConfig?.content) {
    fd.append('note[title]', this.noteConfig.title);
    fd.append('note[content]', this.noteConfig.content);
    fd.append('note[format]', this.noteConfig.format || 'markdown');
  }

  if (this.externalApi?.url && this.externalApi?.structure) {
    const struct = typeof this.externalApi.structure === 'string'
      ? this.externalApi.structure
      : JSON.stringify(this.externalApi.structure);

    fd.append('external_api[url]', this.externalApi.url);
    if (this.externalApi.api_key) {
      fd.append('external_api[api_key]', this.externalApi.api_key);
    }
    fd.append('external_api[structure]', struct);
  }

  if (this.collabConfig?.platform === 'notion' && this.collabConfig.id) {
    this.appendDeep(fd, {
      collab: {
        platform: 'notion',
        id: this.collabConfig.id,
        token: this.collabConfig.token || ''
      }
    });
  }
// --- Agent Pricing (Step6ModelEco) ---
if (this.$refs.step6) {
  const pricing = deproxy(this.$refs.step6.pricing);

  this.appendDeep(fd, {
    agent_pricing: {
      std_price: pricing.std_price,
      avatar_price: pricing.avatar_price,
      voice_price: pricing.voice_price,
      apis_price: pricing.apis_price,
      n8n_price: pricing.n8n_price,
      price_startup: pricing.price_startup,
      total_price: pricing.total_price,
      creator_share: pricing.creator_share,
      platform_share: pricing.platform_share,
    }
  });
}

  try {
    this.isSubmitting = true;
for (const [k, v] of fd.entries()) {
  console.log(k, v instanceof File ? '(file)' : v);
}
    const res = await axios.post('/api/agentia/', fd);

    this.agent.id  = res.data.agent?.id  ?? this.agent.id;
    this.avatar.id = res.data.avatar?.id ?? this.avatar.id;

    toast.success('✅ Agent IA créé avec succès !');
    if (Array.isArray(res.data.rag_sources) && res.data.rag_sources.length) {
      toast.success(`📚 ${res.data.rag_sources.length} source(s) RAG ajoutée(s).`);
    }
    if (res.data.glb_url) {
      toast.success('🧬 Avatar 3D sauvegardé.');
    }

    this.ragFiles = [];
  } catch (error) {
    console.error('Erreur API :', error);

    let msg = '❌ Une erreur est survenue lors de la création de l’Agent IA.';
    if (error?.response?.data) {
      const d = error.response.data;
      if (d.message) msg = d.message;
      if (d.errors && typeof d.errors === 'object') {
        const firstKey = Object.keys(d.errors)[0];
        if (firstKey && d.errors[firstKey] && d.errors[firstKey][0]) {
          msg = d.errors[firstKey][0];
        }
      }
    }
    toast.error(msg);
  } finally {
    this.isSubmitting = false;
  }
}





    }
}
</script>
