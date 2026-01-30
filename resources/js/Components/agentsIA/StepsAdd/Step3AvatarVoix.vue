<template>
    <div class="row">
        <div class="col-12 mb-4">
            <h4 class="fw-bold">Créez un Avatar 3D & Voix pour votre Agent IA</h4>
        </div>

        <!-- Tabs -->
        <div class="col-12 mb-4">
            <ul class="nav nav-tabs border-0 bg-light p-2 rounded-3">
                <li class="nav-item">
                    <button class="nav-link" :class="{ active: avatarTab === 'prompt' }"
                        @click="$emit('update:avatarTab', 'prompt')">
                        Créer un avatar à partir d'un prompt
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" :class="{ active: avatarTab === 'image' }"
                        @click="$emit('update:avatarTab', 'image')">
                        Créer un avatar à partir d'une image
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" :class="{ active: avatarTab === 'voix' }"
                        @click="$emit('update:avatarTab', 'voix')">
                        Créer une Voix
                    </button>
                </li>
                <li class="nav-item">
  <button class="nav-link" :class="{ active: avatarTab === 'three' }"
    @click="$emit('update:avatarTab', 'three')">
    Voir l'avatar en 3D
  </button>
</li>

            </ul>
        </div>

        <!-- ✅ Partie PROMPT -->
        <template v-if="avatarTab === 'prompt'">
            <div class="col-md-6 mb-3">
                <label class="form-label">Nom de L'avatar</label>
                <input class="form-control" :value="avatar.avatar_name"
                    @input="updateAvatar('avatar_name', $event.target.value)" placeholder="Nom de l'avatar 3D">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Domaine de L'avatar</label>
                <input class="form-control" :value="avatar.avatar_domaine"
                    @input="updateAvatar('avatar_domaine', $event.target.value)" placeholder="Domaine de l'avatar">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Genre</label>
                <select class="form-select" :value="avatar.gender"
                    @change="updateAvatar('gender', $event.target.value)">
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="neutral">Neutre</option>
                </select>
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Morphologie</label>
                <select class="form-select" :value="avatar.body_type"
                    @change="updateAvatar('body_type', $event.target.value)">
                    <option value="full_body">Corps complet</option>
                    <option value="generic">Standard</option>
                </select>
            </div>

            <!-- ✅ Sélecteur multiple de types Ready Player Me -->
            <div class="col-md-12 mb-3">
                <label class="form-label d-block">Composants personnalisés</label>
                <div class="form-check d-inline-block me-3" v-for="type in availableTypes" :key="type.value">
                    <input class="form-check-input" type="checkbox" :id="type.value" :value="type.value"
                        :checked="selectedTypes.includes(type.value)" @change="toggleSelectedType(type.value)">
                    <label class="form-check-label" :for="type.value">
                        {{ type.label }}
                    </label>
                </div>
            </div>

            <!-- ✅ Affichage conditionnel des champs sélectionnés -->
            <div v-if="selectedTypes && selectedTypes.includes('outfit')" class="col-md-6 mb-3">
                <label class="form-label">Outfit</label>
                <select class="form-select" :value="avatar.outfit"
                    @change="updateAvatar('outfit', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="CyberNinjaOutfit01">Cyber Ninja</option>
                    <option value="BusinessSuit01">Costume Business</option>
                    <option value="StreetWear01">Tenue Décontractée</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('hair')" class="col-md-6 mb-3">
                <label class="form-label">Hair</label>
                <select class="form-select" :value="avatar.hair" @change="updateAvatar('hair', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="ShortCurly">Cheveux courts bouclés</option>
                    <option value="LongStraight">Longs et lisses</option>
                    <option value="Bald">Chauve</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('glasses')" class="col-md-6 mb-3">
                <label class="form-label">Glasses</label>
                <select class="form-select" :value="avatar.glasses"
                    @change="updateAvatar('glasses', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="CyberGlasses">Cyber</option>
                    <option value="Round">Rondes</option>
                    <option value="SunGlasses">Solaires</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('top')" class="col-md-6 mb-3">
                <label class="form-label">Top</label>
                <select class="form-select" :value="avatar.top" @change="updateAvatar('top', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="Hoodie01">Sweat à capuche</option>
                    <option value="ShirtBusiness">Chemise business</option>
                    <option value="TShirtPlain">T-shirt simple</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('facemask')" class="col-md-6 mb-3">
                <label class="form-label">Facemask</label>
                <select class="form-select" :value="avatar.facemask"
                    @change="updateAvatar('facemask', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="Surgical">Chirurgical</option>
                    <option value="GasMask">Masque à gaz</option>
                    <option value="Futuristic">Futuriste</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('facewear')" class="col-md-6 mb-3">
                <label class="form-label">Facewear</label>
                <select class="form-select" :value="avatar.facewear"
                    @change="updateAvatar('facewear', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="Eyepatch">Cache-œil</option>
                    <option value="Piercing">Piercing</option>
                    <option value="None">Aucun</option>
                </select>
            </div>

            <div v-if="selectedTypes && selectedTypes.includes('hero_character')" class="col-md-6 mb-3">
                <label class="form-label">Hero Character</label>
                <select class="form-select" :value="avatar.hero_character"
                    @change="updateAvatar('hero_character', $event.target.value)">
                    <option value="">-- Choisir --</option>
                    <option value="Samurai">Samouraï</option>
                    <option value="CyberKnight">Cyber Chevalier</option>
                    <option value="SpaceRanger">Ranger Galactique</option>
                </select>
            </div>

            <div class="col-12 mb-3">
                <label class="form-label">Prompt</label>
                <textarea class="form-control" rows="3" :value="avatar.avatar_prompt"
                    @input="updateAvatar('avatar_prompt', $event.target.value)"
                    placeholder="Décrivez votre avatar idéal..."></textarea>
            </div>

            <!-- Bouton de génération du prompt système -->
            <div class="col-12 mt-3">
                <button class="btn btn-outline-primary w-100 py-2" @click="$emit('generate-avatar-prompt-system')">
                    ✨ Générer le Prompt Système de l'avatar
                </button>
            </div>

            <!-- Aperçu iframe -->
            <div class="col-12 mt-4" v-if="iframeUrl">
                <p class="fw-bold">Aperçu :</p>
                <iframe id="rpm-frame" allow="camera *; microphone *" src="https://readyplayer.me/avatar?frameApi"
                    style="width: 100%; height: 600px; border: none;">
                </iframe>
                
                <!-- GLB URL Input -->
                <div class="mt-4">
                    <p class="form-label">Fichier GLB de l'avatar :</p>
                    <div class="position-relative">
                        <input 
                            v-model="avatar.glbUrl"
                            @paste="onGlbUrlPaste($event)"
                            @input="onGlbUrlInput($event.target.value)"
                            class="form-control" 
                            :class="{ 
                                'border-primary bg-light': glbProcessing, 
                                'border-success bg-success-subtle': isLocalGlbFile 
                            }"
                            placeholder="Collez votre lien ReadyPlayerMe ici..." 
                            :disabled="glbProcessing"
                        />
                        
                        <!-- Indicateur de chargement -->
                        <div v-if="glbProcessing" class="position-absolute end-0 top-50 translate-middle-y me-3">
                            <i class="fas fa-spinner fa-spin text-primary"></i>
                        </div>
                        
                        <!-- Indicateur de succès -->
                        <div v-else-if="isLocalGlbFile" class="position-absolute end-0 top-50 translate-middle-y me-3">
                            <i class="fas fa-check-circle text-success"></i>
                        </div>
                    </div>
                    
                    <!-- Message de statut -->
                    <div v-if="glbProcessing" class="mt-2 text-primary small">
                        <i class="fas fa-download me-2"></i>
                        Téléchargement et sauvegarde en cours...
                    </div>
                    <div v-else-if="isLocalGlbFile" class="mt-2 text-success small">
                        <i class="fas fa-check-circle me-2"></i>
                        Fichier GLB sauvegardé : {{ getFileName(avatar.glbUrl) }}
                    </div>
                </div>
                 <div class="mt-4 text-center">
                <button 
                    @click="goToVoiceTab"
                    class="btn btn-primary btn-lg px-4 py-3"
                    :disabled="!isLocalGlbFile"
                    :class="{ 'opacity-50': !isLocalGlbFile }"
                >
                    <i class="fas fa-microphone me-2"></i>
                    {{ isLocalGlbFile ? 'Configurer la voix' : 'Sauvegardez d\'abord votre avatar' }}
                </button>
                
                <!-- Message d'encouragement -->
                <p v-if="!isLocalGlbFile" class="text-muted small mt-2">
                    <i class="fas fa-info-circle me-1"></i>
                    Collez d'abord votre lien GLB ReadyPlayerMe pour continuer
                </p>
                <p v-else class="text-success small mt-2">
                    <i class="fas fa-check-circle me-1"></i>
                    Avatar prêt ! Passez à la configuration vocale
                </p>
            </div>
            <!-- 🎯 Bouton pour passer au tab 3D -->
