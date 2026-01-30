<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios'

const submitForm = async () => {
  try {
    const formData = new FormData();

    formData.append('adresse', form.adresse || '');
    formData.append('NameCo_fondateur', form.fondateur || '');
    formData.append('domain_name', form.domaine || '');
    formData.append('email', form.email || '');
    formData.append('name', form.nom || '');
    formData.append('phone_number', form.phone || '');

    if (form.image instanceof File) {
      formData.append('logo_startup', form.image);
    }

    const response = await axios.post('/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Profil mis à jour avec succès');
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la mise à jour du profil');
  }
};

const props = defineProps({
  user: Object,
  mustVerifyEmail: Boolean,
  status: String,
  role: String,
});
const form = reactive({
  nom: props.user?.name || '',
  prenom: props.user?.surname || '',
  email: props.user?.email || '',
  phone: props.user?.phone_number || '',
  domaine: props.user?.domain_name || '',
  adresse: props.user?.startup?.adresse || '',
  fondateur:props.user?.startup?.NameCo_fondateur || '',
  image: null, // pour le fichier logo

});
const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
  }
};

const avatarPreview = ref(props.user.coach?.profile_image
  ? `/storage/${props.user.coach.profile_image}`
  : '/assets/img/profile/default-avatar.jpg');

const coverPreview = ref(props.user.coach?.cover_image
  ? `/storage/${props.user.coach.cover_image}`
  : '/assets/img/profile/banner.jpg');


const showModal = ref(false)
</script>

<style scoped>
input::placeholder {
  color: #999;
}
</style>
<template>
  <div class="bg-[#eaf6ff] min-h-screen py-10 px-4" style="
    margin-left: -10px;
    margin-right: 0px;
">
    <!-- Couverture -->
    <div class="w-full h-64" style="height: 208px;">
      <img :src="coverPreview" class="w-full h-full object-cover" alt="banner" />
      <button @click="$refs.coverInput.click()"
        class="absolute top-4 right-6 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
        title="Modifier la bannière">
        <!-- Icône crayon SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#003366]" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536M5 19h2l9.536-9.536" />
        </svg>

      </button>
    </div>

    <!-- Profil -->
    <div class="max-w-6xl mx-auto flex justify-between items-start px-6 py-6 bg-[#eaf6ff]">
      <!-- Avatar + Infos -->
      <div class="flex items-center space-x-6" style="margin-top: -73px;">
        <img :src="avatarPreview" class="w-[174px] h-[169px] rounded-xl   shadow object-cover" alt="avatar"
          style="height: 177px; width: 171px;" />
        <div style="
    margin-left: 17px;" @click="showModal = true">
          <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div class="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-xl">
              <!-- Bouton fermer -->
              <button @click="showModal = false"
                class="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold">
                &times;
              </button>

              <!-- Image agrandie -->
              <img :src="avatarPreview" alt="image agrandie" class="w-full max-h-[80vh] object-contain" />
            </div>
          </div>

          <h2 class="text-2xl font-bold text-[#003366]">{{ user.name }}</h2>
          <b class="text-sm text-gray-700 flex items-center">
            {{ user.specialty }}

          </b>
          <p class="text-sm text-gray-700 flex items-center">
            500 points
            <img src="/assets/img/profile/badge.png" alt="badge" class="ml-2 w-6 h-6" />
            <img src="/assets/img/profile/badge.png" alt="badge" class="ml-2 w-6 h-6" />
            <img src="/assets/img/profile/badge.png" alt="badge" class="ml-2 w-6 h-6" />

          </p>


        </div>
      </div>

      <!-- Boutons -->
      <div class="space-x-2 mt-6">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" style="background-color:#0093ee;margin-right: 27px;font-size: 16px;
color: #fff;
font-family: Poppins;">Modifier</button>
        <button class="border border-blue-500 text-blue-500 px-4 py-2 rounded  hover:text-white" style="border: 1px solid #0093ee;font-size: 16px;
color: #0093ee;
font-family: Poppins;
box-sizing: border-box;">Supprimer</button>
      </div>
    </div>
    <b style="
    margin-left: 56px;
">----------------------------------------------------</b>
    <!-- Formulaire -->
    <div class="max-w-5xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
      <h3 class="text-lg font-bold text-[#003366] mb-4">Modifier Profile</h3>
      <form @submit.prevent="submitForm" class="bg-[#eaf6ff] p-6 rounded-xl space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Nom et Prénom </label>
            <input    v-model="form.nom"
class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Nom du Co-Fondateur <span style="color: brown;">*</span></label>
            <input    v-model="form.fondateur"
