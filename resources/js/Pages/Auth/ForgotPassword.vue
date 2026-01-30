<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3'
import fullwidth from '@/Layouts/fullwidth.vue'
import InputError from '@/Components/InputError.vue'
import TextInput from '@/Components/TextInput.vue'

defineProps({
  status: {
    type: String,
  },
})

const form = useForm({
  email: '',
})

const submit = () => {
  form.post(route('password.email'))
}
</script>

<template>
  <fullwidth>
    <Head title="Mot de passe oublié" />

    <div class="w-full md:w-8/12 lg:w-8/12 flex justify-center items-center right h-screen p-5">
      <div class="card cardLogin my-5">
        <!-- Onglets Connexion / Inscription -->
        <div class="card-header p-4 sm:p-5 md:p-6 lg:p-8">
          <Link :href="route('login')" :class="{ 'active': $page.url.startsWith('/login'), 'mr-8': true }">
            Connexion
          </Link>
          <Link :href="route('register')" :class="{ 'active': $page.url.startsWith('/register') }">
            Inscription
          </Link>
        </div>

        <!-- Corps -->
        <div class="card-body p-4 sm:p-5 md:p-6 lg:p-8">
          <!-- Messages -->
          <transition name="slide">
            <div
              v-if="status"
              class="mb-6 rounded-lg bg-green-100 p-4 text-sm font-medium text-green-600 flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ status }}
            </div>
          </transition>

          <!-- Formulaire -->
          <form @submit.prevent="submit" class="space-y-6">
            <div class="form-group mb-4">
              <label for="email" class="form-label">
                Adresse email <span class="text-secondary">*</span>
              </label>
              <TextInput
                id="email"
                type="email"
                class="form-control mt-0"
                v-model="form.email"
                required
                autofocus
                autocomplete="username"
                placeholder="Exemple@gmail.com"
              />
              <InputError class="mt-1 text-red-500" :message="form.errors.email" />
            </div>

            <button
              type="submit"
              class="w-full btn btn-primary"
              :class="{ 'opacity-75 cursor-not-allowed': form.processing }"
              :disabled="form.processing"
            >
              <svg
                v-if="form.processing"
                class="h-5 w-5 animate-spin text-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v4m0 8v4m8-8h-4m-8 0H4m15.656-7.071l-2.828 2.829M6.343 6.343l2.829 2.829M15.657 15.657l2.828 2.829M6.343 17.657l2.829-2.829"
                />
              </svg>
              {{ form.processing ? "Envoi en cours..." : "Envoyer le lien de réinitialisation" }}
            </button>

            <!-- Liens -->
            <div class="text-center mt-4">
              <p>
                <Link :href="route('login')" class="text-blue-600 underline">Retour à la connexion</Link>
              </p>
              <p class="mt-2">
                Vous n'avez pas de compte ?
                <Link :href="route('register')" class="text-blue-600 underline">Créer un compte</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </fullwidth>
</template>

<style>
/* Animations cohérentes avec Login */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.cardLogin {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 81, 131, 0.2);
  width: 100%;
  max-width: 550px;
}

.card-header {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #e5e7eb;
}
.card-header a {
  font-weight: 600;
  padding-bottom: 4px;
  transition: color 0.3s;
}
.card-header a.active {
  color: #0072b6;
  border-bottom: 2px solid #0072b6;
}

.btn-primary {
  background-color: #0089db;
  color: white;
  font-weight: 500;
  border-radius: 8px;
  padding: 12px;
}
.btn-primary:hover {
  background-color: #0076c7;
}
</style>