<div class="mt-3 text-center">
  <button
    @click="goToSandbox3D"
    class="btn btn-outline-dark px-4 py-2"
    :disabled="!isLocalGlbFile"
    :class="{ 'opacity-50': !isLocalGlbFile }"
  >
    <i class="fas fa-cube me-2"></i>
    {{ isLocalGlbFile ? 'Voir en 3D' : 'Avatar non prêt' }}
  </button>
</div>>
            </div>
        </template>

        <!-- ✅ Partie IMAGE -->
        <template v-if="avatarTab === 'image'">
            <iframe id="rpm-frame" allow="camera *; microphone *"
                src="https://braindcode-startup-studio.readyplayer.me/avatar?frameApi&photoUpload"
                style="width: 100%; height: 600px; border: none;">
            </iframe>
            
            <!-- GLB URL Input -->
            <div class="mt-4">
                <p class="form-label">Fichier GLB de l'avatar :</p>
                <div class="position-relative">
                    <input 
                        v-model="avatar.glbUrl"
                        @paste="onGlbUrlPaste($event)"
                        @input="onGlbUrlInput($event.target.value)"
                        class="form-control" 
                        :class="{ 
                            'border-primary bg-light': glbProcessing, 
                            'border-success bg-success-subtle': isLocalGlbFile 
                        }"
                        placeholder="Collez votre lien ReadyPlayerMe ici..." 
                        :disabled="glbProcessing"
                    />
                    
                    <!-- Indicateur de chargement -->
                    <div v-if="glbProcessing" class="position-absolute end-0 top-50 translate-middle-y me-3">
                        <i class="fas fa-spinner fa-spin text-primary"></i>
                    </div>
                    
                    <!-- Indicateur de succès -->
                    <div v-else-if="isLocalGlbFile" class="position-absolute end-0 top-50 translate-middle-y me-3">
                        <i class="fas fa-check-circle text-success"></i>
                    </div>
                </div>
                
                <!-- Message de statut -->
                <div v-if="glbProcessing" class="mt-2 text-primary small">
                    <i class="fas fa-download me-2"></i>
                    Téléchargement et sauvegarde en cours...
                </div>
                <div v-else-if="isLocalGlbFile" class="mt-2 text-success small">
                    <i class="fas fa-check-circle me-2"></i>
                    Fichier GLB sauvegardé : {{ getFileName(avatar.glbUrl) }}
                </div>
            </div>

            <!-- 🎯 Bouton pour passer au tab voix -->
            <div class="mt-4 text-center">
                <button 
                    @click="goToVoiceTab"
                    class="btn btn-primary btn-lg px-4 py-3"
                    :disabled="!isLocalGlbFile"
                    :class="{ 'opacity-50': !isLocalGlbFile }"
                >
                    <i class="fas fa-microphone me-2"></i>
                    {{ isLocalGlbFile ? 'Configurer la voix' : 'Sauvegardez d\'abord votre avatar' }}
                </button>
                
                <!-- Message d'encouragement -->
                <p v-if="!isLocalGlbFile" class="text-muted small mt-2">
                    <i class="fas fa-info-circle me-1"></i>
                    Collez d'abord votre lien GLB ReadyPlayerMe pour continuer
                </p>
                <p v-else class="text-success small mt-2">
                    <i class="fas fa-check-circle me-1"></i>
                    Avatar prêt ! Passez à la configuration vocale
                </p>
            </div>
            <!-- 🎯 Bouton pour passer au tab 3D -->
