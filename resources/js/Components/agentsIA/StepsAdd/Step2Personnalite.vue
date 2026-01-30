<template>
    <div class="row">
        <div class="col-12 mb-4">
            <h4>Paramétrez la Personnalité et Comportement de l'agent IA</h4>
            <p class="text-orange fw-bold">*Représente un champ obligatoire</p>
        </div>
        
        <!-- Rôle de l'agent IA -->
        <div class="col-12 mb-4">
            <label class="form-label">Rôle de l'agent IA*</label>
            <input type="text" 
                class="form-control" 
                :value="personnalite.role"
                @input="updatePersonnalite('role', $event.target.value)"
                placeholder="Rôle de l'agent IA" required>
        </div>
        
        <!-- Mission principale -->
        <div class="col-12 mb-4">
            <label class="form-label">Mission principale*</label>
            <textarea class="form-control" 
                rows="4" 
                :value="personnalite.mission"
                @input="updatePersonnalite('mission', $event.target.value)"
                placeholder="Décrire la mission de l'agent IA" required></textarea>
        </div>
        
        <!-- Tonalité & Personnalité (PCM) avec sliders -->
        <div class="col-12 mb-4">
            <label class="form-label fw-bold mb-3">Tonalité & Personnalité (PCM)*</label>
            <div class="row g-3 bg-white p-4 rounded">
                <!-- Ligne 1 -->
                <div class="col-md-4" v-for="(tonalite, key) in tonalites" :key="tonalite.id">
                    <div class="personality-slider p-3 rounded bg-light shadow-sm">
                        <label :for="key" class="form-label">{{ key }}</label>
                        <p>{{ key }}: {{ tonalite.value }}%</p>
                        <input type="range" 
                            class="form-range custom-slider" 
                            :id="key" 
                            min="0"
                            max="16.67" 
                            step="0.01" 
                            :value="tonalites[key].value"
                            @input="updateTonalite(key, $event.target.value)">
                        <div class="text-end small text-muted">{{
                            formatPercentage(tonalite.value) }}%</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 mb-4">
            <label class="form-label">Style de réponse attendu*</label>
            <div class="d-flex flex-column">
                <div class="form-check mb-3 border p-3 rounded">
                    <input type="radio" 
                        id="synthetique" 
                        name="style_reponse"
                        class="form-check-input" 
                        :checked="personnalite.style_reponse === 'Synthetique'"
                        @change="updatePersonnalite('style_reponse', 'Synthetique')" 
                        required>
                    <label for="synthetique" class="form-check-label ms-2">Synthétique</label>
                </div>
                <div class="form-check mb-3 border p-3 rounded">
                    <input type="radio" 
                        id="detailee" 
                        name="style_reponse"
                        class="form-check-input" 
                        :checked="personnalite.style_reponse === 'Detailee'"
                        @change="updatePersonnalite('style_reponse', 'Detailee')" 
                        required>
                    <label for="detailee" class="form-check-label ms-2">Détailée</label>
                </div>
                <div class="form-check mb-3 border p-3 rounded">
                    <input type="radio" 
                        id="schematique" 
                        name="style_reponse"
                        class="form-check-input" 
                        :checked="personnalite.style_reponse === 'Schematique'"
                        @change="updatePersonnalite('style_reponse', 'Schematique')" 
                        required>
                    <label for="schematique" class="form-check-label ms-2">Schématique</label>
                </div>
            </div>
        </div>

        <!-- Contraintes spécifiques -->
        <div class="col-12 mb-4">
            <label class="form-label">Contraintes spécifiques</label>
            <textarea class="form-control" 
                :value="personnalite.contraintes_specifiques"
                @input="updatePersonnalite('contraintes_specifiques', $event.target.value)"
                rows="4" 
                placeholder="Ajouter des contraintes spécifiques"></textarea>
        </div>

        <!-- Prompt système -->
        <div class="col-12 mb-4">
            <label class="form-label fw-bold">Prompt système</label>

            <textarea class="form-control" 
                rows="12" 
                :value="generatedPrompt"
                @input="$emit('update:generatedPrompt', $event.target.value)"
                placeholder="Le prompt système sera généré ici"></textarea>

            <div v-if="showUseButton" class="mt-2 d-flex gap-2">
                <button class="btn btn-success" @click="$emit('use-generated-prompt')">
                    ✅ Utiliser ce prompt
                </button>
                <button class="btn btn-outline-secondary" @click="$emit('copy-prompt')">
                    📋 Copier le prompt
                </button>
            </div>
        </div>

        <!-- Bouton déclencheur -->
        <div class="col-12 mb-4">
            <button class="btn btn-primary" @click="$emit('improve-prompt')">
                🤖 Générer Prompt Système avec IA
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Step2Personnalite',
    props: {
        personnalite: {
            type: Object,
            required: true
        },
        tonalites: {
            type: Object,
            required: true
        },
        generatedPrompt: {
            type: String,
            default: ''
        },
        agent: {
            type: Object,
            required: true
        },
        showUseButton: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        'update:personnalite',
        'update:tonalites',
        'update:generatedPrompt',
        'update-sliders',
        'improve-prompt',
        'use-generated-prompt',
        'copy-prompt'
    ],
    
    methods: {
        updatePersonnalite(key, value) {
            const updatedPersonnalite = { ...this.personnalite }
            updatedPersonnalite[key] = value
            this.$emit('update:personnalite', updatedPersonnalite)
        },

        updateTonalite(key, value) {
            const updatedTonalites = { ...this.tonalites }
            updatedTonalites[key] = { ...updatedTonalites[key], value: parseFloat(value) }
            this.$emit('update:tonalites', updatedTonalites)
            this.$emit('update-sliders')
        },

        formatPercentage(value) {
            value = parseFloat(value)
            if (!isNaN(value)) {
                return value.toFixed(2)
            }
            return "0.00"
        }
    }
}
</script>