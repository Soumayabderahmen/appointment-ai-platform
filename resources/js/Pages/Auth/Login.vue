<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import fullwidth from '@/Layouts/fullwidth.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import Checkbox from '@/Components/Checkbox.vue';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <fullwidth> <!-- 👈 ici aussi -->

         <Head title="Connexion" />
        <div class="w-full md:w-8/12 lg:w-8/12 p-5 flex justify-center items-center right py-4">
            <div class="card cardLogin my-5">
                <div class="card-header p-4 sm:p-5 md:p-6 lg:p-8">
                    <a :href="route('login')" :class="{
                        'active': $page.url.startsWith('/login'),
                        'mr-8': true
                    }">
                        Connexion
                    </a>

                    <a :href="route('register')" :class="{
                        'active': $page.url.startsWith('/register')
                    }">
                        Inscription
                    </a>
                </div>

                <div class="card-body p-4 sm:p-5 md:p-6 lg:p-8">
                    <!-- Affichage du message flash (s'il existe) -->
                    <transition name="slide">
                        <div v-if="message"
                            class="mb-6 rounded-lg bg-green-100 p-4 text-sm font-medium text-green-600 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ message }}
                        </div>
                    </transition>

                    <!-- Affichage du statut si présent -->
                    <transition name="slide">
                        <div v-if="status"
                            class="mb-6 rounded-lg bg-green-100 p-4 text-sm font-medium text-green-600 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ status }}
                        </div>
                    </transition>

                    <!-- Formulaire de connexion -->
                    <form @submit.prevent="submit" class="space-y-6">
                        <div class="form-group mb-4">
                            <label for="" class="form-label">Adresse email <span class="text-secondary">*</span></label>
                            <TextInput id="email" type="email" class="form-control mt-0" v-model="form.email" required
                                autofocus autocomplete="username" placeholder="Exemple@gmail.com" />
                            <InputError class="mt-1 text-red-500" :message="form.errors.email" />
                        </div>
                        <div class="form-group mb-4">
                            <label for="" class="form-label">Mot de passe <span class="text-secondary">*</span></label>
                            <TextInput id="password" type="password" class="form-control mt-0" v-model="form.password"
                                required autocomplete="current-password" placeholder="Entrer une adresse email" />
                            <InputError class="mt-1 text-red-500" :message="form.errors.password" />
                            <div class="flex justify-between mt-4">
                                <div class="form-check">
                                    <Checkbox name="remember" v-model:checked="form.remember"
                                        class="form-check-input" />
                                    <label for="" class="form-check-label">Se souvenir de moi</label>
                                </div>
                                <a v-if="canResetPassword" :href="route('password.request')">
                                    Mot de passe oublié?
                                </a>
                            </div>
                        </div>
                        <button type="submit" class="w-full btn btn-primary"
                            :class="{ 'opacity-75 cursor-not-allowed': form.processing }" :disabled="form.processing">
                            <svg v-if="form.processing" class="h-5 w-5 animate-spin text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v4m0 8v4m8-8h-4m-8 0H4m15.656-7.071l-2.828 2.829M6.343 6.343l2.829 2.829M15.657 15.657l2.828 2.829M6.343 17.657l2.829-2.829" />
                            </svg>
                            {{ form.processing ? "Connexion en cours..." : "Se connecter" }}
                        </button>
                        <div>
                            <p>
                                Vous n'avez pas de compte?
                                <a :href="route('register')">
                                    Créer un compte
                                </a>
                            </p>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    </fullwidth> 
</template>
<style>
/* Vue transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>