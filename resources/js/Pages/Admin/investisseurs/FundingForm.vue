<template>
  <div class="container mt-4">
    <div class="mb-4 ai-autofill-whitecard">
      <div class="ai-header d-flex align-items-center gap-3 mb-3">
        <img src="/assets/img1/robot.png" alt="Bot" class="ai-bot-img" style="width:38px;height:38px;">
        <span class="ai-title">Agent IA de Pré-remplissage</span>
      </div>
      <div class="ai-body d-flex gap-2">
 <input v-model="aiUrl" type="text" placeholder="Collez l’URL ici..." class="input-custom"/>
    <button @click="analyzeUrl" :disabled="aiLoading">
      {{ aiLoading ? "Analyse en cours..." : "Analyser URL" }}
    </button>       
        <button type="button" class="btn btn-outline-primary fs-sm">Vider</button>
      </div>
    </div>

    <!-- Stepper -->
    <div class="partner-stepper mb-6">
      <div class="steps-container flex items-center justify-between">
        <template v-for="(step, i) in steps" :key="i">
          <div
            class="step flex flex-col items-center cursor-pointer"
            :class="{ active: currentStep === i + 1, done: currentStep > i + 1, clickable: currentStep > i + 1 }"
            @click="goToStep(i + 1)"
          >
            <div class="step-circle">{{ i + 1 }}</div>
            <div class="step-label text-xs mt-1">{{ step }}</div>
          </div>
          <div v-if="i < steps.length - 1" class="step-line flex-1"
               :class="{ 'line-active': currentStep === i + 1, 'line-done': currentStep > i + 1 }">
          </div>
        </template>
      </div>
    </div>

    <!-- === STEP CONTENT === -->

    <!-- Step 1 : Informations générales -->
    <div v-if="currentStep === 1" class="space-y-6">
      <h2 class="informations-gnrales">Informations générales</h2>
      <p class="reprsente-un-champ">* Représente un champ obligatoire</p>

      <!-- Nom -->
      <div>
        <label class="form-label">Nom du dispositif <span class="span">*</span></label>
        <input v-model="formData.title" type="text" class="input-custom" placeholder="Écrire un nom..."/>
      </div>

      <!-- Type -->
      <div>
  <label class="form-label">Type de financement <span class="span">*</span></label>

  <!-- Affichage en lecture seule si N8N a renvoyé une valeur -->
  <div v-if="formData.funding_type" class="input-custom bg-gray-100">
    {{ formData.funding_type }}
  </div>

  <!-- Sinon on garde le select classique -->
  <select v-else v-model="formData.funding_type" class="select-custom">
    <option value="">Sélectionner un type</option>
    <option value="subvention">Subvention</option>
    <option value="pret">Prêt</option>
    <option value="avance_remboursable">Avance remboursable</option>
  </select>
</div>


      <!-- Description -->
      <div>
        <label class="form-label">Description</label>
        <textarea v-model="formData.description" rows="4" class="textarea-custom" placeholder="Écrire ici..."></textarea>
      </div>

      <!-- Opérateur -->
      <div>
        <label class="form-label">Opérateur / Organisme <span class="span">*</span></label>
        <input v-model="formData.operator" type="text" class="input-custom" placeholder="Ex: Région Nouvelle-Aquitaine"/>
      </div>

      <!-- Périmètre -->
      <div>
        <label class="form-label">Périmètre géographique <span class="span">*</span></label>
        <div class="flex flex-wrap gap-2">
          <label v-for="scope in geographicScopes" :key="scope.value"
                 class="inline-flex items-center px-4 py-2 rounded-full border cursor-pointer transition-all"
                 :class="{
                   'bg-blue-50 border-blue-500 text-blue-700': formData.geographic_scope === scope.value,
                   'bg-white border-gray-300 text-gray-700': formData.geographic_scope !== scope.value
                 }">
            <input type="radio" :value="scope.value" v-model="formData.geographic_scope" class="sr-only"/>
            <span>{{ scope.label }}</span>
          </label>
        </div>
      </div>

      <!-- Secteurs -->
      <div>
        <label class="form-label">Secteurs concernés <span class="span">*</span></label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label v-for="sector in sectors" :key="sector" class="checkbox-option">
            <input type="checkbox" :value="sector" v-model="formData.sectors" class="hidden"/>
            <div :class="['checkbox-box', { active: formData.sectors.includes(sector) }]"></div>
            <span class="checkbox-label">{{ sector }}</span>
          </label>
        </div>
      </div>

      <!-- Image -->
   <div>
  <label class="form-label">Image de couverture</label>

  <!-- Si cover_banner existe depuis n8n -->
  <div v-if="formData.cover_image">
    <img :src="formData.cover_image" alt="Cover banner" class="h-32 rounded mb-2"/>
    <input type="hidden" v-model="formData.cover_image" />
    <button type="button" class="px-2 py-1 bg-red-500 text-white text-xs rounded"
            @click="formData.cover_image = ''">
      Supprimer
    </button>
  </div>

  <!-- Sinon fallback pour upload -->
  <div v-else class="jointe">
    <label for="file-upload">Cliquez pour sélectionner une image (PNG, JPG, max 5MB)</label>
    <input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
  </div>