<div class="mt-3 text-center">
    <button 
        @click="goToThreeTab"
        class="btn btn-outline-dark px-4 py-2"
        :disabled="!isLocalGlbFile"
        :class="{ 'opacity-50': !isLocalGlbFile }"
    >
        <i class="fas fa-cube me-2"></i>
        {{ isLocalGlbFile ? 'Voir en 3D' : 'Avatar non prêt' }}
    </button>
</div>

        </template>

        <!-- ✅ Partie VOIX -->
        <template v-if="avatarTab === 'voix'">
            <div class="voice-selection-container">
                <!-- Header -->
                <div class="text-center mb-4">
                    <div class="alert alert-info d-inline-flex align-items-center mb-3">
                        <i class="fas fa-sync-alt text-primary me-2 fa-spin"></i>
                        <span class="small">L'IA synchronisera automatiquement votre voix avec chaque slide</span>
                    </div>
                    <h4 class="fw-semibold">Choisir, importer ou créer une voix IA</h4>
                </div>

                <!-- 🎯 SECTION 1: Voix IA pré-définies (Resemble) -->
                <div class="mb-4">
                    <h5 class="fw-semibold text-secondary mb-3">Voix IA disponibles</h5>
                    
                    <div v-if="isLoading" class="text-center py-5">
                        <i class="fas fa-spinner fa-spin fa-3x text-primary"></i>
                        <p class="mt-3 text-muted">Chargement des voix IA...</p>
                    </div>

                    <div v-else-if="resembleVoices.length > 0" class="row g-3">
                        <div v-for="voice in resembleVoices" :key="voice.id" class="col-md-3">
                            <div class="voice-card h-100" 
                                 :class="{ 'voice-selected': voix.selectedVoice === voice.id }">
                                <div class="voice-avatar mb-3">
                                    <div class="avatar-circle" :class="getAvatarClass(voice.gender)">
                                        <i :class="getAvatarIcon(voice.gender)"></i>
                                    </div>
                                </div>
                                <h6 class="voice-name">{{ voice.name }}</h6>
                                <p class="voice-desc small">{{ voice.description }}</p>
                                <div class="voice-language mb-3">
                                    <span class="badge bg-primary">{{ voice.language }}</span>
                                </div>
                                <div class="voice-actions d-grid gap-2">
                                    <button class="btn btn-outline-primary btn-sm" 
                                            @click="playResembleVoice(voice.id)" 
                                            :disabled="voix.isPlaying">
                                        <i class="fas fa-play" v-if="!voix.isPlaying || voix.playingVoice !== voice.id"></i>
                                        <i class="fas fa-spinner fa-spin" v-else-if="voix.playingVoice === voice.id"></i>
                                        {{ (voix.isPlaying && voix.playingVoice === voice.id) ? 'Lecture...' : 'Écouter' }}
                                    </button>
                                    <button class="btn btn-primary btn-sm" @click="selectVoice(voice.id, 'resemble')">
                                        Sélectionner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="text-center py-5 text-muted">
                        <i class="fas fa-exclamation-circle fa-2x mb-3"></i>
                        <p>Aucune voix IA disponible</p>
                    </div>
                </div>

                <!-- 🎯 SECTION 2: Voix personnalisées -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-semibold text-secondary">Mes voix personnalisées</h5>
                        <button @click="loadCustomVoices" class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-refresh me-1"></i>
                            Actualiser
                        </button>
                    </div>
                    
                    <div v-if="customVoicesLoading" class="text-center py-5">
                        <i class="fas fa-spinner fa-spin fa-3x text-success"></i>
                        <p class="mt-3 text-muted">Chargement des voix personnalisées...</p>
                    </div>

                    <div v-else-if="customVoices.length > 0" class="row g-3">
                        <div v-for="voice in customVoices" :key="voice.id" class="col-md-3">
                            <div class="voice-card voice-card-custom h-100" 
                                 :class="{ 'voice-selected': voix.selectedVoice === voice.id }">
                                <div class="voice-avatar mb-3">
                                    <div class="avatar-circle bg-success bg-opacity-25 text-success">
                                        <i class="fas fa-microphone"></i>
                                    </div>
                                </div>
                                <h6 class="voice-name">{{ voice.voice_name }}</h6>
                                <p class="voice-desc small">{{ voice.voice_description }}</p>
                                <div class="voice-meta mb-3">
                                    <span class="badge bg-success">{{ voice.language || 'fr' }}</span>
                                    <small class="text-muted ms-2">{{ voice.created_at }}</small>
                                </div>
                                <div class="voice-actions d-grid gap-2">
                                    <button class="btn btn-outline-success btn-sm" 
                                            @click="playCustomVoice(voice)" 
                                            :disabled="voix.isPlaying">
                                        <i class="fas fa-play" v-if="!voix.isPlaying || voix.playingVoice !== voice.id"></i>
                                        <i class="fas fa-spinner fa-spin" v-else-if="voix.playingVoice === voice.id"></i>
                                        {{ (voix.isPlaying && voix.playingVoice === voice.id) ? 'Lecture...' : 'Écouter' }}
                                    </button>
                                    <button class="btn btn-success btn-sm" @click="selectVoice(voice.id, 'custom')">
                                        Sélectionner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="text-center py-5  border-2 border-dashed rounded">
                        <i class="fas fa-microphone fa-3x text-muted mb-3"></i>
                        <h6 class="fw-semibold mb-2">Aucune voix personnalisée</h6>
                        <p class="text-muted small">Créez votre première voix personnalisée ci-dessous</p>
                    </div>
                </div>

                <!-- 🎯 SECTION 3: Créer une nouvelle voix -->
                <div class="bg-light rounded p-4 mb-4">
                    <h5 class="fw-semibold mb-4">Créer une voix personnalisée</h5>
                    
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label">Nom de la Voix</label>
                            <input type="text" v-model="voix.nom" class="form-control" 
                                   placeholder="Ex: Ma voix professionnelle" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Langue</label>
                            <select v-model="voix.langue" class="form-select">
                                <option v-for="langue in languesDisponibles" 
                                        :key="langue.value" :value="langue.value">
                                    {{ langue.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label class="form-label">Description de la Voix</label>
                        <textarea v-model="voix.description" rows="3" class="form-control" 
                                  placeholder="Décrivez le style et l'usage de cette voix..."></textarea>
                    </div>

                    <div class="mb-4">
                        <div class="upload-area  border-2 border-dashed rounded p-4" 
                             @click="$refs.fileInput.click()" 
                             :class="{ 'border-success bg-success-subtle': voix.customVoiceFile }">
                            <div class="text-center">
                                <i class="fas fa-cloud-upload-alt fa-3x mb-3" 
                                   :class="voix.customVoiceFile ? 'text-success' : 'text-muted'"></i>
                                <h6 :class="voix.customVoiceFile ? 'text-success' : ''">
                                    {{ voix.customVoiceFile ? voix.customVoiceFile.name : 'Glissez votre fichier audio ici' }}
                                </h6>
                                <p class="text-muted small">
                                    {{ voix.customVoiceFile ? 'Fichier sélectionné' : 'Formats supportés: MP3, WAV (max 10MB)' }}
                                </p>
                            </div>
                            <input ref="fileInput" type="file" accept=".mp3,.wav" 
                                   @change="handleVoiceUpload" class="d-none">
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-success btn-lg px-5" 
                                @click="createCustomVoice" 
                                :disabled="!voix.customVoiceFile || voiceCreating">
                            <i class="fas fa-spinner fa-spin me-2" v-if="voiceCreating"></i>
                            <i class="fas fa-plus me-2" v-else></i>
                            {{ voiceCreating ? 'Création en cours...' : (voix.customVoiceFile ? 'Créer ma voix' : 'Sélectionner un fichier') }}
                        </button>
                    </div>
                </div>

                <!-- 🎯 SECTION 4: Réglages vocaux -->
<div class="settings-section" v-if="voix.selectedVoice">
                    <h5 class="fw-semibold text-center mb-4">Réglages vocaux</h5>
                    
                    <div class="row g-4 mb-4">
                        <!-- Vitesse -->
                        <div class="col-md-4">
                            <div class="setting-group text-center">
                                <label class="setting-label fw-semibold">Vitesse</label>
                                <div class="slider-container">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="2" 
                                        step="0.1" 
                                        :value="voix.settings.vitesse"
                                        @input="updateVoixSettings('vitesse', $event.target.value)"
                                        class="voice-slider form-range"
                                    >
                                    <div class="slider-labels d-flex justify-content-between small text-muted">
                                        <span>Lent</span>
                                        <span>Normal</span>
                                        <span>Rapide</span>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <small class="text-muted fw-medium">{{ getSliderLabel('vitesse', voix.settings.vitesse) }}</small>
                                </div>
                            </div>
                        </div>

                        <!-- Intonation -->
                        <div class="col-md-4">
                            <div class="setting-group text-center">
                                <label class="setting-label fw-semibold">Intonation</label>
                                <div class="slider-container">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="2" 
                                        step="0.1" 
                                        :value="voix.settings.intonation"
                                        @input="updateVoixSettings('intonation', $event.target.value)"
                                        class="voice-slider form-range"
                                    >
                                    <div class="slider-labels d-flex justify-content-between small text-muted">
                                        <span>Neutre</span>
                                        <span>Équilibré</span>
                                        <span>Expressif</span>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <small class="text-muted fw-medium">{{ getSliderLabel('intonation', voix.settings.intonation) }}</small>
                                </div>
                            </div>
                        </div>

                        <!-- Volume -->
                        <div class="col-md-4">
                            <div class="setting-group text-center">
                                <label class="setting-label fw-semibold">Volume</label>
                                <div class="slider-container">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="2" 
                                        step="0.1" 
                                        :value="voix.settings.volume"
                                        @input="updateVoixSettings('volume', $event.target.value)"
                                        class="voice-slider form-range"
                                    >
                                    <div class="slider-labels d-flex justify-content-between small text-muted">
                                        <span>Faible</span>
                                        <span>Normal</span>
                                        <span>Fort</span>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <small class="text-muted fw-medium">{{ getSliderLabel('volume', voix.settings.volume) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                       
                    <!-- Prévisualisation en temps réel -->
                    <div class="text-center mb-4" v-if="voix.selectedVoice">
                        <button class="btn btn-outline-primary btn-sm" 
        @click="playSelectedVoice" 
        :disabled="voix.isPlaying">

                            <i class="fas fa-play me-2" v-if="!voix.isPlaying"></i>
                            <i class="fas fa-spinner fa-spin me-2" v-else></i>
                            {{ voix.isPlaying ? 'Lecture en cours...' : 'Tester avec mes paramètres' }}
                        </button>
                    </div>
                </div>

                <!-- 🎯 SECTION 5: Choix de langue -->
               <div class="col-md-12">
                <label class="form-label">Choisir la Langue</label>
                            <select class="form-select" v-model="voix.langue" @change="updateVoixSettings('langue', $event.target.value)">
                                <option v-for="langue in languesDisponibles" :key="langue.value" :value="langue.value">
                                    {{ langue.label }}
                                </option>
                            </select>
</div>

                <!-- 🎯 SECTION 6: Affichage de la voix sélectionnée -->
              <!-- 🎯 SECTION 6: Affichage de la voix sélectionnée -->
<div v-if="voix.selectedVoice && selectedVoiceInfo" class="selected-voice-info mb-4">
    <div class="alert alert-primary border-0 d-flex justify-content-between align-items-center">
        <div>
            <h6 class="fw-semibold mb-2">
                <i class="fas fa-check-circle me-2"></i>
                Voix sélectionnée
            </h6>
            <p class="fw-medium mb-1">
                {{ selectedVoiceInfo.name || selectedVoiceInfo.voice_name }}
                <span v-if="selectedVoiceInfo.description || selectedVoiceInfo.voice_description" class="text-muted">
                    ({{ selectedVoiceInfo.description || selectedVoiceInfo.voice_description }})
                </span>
            </p>
            <p class="text-muted small mb-0">Langue: {{ afficherNomLangue(selectedVoiceInfo.language || voix.langue) }}</p>
        </div>
        <button class="btn btn-outline-primary btn-sm" 
                @click="$emit('preview-selected-voice')" 
                :disabled="voix.isPlaying">
            <i class="fas fa-play me-1" v-if="!voix.isPlaying"></i>
            <i class="fas fa-spinner fa-spin me-1" v-else></i>
            {{ voix.isPlaying ? 'Lecture...' : 'Écouter' }}
        </button>
    </div>
</div>


                <!-- 🎯 SECTION 7: Test de synchronisation labiale -->
                <div class="text-center" v-if="voix.selectedVoice">
                    <button class="btn btn-info px-4" @click="$emit('test-lip-sync')">
                        <i class="fas fa-magic me-2"></i>
                        Tester la synchronisation labiale
                    </button>
                </div>
            </div>
        </template>

       <template v-if="avatarTab === 'three'">
  <h5 class="fw-bold mb-3">Aperçu 3D de l'avatar</h5>
  <Avatar3DViewer :glbUrl="`/storage/${avatar.glbUrl}`" :audioUrl="voiceFromDb?.audio_url || ''"/>

  <!-- 🎤 VOIX LIÉE À L'AVATAR -->
  <div v-if="voiceFromDb" class="mt-4 p-3 rounded bg-light border">
    <h6 class="fw-semibold mb-2">
      <i class="fas fa-volume-up me-2"></i>
      Voix associée : {{ voiceFromDb.voice_name }}
    </h6>
    <p class="text-muted small">{{ voiceFromDb.voice_description }}</p>

    <audio 
      :src="voiceFromDb.audio_url"
      controls
      class="w-100 mt-2"
    >
      Votre navigateur ne supporte pas la lecture audio.
    </audio>
  </div>
</template>

    </div>
</template>

<script>
import Avatar3DViewer from './Avatar3DViewer.vue'

export default {

    name: 'Step3AvatarVoix',
    components: {
    Avatar3DViewer
  },
    props: {
        avatarTab: {
            type: String,
            default: 'prompt'
        },
         voiceFromDb: {
    type: Object,
    default: null
  },
        selectedTypes: {
            type: Array,
            default: () => []
        },
        avatar: {
            type: Object,
            required: true
        },
        voix: {
            type: Object,
            required: true
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        resembleVoices: {
            type: Array,
            default: () => []
        },
        customVoices: {
            type: Array,
            default: () => []
        }, 
        customVoicesLoading: {
      type: Boolean,
      default: false
    },
    customVoicesError: {
      type: String,
      default: null
    },
        agent: {
            type: Object,
            required: true
        },
        languesDisponibles: {
            type: Array,
            default: () => []
        },
        availableTypes: {
            type: Array,
            default: () => []
        },
        iframeUrl: {
            type: String,
            default: ''
        },
        selectedVoiceData: {
            type: Object,
            default: null
        },
        loadingLanguages: {
            type: Boolean,
            default: false
        }
    },

    emits: [
        'update:avatarTab',
        'update:selectedTypes',
        'update:avatar',
        'update:voix',
        'update:isLoading',
        'update:resembleVoices',
        'update-avatar-prompt',
        'generate-avatar-prompt-system',
        'handle-rpm-message',
        'load-resemble-voices',
        'ecouter-voix-resemble',
        'ecouter-voix',
        'selectionner-voix',
        'handle-voice-upload',
        'creer-voix',
        'preview-selected-voice',
        'on-language-change',
        'test-lip-sync',
        'get-slider-label',
        'afficher-nom-langue',
        'stop-current-audio',
        'update:customVoices',
        'update:customVoicesLoading',
  'update:customVoicesError',
     'open-sandbox-3d'

    ],

    data() {
        return {
            
            voiceCreating: false,
            glbProcessing: false,
        }
    },

    mounted() {
        this.$emit('load-resemble-voices');
        this.loadCustomVoices();
    },

    computed: {
         voixIA() {
    return this.voix.voixDisponibles?.filter(v => v.type === 'custom') || [];
  },
        isLocalGlbFile() {
            return this.avatar.glbUrl && this.avatar.glbUrl.startsWith('avatars/');
        },
         selectedVoiceInfo() {
    if (!this.voix.selectedVoice) return null;

    if (this.voix.selectedVoiceType === 'resemble') {
      return this.resembleVoices.find(v => v.id === this.voix.selectedVoice);
    }

    if (this.voix.selectedVoiceType === 'custom') {
      return this.customVoices.find(v => v.id === this.voix.selectedVoice);
    }

    return null;
  }
    },

    methods: {
        // 🎯 Méthodes GLB
        async onGlbUrlInput(value) {
            this.updateAvatar('glbUrl', value);
            
            if (this.isValidGlbUrl(value) && !this.glbProcessing) {
                setTimeout(() => {
                    if (this.avatar.glbUrl === value) {
                        this.downloadAndReplaceUrl(value);
                    }
                }, 2000);
            }
        },
goToThreeTab() {
    if (this.isLocalGlbFile) {
        this.$emit('update:avatarTab', 'three');
        if (typeof toast !== 'undefined') {
            toast.success('👁️ Passage à l\'aperçu 3D !');
        }
    } else {
        if (typeof toast !== 'undefined') {
            toast.warning('Veuillez d\'abord sauvegarder votre avatar GLB');
        }
    }
},
  goToSandbox3D() {
      if (!this.isLocalGlbFile) {
        if (typeof toast !== 'undefined') toast.warning('Veuillez d\'abord sauvegarder votre avatar GLB')
        return
      }
      this.$emit('open-sandbox-3d', {
        glbUrl: `/storage/${this.avatar.glbUrl}`,
        voiceFromDb: this.voiceFromDb || null
      })
    },
        async onGlbUrlPaste(event) {
            event.preventDefault();
            const pastedUrl = (event.clipboardData || window.clipboardData).getData('text');
            
            if (this.isValidGlbUrl(pastedUrl)) {
                this.updateAvatar('glbUrl', pastedUrl);
                await this.downloadAndReplaceUrl(pastedUrl);
            } else {
                this.updateAvatar('glbUrl', pastedUrl);
            }
        },
playSelectedVoice() {
  const selectedVoice = this.voix.selectedVoice;
  const voiceInfo = this.selectedVoiceInfo;
  const type = this.voix.selectedVoiceType;

  if (!selectedVoice || !voiceInfo) {
    toast.warning("⚠️ Aucune voix sélectionnée.");
    return;
  }

  this.voix.isPlaying = true;

  if (type === 'custom') {
    this.playCustomVoice(voiceInfo);
  } else if (type === 'resemble') {
    this.playResembleVoice(voiceInfo.id);
  } else {
    toast.warning("⚠️ Type de voix non reconnu.");
    this.voix.isPlaying = false;
  }
}

,
        async downloadAndReplaceUrl(url) {
            if (this.glbProcessing) return;
            
            this.glbProcessing = true;
            
            try {
                const response = await axios.post('/api/agentia/process-glb-url', {
                    glb_url: url
                });
                
                if (response.data.success) {
                    this.updateAvatar('glbUrl', response.data.local_path);
                    // Correction toast
                    if (typeof toast !== 'undefined') {
                        toast.success(`✅ Fichier GLB sauvegardé : ${response.data.file_name}`);
                    }
                } else {
                    if (typeof toast !== 'undefined') {
                        toast.error('❌ ' + response.data.message);
                    }
                }
            } catch (error) {
                console.error('Erreur téléchargement GLB:', error);
                if (typeof toast !== 'undefined') {
                    toast.error('❌ Impossible de télécharger le fichier GLB');
                }
            } finally {
                this.glbProcessing = false;
            }
        },

        isValidGlbUrl(url) {
            if (!url || typeof url !== 'string') return false;
            
            return (
                url.includes('models.readyplayer.me') ||
                url.includes('readyplayer.me') ||
                (url.startsWith('http') && url.includes('.glb'))
            );
        },

        getFileName(path) {
            if (!path) return '';
            const parts = path.split('/');
            return parts[parts.length - 1];
        },

        // 🎯 Méthodes de navigation
        goToVoiceTab() {
            if (this.isLocalGlbFile) {
                this.$emit('update:avatarTab', 'voix');
                if (typeof toast !== 'undefined') {
                    toast.success('🎤 Passons maintenant à la configuration de la voix !');
                }
            } else {
                if (typeof toast !== 'undefined') {
                    toast.warning('Veuillez d\'abord sauvegarder votre avatar GLB');
                }
            }
        },

        // 🎯 Méthodes Avatar
        getAvatarClass(gender) {
            switch (gender) {
                case 'female': return 'bg-danger bg-opacity-25 text-danger'
                case 'male': return 'bg-primary bg-opacity-25 text-primary'
                default: return 'bg-secondary bg-opacity-25 text-secondary'
            }
        },

        getAvatarIcon(gender) {
            switch (gender) {
                case 'female': return 'fas fa-user-circle'
                case 'male': return 'fas fa-user-circle'
                default: return 'fas fa-robot'
            }
        },

        updateAvatar(key, value) {
            const updatedAvatar = { ...this.avatar };
            updatedAvatar[key] = value;
            this.$emit('update:avatar', updatedAvatar);
            
            if (key !== 'glbUrl') {
                this.$emit('update-avatar-prompt');
            }
        },

        toggleSelectedType(typeValue) {
            let updatedTypes = [...this.selectedTypes];
            const index = updatedTypes.indexOf(typeValue);

            if (index > -1) {
                updatedTypes.splice(index, 1);
            } else {
                updatedTypes.push(typeValue);
            }

            this.$emit('update:selectedTypes', updatedTypes);
            this.$emit('update-avatar-prompt');
        },

        // 🎯 Méthodes Voix
        async loadCustomVoices() {
  this.$emit('update:customVoicesLoading', true)
            
            try {
                const response = await axios.get('/api/agentia/custom-voices');
                
                if (response.data.success) {
                    this.$emit('update:customVoices', response.data.voices);
                    console.log(`✅ ${response.data.count} voix personnalisées chargées`);
                } else {
                    if (typeof toast !== 'undefined') {
                        toast.error('Erreur lors du chargement des voix personnalisées');
                    }
                }
            } catch (error) {
                console.error('❌ Erreur chargement voix personnalisées:', error);
                if (typeof toast !== 'undefined') {
                    toast.error('Impossible de charger les voix personnalisées');
                }
            } finally {
this.$emit('update:customVoicesLoading', false);
            }
        },

       playCustomVoice(voice) {
  let audioUrl = null;

  if (voice.audio_url && typeof voice.audio_url === 'string') {
    audioUrl = voice.audio_url;
  } else if (voice.file_path instanceof File || voice.file_path instanceof Blob) {
    audioUrl = URL.createObjectURL(voice.file_path);
  } else {
    console.warn("⚠️ file_path non valide :", voice.file_path);
  }

  if (!audioUrl) {
    toast.warning("⚠️ Aucun fichier audio trouvé pour cette voix personnalisée.");
    this.voix.isPlaying = false;
    return;
  }

  const audio = new Audio(audioUrl);
  this.voix.playingVoice = voice.id;

  audio.play().then(() => {
    console.log(`🎧 Lecture de la voix personnalisée : ${voice.voice_name}`);
  }).catch((err) => {
    toast.error("❌ Erreur lors de la lecture audio.");
    console.error(err);
    this.voix.isPlaying = false;
  });

  audio.onended = () => {
    this.voix.isPlaying = false;
    this.voix.playingVoice = null;
    if (!voice.audio_url) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  audio.onerror = () => {
    toast.error("❌ Impossible de lire la voix personnalisée.");
    this.voix.isPlaying = false;
    this.voix.playingVoice = null;
  };
},


        async playResembleVoice(voiceId) {
            this.$emit('ecouter-voix-resemble', voiceId);
        },

        selectVoice(voiceId, type) {
            this.voix.selectedVoice = voiceId;
            this.voix.selectedVoiceType = type;
            let voiceName = '';
            if (type === 'resemble') {
                const voice = this.resembleVoices.find(v => v.id === voiceId);
                voiceName = voice?.name || voiceId;
            } else if (type === 'custom') {
                const voice = this.customVoices.find(v => v.id === voiceId);
                voiceName = voice?.voice_name || voiceId;
            }
            
            this.$emit('selectionner-voix', voiceId);
            if (typeof toast !== 'undefined') {
                toast.success(`✅ Voix sélectionnée: ${voiceName}`);
            }
        },
playCustomVoice(voice) {
  let audioUrl = null;

  if (voice.audio_url) {
    audioUrl = voice.audio_url;
  } else if (voice.file_path instanceof File || voice.file_path instanceof Blob) {
    audioUrl = URL.createObjectURL(voice.file_path);
  }

  if (!audioUrl) {
    toast.warning("⚠️ Aucun fichier audio trouvé.");
    this.voix.isPlaying = false;
    return;
  }

  const audio = new Audio(audioUrl);
  this.voix.playingVoice = voice.id;

  audio.play().then(() => {
    console.log(`Lecture : ${voice.voice_name}`);
  }).catch((err) => {
    toast.error("Erreur lecture audio");
    console.error(err);
    this.voix.isPlaying = false;
  });

  audio.onended = () => {
    this.voix.isPlaying = false;
    this.voix.playingVoice = null;
    if (!voice.audio_url) {
      URL.revokeObjectURL(audioUrl); // libérer mémoire si fichier local
    }
  };

  audio.onerror = () => {
    toast.error("Erreur de lecture");
    this.voix.isPlaying = false;
    this.voix.playingVoice = null;
  };
}

,


        async createCustomVoice() {
            if (!this.voix.customVoiceFile) {
                if (typeof toast !== 'undefined') {
                    toast.error('Veuillez sélectionner un fichier audio');
                }
                return;
            }

            if (!this.voix.nom?.trim()) {
                if (typeof toast !== 'undefined') {
                    toast.error('Veuillez donner un nom à votre voix');
                }
                return;
            }

            this.voiceCreating = true;

            const formData = new FormData();
            formData.append('voice_file', this.voix.customVoiceFile);
            formData.append('voice_name', this.voix.nom.trim());
            formData.append('description', this.voix.description || 'Voix personnalisée');
            formData.append('language', this.voix.langue);
            formData.append('settings[vitesse]', this.voix.settings?.vitesse || 1);
            formData.append('settings[intonation]', this.voix.settings?.intonation || 1);
            formData.append('settings[volume]', this.voix.settings?.volume || 1);

            try {
                const response = await axios.post('/api/agentia/create-custom-voice', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    if (typeof toast !== 'undefined') {
                        toast.success('✅ Voix personnalisée créée avec succès !');
                    }
                    
                    // Réinitialiser le formulaire
                    this.voix.customVoiceFile = null;
                    this.voix.nom = '';
                    this.voix.description = '';
                    
                    // Recharger les voix personnalisées
                    await this.loadCustomVoices();
                    
                    // Sélectionner automatiquement la nouvelle voix
                    this.selectVoice(response.data.voice.id, 'custom');
                } else {
                    if (typeof toast !== 'undefined') {
                        toast.error('❌ Erreur lors de la création de la voix');
                    }
                }
            } catch (error) {
                console.error('❌ Erreur création voix:', error);
                if (typeof toast !== 'undefined') {
                    toast.error('❌ Erreur réseau lors de la création');
                }
            } finally {
                this.voiceCreating = false;
            }
        },

        handleVoiceUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (!file.type.startsWith('audio/')) {
                    if (typeof toast !== 'undefined') {
                        toast.error('❌ Veuillez sélectionner un fichier audio valide');
                    }
                    return;
                }
                
                if (file.size > 10 * 1024 * 1024) { // 10MB
                    if (typeof toast !== 'undefined') {
                        toast.error('❌ Le fichier est trop volumineux (max 10MB)');
                    }
                    return;
                }
                
                this.voix.customVoiceFile = file;
                if (typeof toast !== 'undefined') {
                    toast.success(`📁 Fichier sélectionné: ${file.name}`);
                }
            }
        },

        stopCurrentAudio() {
            this.voix.isPlaying = false;
            this.voix.playingVoice = null;
        },

        // 🎯 Méthodes pour les réglages vocaux
        updateVoixSettings(key, value) {
            const updatedVoix = { ...this.voix };
            
            if (key === 'langue') {
                updatedVoix.langue = value;
                this.$emit('on-language-change');
            } else {
                updatedVoix.settings = { ...updatedVoix.settings };
                updatedVoix.settings[key] = parseFloat(value);
            }
            
            this.$emit('update:voix', updatedVoix);
        },

        getSliderLabel(type, value) {
            const labels = {
                vitesse: {
                    0: 'Très lent',
                    0.5: 'Lent',
                    1: 'Normal',
                    1.5: 'Rapide',
                    2: 'Très rapide'
                },
                intonation: {
                    0: 'Monotone',
                    0.5: 'Neutre',
                    1: 'Équilibré',
                    1.5: 'Expressif',
                    2: 'Très expressif'
                },
                volume: {
                    0: 'Très faible',
                    0.5: 'Faible',
                    1: 'Normal',
                    1.5: 'Fort',
                    2: 'Très fort'
                }
            };
            
            const valueMap = labels[type];
            const values = Object.keys(valueMap).map(Number);
            const closest = values.reduce((prev, curr) => {
                return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
            });
            
            return valueMap[closest];
        },

        afficherNomLangue(code) {
            const map = {
                'fr': 'Français',
                'en': 'English',
                'es': 'Español',
                'de': 'Deutsch',
                'it': 'Italiano'
            };
            return map[code] || code.toUpperCase();
        },
    }
}
</script>

<style scoped>
/* Conserver tous tes styles existants */
.voice-selection-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: #fafafa;
    border-radius: 12px;
}

.voice-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.voice-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.voice-card.voice-selected {
    border-color: var(--bs-primary);
    background: var(--bs-primary-bg-subtle);
}

.voice-card-custom.voice-selected {
    border-color: var(--bs-success);
    background: var(--bs-success-bg-subtle);
}

.avatar-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.voice-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.voice-desc {
    color: var(--bs-text-muted);
    margin-bottom: 0.75rem;
}

.upload-area {
    cursor: pointer;
    transition: all 0.3s ease;
}

.upload-area:hover {
    border-color: var(--bs-primary) !important;
    background-color: var(--bs-primary-bg-subtle) !important;
}

.settings-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
}

.setting-group {
    text-align: center;
}

.setting-label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
}

.voice-slider {
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    outline: none;
    margin-bottom: 0.5rem;
}

.language-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
    .voice-selection-container {
        padding: 1rem;
    }
}
</style>