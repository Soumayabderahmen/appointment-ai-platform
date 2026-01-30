<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import fullwidth from '@/Layouts/fullwidth.vue';

const roleSelected = ref(false);
const selectedRole = ref('startup');

// sous-étapes spécifiques au rôle coach
const coachStep = ref(1); // 1 ou 2

const form = useForm({
  // communs
  role: 'startup',
  statut: 'active',
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone_number: '',

  // startup
  domain_name: '',

  // coach
  specialty: '',
  description: '',
  document: null, // pdf

  // investisseur
  visibility: 'public',
  image: null, // file image
});

const roleOptions = [
  { value: 'startup', label: 'Entreprise', description: "Compte professionnel ou entrepreneurial", icon: '/assets/img1/dep.png' },
  { value: 'coach', label: 'Coach', description: "Mentorat, accompagnement & expertise", icon: '/assets/img1/notebook.png' },
  { value: 'investisseur', label: 'Investisseur', description: "Investissement & accompagnement capital", icon: '/assets/img1/L-Academic.png' },
];

const selectRole = (role) => {
  selectedRole.value = role;
  form.role = role;
  form.statut = role === 'coach' ? 'inactive' : 'active';
  roleSelected.value = true;
  if (role !== 'coach') form.document = null;
  if (role !== 'investisseur') { form.visibility = 'public'; form.image = null; }
  if (role !== 'startup') form.domain_name = '';
  // reset sous-étape coach
  if (role === 'coach') coachStep.value = 1;
};

const resetRole = () => { roleSelected.value = false; };

watch(() => form.role, (newRole) => {
  form.statut = newRole === 'coach' ? 'inactive' : 'active';
  if (newRole === 'coach') coachStep.value = 1;
});

// fichiers
const handleDocumentChange = (e) => { form.document = e.target.files?.[0] ?? null; };
const handleImageChange = (e) => { form.image = e.target.files?.[0] ?? null; };

// dropzone (drag&drop)
const isDragOver = ref(false);
const onDropCV = (e) => {
  e.preventDefault();
  isDragOver.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file && file.type === 'application/pdf') form.document = file;
};
const onDragOver = (e) => { e.preventDefault(); isDragOver.value = true; };
const onDragLeave = () => { isDragOver.value = false; };

// computed pour label/for du champ “Nom …”
const nameId = computed(() =>
  form.role === 'startup' ? 'startup_name' : form.role === 'coach' ? 'coach_name' : 'investor_name'
);
const nameLabel = computed(() =>
  form.role === 'startup' ? 'Nom de Startup' : form.role === 'coach' ? 'Nom du Coach' : "Nom de l'Investisseur"
);

// validation étape 1 (coach)
const canGoCoachStep2 = computed(() => {
  const ok =
    form.name?.trim() &&
    form.email?.trim() &&
    form.phone_number?.trim() &&
    form.password?.length >= 8 &&
    form.password === form.password_confirmation;
  return !!ok;
});

const goNextCoach = () => {
  if (canGoCoachStep2.value) coachStep.value = 2;
};
const goPrevCoach = () => { coachStep.value = 1; };