</div>


      <!-- Mots clés -->
      <div>
        <label class="form-label">Mot-clés (Optionnel)</label>
        <input v-model="formData.keywords" type="text" class="input-custom" placeholder="Ajoutez des mots-clés"/>
      </div>
    </div>

    <!-- Step 2 : Éligibilité -->
    <div v-else-if="currentStep === 2" class="space-y-6">
      <h2 class="informations-gnrales">Éligibilité</h2>
      <div>
        <label class="form-label">Profils bénéficiaires *</label>
        <div class="grid grid-cols-2 gap-3">
          <label class="checkbox-option" v-for="beneficiary in beneficiariesOptions" :key="beneficiary">
            <input type="checkbox" :value="beneficiary" v-model="formData.beneficiaries" class="hidden"/>
            <div :class="['checkbox-box', { active: formData.beneficiaries.includes(beneficiary) }]"></div>
            <span class="checkbox-label">{{ beneficiary }}</span>
          </label>
        </div>
      </div>

      <div>
        <label class="form-label">Stade du projet *</label>
        <select v-model="formData.project_stage" class="select-custom">
          <option value="Idée">Idée</option>
          <option value="MVP">MVP</option>
          <option value="Traction">Traction</option>
          <option value="Croissance">Croissance</option>
        </select>
      </div>

      <div>
        <label class="form-label">Statut d’éligibilité *</label>
        <select v-model="formData.eligibility_status" class="select-custom">
          <option value="Ouvert">Ouvert</option>
          <option value="À venir">À venir</option>
          <option value="Clôturé">Clôturé</option>
          <option value="Au fil de l’eau">Au fil de l’eau</option>
        </select>
      </div>
    </div>

    <!-- Step 3 : Montants & Calendrier -->
    <div v-else-if="currentStep === 3" class="space-y-6">
      <h2 class="informations-gnrales">Montants & Calendrier</h2>

      <div>
        <label class="form-label">Montant minimum (€)</label>
        <input type="number" v-model="formData.amount_min" class="input-custom"/>
      </div>

      <div>
        <label class="form-label">Montant maximum (€)</label>
        <input type="number" v-model="formData.amount_max" class="input-custom"/>
      </div>

      <div>
        <label class="form-label">Taux de prise en charge (%)</label>
        <input type="range" min="0" max="100" v-model="formData.coverage_rate" class="w-full"/>
        <p class="text-sm text-gray-600 mt-1">{{ formData.coverage_rate }}%</p>
      </div>

      <div>
        <label class="form-label">Ouverture des candidatures *</label>
        <input type="date" v-model="formData.open_date" class="input-custom"/>
      </div>

      <div>
        <label class="form-label">Clôture des candidatures *</label>
        <input type="date" v-model="formData.close_date" class="input-custom"/>
      </div>

      <div>
        <label class="form-label">Délai moyen d’instruction</label>
        <select v-model="formData.instruction_delay" class="select-custom">
          <option value="">Sélectionner</option>
          <option value="Moins de 4 semaines">Moins de 4 semaines</option>
          <option value="4 à 8 semaines">4 à 8 semaines</option>
          <option value="Plus de 8 semaines">Plus de 8 semaines</option>
        </select>
      </div>
    </div>

    <!-- Step 4 : Procédure -->
    <div v-else-if="currentStep === 4" class="space-y-6">
      <h2 class="informations-gnrales">Procédure</h2>

      <div>
        <label class="form-label">Lien officiel de candidature *</label>
        <input v-model="formData.application_link" type="text" class="input-custom" placeholder="https://..."/>
      </div>

      <div>
        <label class="form-label">Contact opérateur</label>
        <input v-model="formData.operator_contact" type="text" class="input-custom" placeholder="Email ou téléphone"/>
      </div>

      <div>
        <label class="form-label">Étapes de candidature</label>
        <textarea v-model="stepsText" class="textarea-custom" placeholder="1. ...&#10;2. ..."></textarea>
      </div>
    </div>

    <!-- Step 5 : Livrables -->
    <div v-else-if="currentStep === 5" class="space-y-6">
      <h2 class="informations-gnrales">Livrables & Visuels</h2>
      <div>
        <label class="form-label">Documents requis</label>
        <div class="grid grid-cols-2 gap-3">
          <label v-for="deliverable in deliverablesOptions" :key="deliverable" class="checkbox-option">
            <input type="checkbox" :value="deliverable" v-model="formData.deliverables" class="hidden"/>
            <div :class="['checkbox-box', { active: formData.deliverables.includes(deliverable) }]"></div>
            <span class="checkbox-label">{{ deliverable }}</span>
          </label>
        </div>
      </div>

      <div>
        <label class="form-label">Notes internes</label>
        <textarea v-model="formData.internal_notes" class="textarea-custom"></textarea>
      </div>

      <div>
        <label class="form-label">Logo opérateur</label>
        <input v-model="formData.operator_logo" type="text" class="input-custom" placeholder="URL du logo"/>
      </div>

      <div>
        <label class="form-label">Bannière de couverture</label>
        <input v-model="formData.cover_banner" type="text" class="input-custom" placeholder="URL de l’image"/>
      </div>
    </div>

    <!-- Step 6 : SEO -->
    <div v-else-if="currentStep === 6" class="space-y-6">
      <h2 class="informations-gnrales">SEO</h2>

      <div>
        <label class="form-label">Slug SEO</label>
        <input v-model="formData.seo_slug" type="text" class="input-custom" placeholder="slug-de-mon-dispositif"/>
      </div>

      <div>
        <label class="form-label">Meta Title</label>
        <input v-model="formData.seo_meta_title" type="text" class="input-custom" placeholder="Titre optimisé pour le SEO"/>
      </div>

      <div>
        <label class="form-label">Meta Description</label>
        <textarea v-model="formData.seo_meta_description" class="textarea-custom" placeholder="Description optimisée SEO..."></textarea>
      </div>

      <div class="flex items-center gap-2 mt-3">
        <input type="checkbox" v-model="formData.seo_indexation"/>
        <span class="text-sm text-gray-700">Autoriser l’indexation par les moteurs de recherche</span>
      </div>
    </div>

    <!-- === NAVIGATION === -->
    <div class="flex justify-between mt-6">
      <button v-if="currentStep > 1" @click="prevStep" class="px-4 py-2 bg-gray-200 rounded">Précédent</button>
      <button v-if="currentStep < steps.length" @click="nextStep" class="ml-auto px-4 py-2 bg-blue-600 text-white rounded">Suivant</button>
      <button v-else @click="submitForm" class="ml-auto px-4 py-2 bg-green-600 text-white rounded">Soumettre</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import { router } from '@inertiajs/vue3'