class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Email</label>
            <input v-model="form.email" class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Numéro</label>
            <input  v-model="form.phone"class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Adresse <span style="color: brown;">*</span></label>
            <input  v-model="form.adresse" class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Domaine</label>
            <input  v-model="form.domaine"class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>
        </div>

<div>
  <!-- Label aligné à gauche -->
  <label class="block font-semibold mb-1 text-[#003366] text-left">
    Logo Startup <span style="color: brown;">*</span>
  </label>
     <div class="text-center">
    <div class="flex justify-center my-2">
          <label class="image-upload cursor-pointer" for="agent-image">

      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="53" viewBox="0 0 71 53" fill="none">

                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M20.917 11.6665C18.5963 11.6665 16.3708 12.5884 14.7298 14.2293C13.0889 15.8703 12.167 18.0959 12.167 20.4165C12.167 22.7371 13.0889 24.9627 14.7298 26.6037C16.3708 28.2446 18.5963 29.1665 20.917 29.1665C23.2376 29.1665 25.4632 28.2446 27.1042 26.6037C28.7451 24.9627 29.667 22.7371 29.667 20.4165C29.667 18.0959 28.7451 15.8703 27.1042 14.2293C25.4632 12.5884 23.2376 11.6665 20.917 11.6665ZM18.0003 20.4165C18.0003 19.643 18.3076 18.9011 18.8546 18.3541C19.4016 17.8071 20.1434 17.4998 20.917 17.4998C21.6905 17.4998 22.4324 17.8071 22.9794 18.3541C23.5264 18.9011 23.8337 19.643 23.8337 20.4165C23.8337 21.1901 23.5264 21.9319 22.9794 22.4789C22.4324 23.0259 21.6905 23.3332 20.917 23.3332C20.1434 23.3332 19.4016 23.0259 18.8546 22.4789C18.3076 21.9319 18.0003 21.1901 18.0003 20.4165Z"
                  fill="#0068A9" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.25 0C6.92936 0 4.70376 0.921873 3.06282 2.56282C1.42187 4.20376 0.5 6.42936 0.5 8.75L0.5 43.75C0.5 46.0706 1.42187 48.2962 3.06282 49.9372C4.70376 51.5781 6.92936 52.5 9.25 52.5H61.75C64.0706 52.5 66.2962 51.5781 67.9372 49.9372C69.5781 48.2962 70.5 46.0706 70.5 43.75V8.75C70.5 6.42936 69.5781 4.20376 67.9372 2.56282C66.2962 0.921873 64.0706 0 61.75 0H9.25ZM61.75 5.83333H9.25C8.47645 5.83333 7.73459 6.14062 7.18761 6.68761C6.64062 7.23459 6.33333 7.97645 6.33333 8.75V43.75C6.33333 44.5235 6.64062 45.2654 7.18761 45.8124C7.73459 46.3594 8.47645 46.6667 9.25 46.6667H21.8325L41.8933 26.6029C42.7059 25.7902 43.6705 25.1456 44.7322 24.7058C45.7939 24.266 46.9319 24.0396 48.081 24.0396C49.2302 24.0396 50.3682 24.266 51.4299 24.7058C52.4916 25.1456 53.4562 25.7902 54.2687 26.6029L64.6667 37.0008V8.75C64.6667 7.97645 64.3594 7.23459 63.8124 6.68761C63.2654 6.14062 62.5235 5.83333 61.75 5.83333ZM61.75 46.6667H30.0808L46.0204 30.73C46.5674 30.1832 47.3091 29.876 48.0825 29.876C48.8559 29.876 49.5976 30.1832 50.1446 30.73L64.3954 44.9808C64.1609 45.4847 63.7873 45.911 63.3186 46.2097C62.85 46.5083 62.3057 46.6669 61.75 46.6667Z"
                  fill="#0068A9" />
              </svg>    </label>
</div>

    <p class="text-sm text-gray-700">
      Cliquez pour sélectionner une image<br />
      <span>(JPG, PNG, max 5MB)</span>
    </p>

    <!-- Champ fichier masqué + déclencheur -->
    <input id="agent-image" type="file" accept="image/*" @change="handleLogoUpload" class="hidden" style="
    border-radius: 15px;
    background: var(--Color, #FFF);
    box-shadow: 10px 8px 20px 0px rgba(0, 81, 131, 0.25);"/>
    <div v-if="form.image" class="mt-2 text-sm text-gray-600">📎 {{ form.image.name }}</div>
  </div>
</div>

        <div class="text-right">
          <button  type="submit"class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>


</template>