const submit = () => {
  if (form.role !== 'coach') form.document = null;

  form.post(route('register'), {
    forceFormData: true,
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>

<template>
  <fullwidth>
    <Head title="Inscription" />

    <div class="w-full md:w-8/12 lg:w-8/12 p-5 flex justify-center right py-4">
      <div class="card cardLogin my-5">
        <div class="card-header p-4 sm:p-5 md:p-6 lg:p-8">
          <a :href="route('login')" :class="{ 'active': $page.url.startsWith('/login'), 'mr-8': true }">Connexion</a>
          <a :href="route('register')" :class="{ 'active': $page.url.startsWith('/register') }">Inscription</a>
        </div>

        <div class="card-body p-4 sm:p-5 md:p-6 lg:p-8">
          <!-- Étape 1 : sélection de rôle (identique) -->
          <div v-if="!roleSelected">
            <h2 class="mb-8 text-xl font-semibold">Choisissez votre type de compte</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div
                v-for="role in roleOptions"
                :key="role.value"
                @click="selectRole(role.value)"
                class="box text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer p-6 border rounded-xl"
              >
                <div class="flex justify-center mb-4">
                  <img :src="role.icon" alt="" class="h-16 w-16" />
                </div>
                <h3 class="text-lg font-semibold mb-2">{{ role.label }}</h3>
                <p class="text-gray-500 text-sm">{{ role.description }}</p>
              </div>
            </div>
          </div>

          <!-- Étape 2 : formulaire -->
          <div v-else>
            <!-- Retour -->
            <a class="mb-6 cursor-pointer text-blue-600 flex items-center" @click="resetRole">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour à la sélection du type de compte</span>
            </a>

            <form @submit.prevent="submit" class="space-y-6" enctype="multipart/form-data">
              <!-- STARTUP & INVESTISSEUR : formulaire normal -->
              <template v-if="form.role !== 'coach'">
                <!-- Bandeau rôle -->
                <div class="p-3 rounded-lg bg-slate-50 border text-sm">
                  <span class="font-semibold">Rôle :</span>
                  <span class="ml-2 capitalize">{{ form.role }}</span>
                </div>

                <!-- Nom -->
                <div class="form-group mb-4">
                  <label class="form-label" :for="nameId">{{ nameLabel }} <span class="text-secondary">*</span></label>
                  <TextInput :id="nameId" type="text" class="form-control mt-0" v-model="form.name" required />
                  <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <!-- Email -->
                <div class="form-group mb-4">
                  <label class="form-label">Adresse email <span class="text-secondary">*</span></label>
                  <TextInput id="email" type="email" class="form-control mt-0" v-model="form.email" required />
                  <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <!-- Téléphone -->
                <div class="form-group mb-4">
                  <label class="form-label">Numéro de téléphone <span class="text-secondary">*</span></label>
                  <TextInput id="phone_number" type="tel" class="form-control mt-0" v-model="form.phone_number" required />
                  <InputError class="mt-2" :message="form.errors.phone_number" />
                </div>

                <!-- INVESTISSEUR -->
                <div v-if="form.role === 'investisseur'">
                  <div class="form-group mb-4">
                    <label class="form-label">Visibilité <span class="text-secondary">*</span></label>
                    <select v-model="form.visibility" class="form-control mt-0">
                      <option value="public">Public</option>
                      <option value="private">Privée</option>
                    </select>
                    <InputError class="mt-2" :message="form.errors.visibility" />
                  </div>
                  <div class="form-group mb-4">
                    <label class="form-label">Image (logo/avatar)</label>
                    <input type="file" id="image" accept="image/*" @change="handleImageChange" class="block w-full" />
                    <small>PNG/JPG (5MB max)</small>
                    <InputError class="mt-2" :message="form.errors.image" />
                  </div>
                </div>

                <!-- STARTUP -->
                <div v-if="form.role === 'startup'">
                  <div class="form-group mb-4">
                    <label class="form-label">Nom de Domaine</label>
                    <TextInput id="domain_name" type="text" class="form-control mt-0" v-model="form.domain_name" placeholder="ex: prendstapart.com" />
                    <InputError class="mt-2" :message="form.errors.domain_name" />
                  </div>
                </div>

                <!-- MDP -->
                <div class="form-group mb-4">
                  <label class="form-label">Mot de passe <span class="text-secondary">*</span></label>
                  <TextInput id="password" type="password" class="form-control mt-0" v-model="form.password" required />
                  <InputError class="mt-2" :message="form.errors.password" />
                </div>
                <div class="form-group mb-4">
                  <label class="form-label">Confirmation du mot de passe <span class="text-secondary">*</span></label>
                  <TextInput id="password_confirmation" type="password" class="form-control mt-0" v-model="form.password_confirmation" required />
                  <InputError class="mt-2" :message="form.errors.password_confirmation" />
                </div>

                <button type="submit" class="btn btn-primary w-full">
                  {{ form.processing ? 'Inscription en cours...' : 'Créer mon compte' }}
                </button>
                <p class="text-center mt-2">
                  Vous avez déjà un compte? <a :href="route('login')" class="text-blue-600 hover:underline">Se connecter</a>
                </p>
              </template>

              <!-- COACH : 2 ÉTAPES (comme la figure) -->
              <template v-else>
                <!-- Pastilles étapes -->
                <div class="flex items-center justify-center mb-4">
                  <div class="flex items-center gap-6">
                    <div :class="['h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold border', coachStep===1 ? 'bg-white text-blue-600 border-blue-400 shadow-sm' : 'bg-blue-500 text-white border-blue-500']">
                      1
                    </div>
                    <div class="h-0.5 w-16 bg-blue-200"></div>
                    <div :class="['h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold border', coachStep===2 ? 'bg-white text-blue-600 border-blue-400 shadow-sm' : 'bg-blue-100 text-blue-600 border-blue-200']">
                      2
                    </div>
                  </div>
                </div>

                <!-- Étape 1 : infos de base -->
                <div v-if="coachStep === 1" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group">
                      <label class="form-label">Nom du Coach <span class="text-secondary">*</span></label>
                      <TextInput id="coach_name" type="text" class="form-control mt-0" v-model="form.name" required placeholder="Entrez votre nom" />
                      <InputError class="mt-2" :message="form.errors.name" />
                    </div>
                    <div></div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Adresse email <span class="text-secondary">*</span></label>
                    <TextInput id="email" type="email" class="form-control mt-0" v-model="form.email" required placeholder="ex: you@mail.com" />
                    <InputError class="mt-2" :message="form.errors.email" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Numéro de téléphone <span class="text-secondary">*</span></label>
                    <TextInput id="phone_number" type="tel" class="form-control mt-0" v-model="form.phone_number" required placeholder="+216 20 000 000" />
                    <InputError class="mt-2" :message="form.errors.phone_number" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Mot de passe <span class="text-secondary">*</span></label>
                    <TextInput id="password" type="password" class="form-control mt-0" v-model="form.password" required placeholder="Mot de passe" />
                    <InputError class="mt-2" :message="form.errors.password" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Confirmation du mot de passe <span class="text-secondary">*</span></label>
                    <TextInput id="password_confirmation" type="password" class="form-control mt-0" v-model="form.password_confirmation" required placeholder="Confirmation" />
                    <InputError class="mt-2" :message="form.errors.password_confirmation" />
                  </div>

                  <button type="button" class="btn btn-primary w-full" :disabled="!canGoCoachStep2" @click="goNextCoach">
                    Suivant
                  </button>
                  <p class="text-center mt-2">
                    Vous avez déjà un compte? <a :href="route('login')" class="text-blue-600 hover:underline">Se connecter</a>
                  </p>
                </div>

                <!-- Étape 2 : spécialité + CV (dropzone) -->
                <div v-else class="space-y-4">
                  <div class="form-group">
                    <label class="form-label">Spécialité <span class="text-secondary">*</span></label>
                    <TextInput id="specialty" type="text" class="form-control mt-0" v-model="form.specialty" required placeholder="Ex: développeur, growth, finance…" />
                    <InputError class="mt-2" :message="form.errors.specialty" />
                  </div>

                  <!-- <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea v-model="form.description" class="form-control mt-0" rows="4" placeholder="Parlez-nous de votre expertise"></textarea>
                    <InputError class="mt-2" :message="form.errors.description" />
                  </div> -->

                  <div class="form-group">
                    <label class="form-label">Votre CV <span class="text-secondary">*</span></label>

                    <!-- Dropzone -->
                    <div
                      class="jointe border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6"
                      :class="isDragOver ? 'border-blue-400 bg-blue-50' : 'border-blue-200'"
                      @dragover="onDragOver"
                      @dragleave="onDragLeave"
                      @drop="onDropCV"
                      style="min-height: 200px !important;"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="54" viewBox="0 0 42 54" fill="none">
                        <path
                          d="M41 33V26C41 21.0294 36.9706 17 32 17H28C26.3431 17 25 15.6569 25 14V10C25 5.02944 20.9706 1 16 1H11M11 35H31M11 43H21M17 1H4C2.34315 1 1 2.34314 1 4V50C1 51.6569 2.34315 53 4 53H38C39.6569 53 41 51.6569 41 50V25C41 11.7452 30.2548 1 17 1Z"
                          stroke="#0098F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        />
                      </svg>

                      <input type="file" id="cv_input" accept=".pdf" @change="handleDocumentChange" class="hidden" />
                      <label for="cv_input" class="mt-3 font-medium text-blue-600 cursor-pointer">
                        Glisser-déposer votre CV ici
                      </label>
                      <small class="text-gray-500">Formats acceptés: PDF (5MB max)</small>

                      <div v-if="form.document" class="mt-3 text-sm">
                        Fichier sélectionné : <span class="font-medium">{{ form.document.name }}</span>
                      </div>
                    </div>

                    <InputError class="mt-2" :message="form.errors.document" />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <button type="button" class="btn w-full border" @click="goPrevCoach">Retour</button>
                    <button type="submit" class="btn btn-primary w-full">
                      {{ form.processing ? "Inscription en cours..." : "S'inscrire" }}
                    </button>
                  </div>
                  <p class="text-center mt-2">
                    Vous avez déjà un compte? <a :href="route('login')" class="text-blue-600 hover:underline">Se connecter</a>
                  </p>
                </div>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </fullwidth>
</template>

<style scoped>
/* transitions comme ton design initial (si tu ajoutes <Transition>) */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-20px); }

/* labels bleu */
:deep(.form-label) { color: #005183 !important; }

/* focus */
input:focus, textarea:focus, select:focus {
  outline: none; border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,.3);
}

/* dropzone */
.jointe { background: white; }
</style>