const steps = [
  "Informations générales",
  "Éligibilité",
  "Montants & Calendrier",
  "Procédure",
  "Livrables & Visuels",
  "SEO"
];
const aiUrl = ref("");
const aiLoading = ref(false);
const currentStep = ref(1);

const formData = ref({
  title: "", funding_type: "", description: "", operator: "",
  geographic_scope: "", sectors: [], keywords: "", beneficiaries: [],cover_image:"",
  project_stage: "", eligibility_status: "", amount_min: null, amount_max: null,
  coverage_rate: 0, open_date: "", close_date: "", instruction_delay: "",
  application_link: "", operator_contact: "", application_steps: [],
  deliverables: [], internal_notes: "", operator_logo: "", cover_banner: "",
  seo_slug: "", seo_meta_title: "", seo_meta_description: "", seo_indexation: true
});
async function analyzeUrl() {
  if (!aiUrl.value) {
    alert("Veuillez entrer une URL");
    return;
  }
  try {
    aiLoading.value = true;

    const resp = await axios.post('/api/n8n/analyze', {
      url: aiUrl.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log("Réponse brute n8n :", resp.data);

    // Si c'est un tableau → prendre le premier objet
    const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;

    if (!data || Object.keys(data).length === 0) {
                              toast.error(`❌Réponse vide reçue de n8n`);

      return;
    }

    // Fusionner avec ton formData
    Object.assign(formData.value, data);

    console.log("Formulaire après remplissage :", formData.value);
                    toast.success(`✅ Champs pré-remplis via n8n`);

  } catch (err) {
    console.error("Erreur analyse URL :", err);
                        toast.error(`❌ Erreur lors de l’analyse du lien`);

  } finally {
    aiLoading.value = false;
  }
}




const geographicScopes = [
  { value: 'national', label: 'National' },
  { value: 'regional', label: 'Régional' },
  { value: 'ue', label: 'UE' },
  { value: 'local', label: 'Local' }
];

const beneficiariesOptions = [
  "Startup de moins de 3 ans", "PME", "Association",
  "Portage projet personnel", "Étudiant entrepreneur"
];

const deliverablesOptions = [
  "Pitch Deck", "Business Plan", "Cahier des charges",
  "Budget prévisionnel", "Pièces administratives"
];
const sectors = ["FoodTech", "EdTech", "IA", "GreenTech", "Santé", "SaaS", "Impact", "Autres"];

const stepsText = computed({
  get: () => (formData.value.application_steps || []).join("\n"),
  set: val => { formData.value.application_steps = val.split("\n").filter(x => x.trim()); }
});

function goToStep(step) { currentStep.value = step; }
function nextStep() { if (currentStep.value < steps.length) currentStep.value++; }
function prevStep() { if (currentStep.value > 1) currentStep.value--; }
async function submitForm() {
  try {
    const resp = await axios.post("/api/n8n/fundings", formData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    toast.success("✅ Ajout réussi !");
    setTimeout(() => {
      router.push('/admin/list/Publication')
    }, 700);
  } catch (err) {
    console.error(err);
    alert("❌ Erreur lors de l’ajout");
  }
}

</script>


<style scoped>
.ai-autofill-whitecard {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,104,169,0.09), 0 1.5px 6px rgba(0,0,0,0.04);
  padding: 28px 24px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ai-bot-img {
  box-shadow: 0 2px 8px #e0eafc;
  border-radius: 50%;
  background: #f6fafd;
}

.partner-stepper { display: flex; align-items: center; justify-content: center; }
.steps-container { width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; }
.step { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #c8c8c8; }
.step .step-circle { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 10px 8px 20px rgba(0,81,131,.25); background-color: rgba(255,255,255,.4); border: 2px solid #d9f0fd; font-family: 'Arial Rounded MT Bold', Arial, sans-serif; font-size: 20px; color: #0098f3; }
.step.active .step-circle { border-color: #d9f0fd; color: #0098f3; }
.step.done .step-circle { border-color: #e9f9ef; color: #22c55e; }
.step .step-label { font-size: 16px; line-height: 24px; text-align: center; font-family: 'Work Sans', Arial, sans-serif; }
.step-line { width: 60px; height: 2px; background: #e5e7eb; }
.step-line.line-active { background: #28A9FF; height: 3px; box-shadow: 0 4px 18px rgba(0, 152, 243, 0.25); }
.step-line.line-done { background: #22c55e; height: 3px; box-shadow: 0 4px 18px rgba(34, 197, 94, 0.25); }
.plan-card { border: 1px dashed #dbeafe; border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgba(0,104,169,.12); }

/* Step labels */
.step .step-label { color: #c8c8c8; }
.step.active .step-label { color: #0098f3; font-weight: 600; }
.step.done .step-label { color: #22c55e; font-weight: 600; }

/* Active circle glow for emphasis */
.step.active .step-circle { box-shadow: 0 8px 24px rgba(0, 152, 243, 0.25), 10px 8px 20px rgba(0,81,131,.25); }
.step.done .step-circle { box-shadow: 0 8px 24px rgba(34, 197, 94, 0.18), 10px 8px 20px rgba(0,81,131,.10); }

/* Clickable previous steps */
.step.clickable { cursor: pointer; }
.step.clickable:hover .step-label { text-decoration: underline; }

/* Feature input with inline remove icon */
.feature-item { position: relative; }
.pr-has-icon { padding-right: 42px !important; }
.icon-remove {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #ef4444; /* red-500 */
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
}
.icon-remove:hover { background: #fee2e2; color: #dc2626; }
.icon-remove:focus-visible { outline: 2px solid #fecaca; outline-offset: 2px; }

/* Pricing plan remove icon */
.plan-item { position: relative; border: 1px dashed #dbeafe; border-radius: 12px; background: #fff; box-shadow: 0 4px 14px rgba(0,104,169,.08); }
.icon-remove-plan {
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0; background: transparent; color: #ef4444;
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
}
.icon-remove-plan:hover { background: #fee2e2; color: #dc2626; }
.icon-remove-plan:focus-visible { outline: 2px solid #fecaca; outline-offset: 2px; }
.jointe {
    width: 100%;
position: relative;
box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
border-radius: 15px;
background-color: #fff;
border: 2px dashed #0093ee;
box-sizing: border-box;
height: 240px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 46px 0px;
text-align: center;
font-size: 16px;
color: #005183;
font-family: Poppins;
}
.jointe label {
    cursor: pointer;
}
.modal-title {
    width: 509px;
    position: relative;
    font-size: 31px;
    line-height: 37.2px;
    display: flex;
    font-family: Poppins;
    font-weight: bold;
    color: #0093ee;
    text-align: left;
    align-items: center;
    height: 37px;

}
.form-label {
    color: #005183;
    font-weight: 500;
}
.span {
  color: #ff6600;
}
.informations-gnrales {
  width: 418px;
  position: relative;
  font-size: 31px;
  line-height: 37.2px;
  display: flex;
  font-family: Poppins;
  color: #0093ee;
  text-align: left;
  align-items: center;
  height: 37px;
}
.reprsente-un-champ {
  width: 288px;
  position: relative;
  font-size: 16px;
  line-height: 19.2px;
  font-family: Poppins;
  color: #ff6600;
  text-align: left;
  display: flex;
  align-items: center;
  height: 37px;
}

.toast-container {
    z-index: 1100;
}
.checkbox-option {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  cursor: pointer;
}
.checkbox-box {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #fff;
  border: 2px solid #007ad4;
  box-shadow: 0px 4px 18px 0px #0093ee0d;
  transition: background .15s ease, border-color .15s ease;
}
.checkbox-box.active {
  background: #007ad4;
  border-color: #007ad4;
}
.checkbox-option:hover .checkbox-box {
  border-color: #005183;
}
.checkbox-option:focus-visible .checkbox-box {
  outline: 3px solid #cfe9fb;
  outline-offset: 2px;
}
.checkbox-label {
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  font-family: Poppins;
  color: #005183;
}
.video-label-custom {
  color: #005183;
  font-weight: 500;
  font-size: 18px;
  font-family: Poppins;
  margin-bottom: 6px;
  margin-top: 10px;
}
.input-custom {
  width: 100%;
  position: relative;
  box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
  border-radius: 15px;
  background-color: #fff;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 17px 20px;
  box-sizing: border-box;
  text-align: left;
  font-size: 16px;
  color: #9f9f9f;
  font-family: Poppins;
  border: none;
  outline: none;
}

.textarea-custom {
  width: 100%;
  position: relative;
  box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
  border-radius: 15px;
  background-color: #fff;
  height: 167px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 17px 20px;
  box-sizing: border-box;
  text-align: left;
  font-size: 16px;
  color: #9f9f9f;
  font-family: Poppins;
  border: none;
  outline: none;
  resize: vertical;
}

.select-custom {
  width: 100%;
  position: relative;
  box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
  border-radius: 15px;
  background-color: #fff;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 17px 20px;
  box-sizing: border-box;
  text-align: left;
  font-size: 16px;
  color: #9f9f9f;
  font-family: Poppins;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10L12 15L17 10" stroke="%239f9f9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 24px 24px;
}

.select-custom:focus, .input-custom:focus, .textarea-custom:focus {
  box-shadow: 0 0 0 2px #cfe9fb, 10px 8px 20px rgba(0, 81, 131, 0.25);
  outline: none;
}


.toast {
    min-width: 300px;
}
.toast-header {
    color: white;
}
.toast-header .btn-close {
    margin-right: -0.375rem;
}

/* Responsive Design - Mobile and Tablet */
@media (max-width: 1024px) {
  .stepper-container {
    padding: 0 15px;
  }
  
  .modal-title, .informations-gnrales {
    font-size: 24px;
    line-height: 28px;
    width: auto;
    max-width: 100%;
  }
  
  .reprsente-un-champ {
    font-size: 14px;
    width: auto;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  /* Stack stepper horizontally on mobile */
  .stepper {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 30px;
  }
  
  .step {
    flex-direction: column;
    align-items: center;
    min-width: 80px;
    margin: 0;
  }
  
  .step-circle {
    margin-bottom: 8px;
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .step-label {
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
  }
  
  .step-line {
    display: none; /* Hide connecting lines on mobile */
  }
  
  /* Form adjustments */
  .modal-title, .informations-gnrales {
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .reprsente-un-champ {
    font-size: 13px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Form inputs responsive */
  .input-custom, .textarea-custom, .select-custom {
    padding: 15px 16px;
    font-size: 15px;
    box-shadow: 5px 4px 15px rgba(0, 81, 131, 0.2);
  }
  
  .input-custom {
    height: 60px;
  }
  
  .textarea-custom {
    height: 140px;
  }
  
  /* File upload area */
  .jointe {
    height: 180px;
    padding: 30px 15px;
    font-size: 14px;
    box-shadow: 5px 4px 15px rgba(0, 81, 131, 0.2);
  }
  
  /* Form labels */
  .form-label, .video-label-custom {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  /* Checkbox options */
  .checkbox-option {
    margin-bottom: 12px;
  }
  
  .checkbox-label {
    font-size: 16px;
  }
  
  /* Feature and plan items */
  .feature-item, .plan-item {
    margin-bottom: 15px;
  }
  
  .plan-card {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  /* Remove icons adjustment */
  .icon-remove, .icon-remove-plan {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  /* Very small screens */
  .stepper-container {
    padding: 0 10px;
  }
  
  .stepper {
    gap: 6px;
  }
  
  .step {
    min-width: 70px;
  }
  
  .step-circle {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .step-label {
    font-size: 11px;
    max-width: 70px;
  }
  
  .modal-title, .informations-gnrales {
    font-size: 18px;
    line-height: 22px;
  }
  
  .input-custom, .select-custom {
    height: 55px;
    padding: 12px 14px;
    font-size: 14px;
  }
  
  .textarea-custom {
    height: 120px;
    padding: 12px 14px;
    font-size: 14px;
  }
  
  .jointe {
    height: 160px;
    padding: 25px 10px;
    font-size: 13px;
  }
  
  .form-label, .video-label-custom {
    font-size: 15px;
  }
  
  .checkbox-label {
    font-size: 15px;
  }
  
  .plan-card {
    padding: 12px;
  }
}
</style>