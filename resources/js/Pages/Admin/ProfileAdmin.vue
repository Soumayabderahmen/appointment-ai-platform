<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

const props = defineProps({
  user: Object,
  mustVerifyEmail: Boolean,
  status: String,
  role: String,
});

const localAdmin = ref(structuredClone(props.user));

const form = reactive({
  nom: props.user?.name || '',
  email: props.user?.email || '',
  phone: props.user?.phone_number || '',
  adresse: props.user?.admin?.adresse || '',
  profile_image:  null,
  cover_image: null,
});

const errors = reactive({
  nom: '',
  email: '',
  phone: '',
});

const validateForm = () => {
  let valid = true;
  errors.nom = '';
  errors.email = '';
  errors.phone = '';

  const nameRegex = /^([A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ][a-zàâäéèêëîïôöùûüÿç']+)(\s[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ][a-zàâäéèêëîïôöùûüÿç']+)*$/;
  if (!nameRegex.test(form.nom.trim())) {
    errors.nom = 'Chaque mot du nom doit commencer par une majuscule.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    errors.email = 'Adresse email invalide (doit contenir "@" et être bien formatée).';
    valid = false;
  }

  const phoneClean = form.phone.replace(/\s+/g, '');
  const phoneRegex = /^\+?[0-9]{8,12}$/;
  if (!phoneRegex.test(phoneClean)) {
    errors.phone = 'Le numéro doit contenir entre 8 et 12 chiffres (avec "+" optionnel).';
    valid = false;
  }

  return valid;
};

const avatarPreview = ref(
  props.user.admin?.profile_image ? `/storage/${props.user.admin?.profile_image}` : '/assets/img/profile/default-avatar.jpg'
);
const coverPreview = ref(
  props.user.admin?.cover_image ? `/storage/${props.user.admin.cover_image}` : '/assets/img/profile/banner.jpg'
);

const handleProfileUpload = (event) => {
  const file = event.target.files[0];
  form.profile_image = file;
  if (file) {
    avatarPreview.value = URL.createObjectURL(file);
  }
};

const handleCoverUpload = (event) => {
  const file = event.target.files[0];
  form.cover_image = file;
  if (file) {
    coverPreview.value = URL.createObjectURL(file);
  }
};

const showModal = ref(false);

const submitForm = async () => {
  if (!validateForm()) {
    toast.error('Veuillez corriger les erreurs dans le formulaire.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('adresse', form.adresse || '');
    formData.append('email', form.email || '');
    formData.append('name', form.nom || '');
    formData.append('phone_number', form.phone || '');

  if (form.profile_image instanceof File) {
  formData.append('profile_image', form.profile_image);
}

    if (form.cover_image instanceof File) {
      formData.append('cover_image', form.cover_image);
    }

    const response = await axios.post(`/api/admin/profile/${props.user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const updated = response.data.user;
    localAdmin.value = structuredClone(updated);

    form.nom = updated.name;
    form.email = updated.email;
    form.phone = updated.phone_number || '';
    form.adresse = updated.admin?.adresse || '';

    avatarPreview.value = updated.admin?.profile_image
      ? `/storage/${updated.admin.profile_image}`
      : '/assets/img/profile/default-avatar.jpg';

    coverPreview.value = updated.admin?.cover_image
      ? `/storage/${updated.admin.cover_image}`
      : '/assets/img/profile/banner.jpg';

    toast.success(response.data.message || 'Profil mis à jour avec succès');
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
  }
};
</script>


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

          <h1 class="text-2xl font-bold text-[#003366]">{{ localAdmin.name }} <strong  style="color:rgb(0, 147, 238); font-size:15px ; font-family:Poppins;"> ({{ localAdmin.role.charAt(0).toUpperCase() + localAdmin.role.slice(1).toLowerCase() }})</strong> </h1>
          <b class="text-sm text-gray-700 flex items-center">
            {{ localAdmin.admin?.adresse }}

          </b></br>
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
        <!-- <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" style="background-color:#0093ee;margin-right: 27px;font-size: 16px;
color: #fff;
font-family: Poppins;">Modifier</button> -->
        <button class="border border-blue-500 text-blue-500 px-4 py-2 rounded  hover:text-white" style="border: 1px solid #0093ee;font-size: 16px;
color: #0093ee;
font-family: Poppins;
box-sizing: border-box;">Supprimer</button>
      </div>
    </div>
    <!-- <b style="
    margin-left: 56px;
">----------------------------------------------------</b> -->
    <!-- Formulaire -->
    <div class="max-w-5xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
      <h3 class="text-lg font-bold text-[#003366] mb-4">Modifier Profile</h3>
      <form @submit.prevent="submitForm" class="bg-[#eaf6ff] p-6 rounded-xl space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Nom et Prénom <span style="color: brown;">*</span></label>
            <input    v-model="form.nom" class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
            <p v-if="errors.nom" class="text-red-600 text-sm mt-1">{{ errors.nom }}</p>

          </div>
          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Email <span style="color: brown;">*</span></label>
            <input v-model="form.email" class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>
        </div>
       
       


 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
            <label class="block font-semibold mb-1 text-[#003366]">Adresse </label>
            <input  v-model="form.adresse" class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-[#003366]">Numéro </label>
            <input  v-model="form.phone"class="w-full p-2 rounded border bg-white border-gray-300" placeholder="Écrire ici..." />
            <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>

          </div>
        </div>
        <div class="w-full">
    <label class="block font-semibold mb-1 text-[#003366]">Image de Profile</label>
  <label for="profile_image"
         class="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl py-8 px-4 hover:bg-blue-100 transition text-center">
    
    <!-- Icône image -->
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#0068A9" stroke-width="1.5" class="mb-3">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5V7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5z" />
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5l5.086-5.086a1.5 1.5 0 012.122 0L14.5 15l2.293-2.293a1 1 0 011.414 0L21 16.5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="#0068A9"/>
    </svg>

    <!-- Texte -->
    <p class="text-sm text-[#003366] font-semibold">
      Cliquez pour sélectionner une image<br />
      <span class="text-xs font-normal text-gray-600">(JPG, PNG, max 5MB)</span>
    </p>
  </label>

  <!-- input fichier masqué -->
   <input id="profile_image" type="file" name="profile_image"  class="hidden" @change="handleProfileUpload" 
/>
<div v-if="form.profile_image" class="mt-2 text-sm text-gray-600">
  📎 {{ form.profile_image.name }}
</div>


  
</div>
<!-- 📂 Upload zone stylisée -->
<div class="w-full">
    <label class="block font-semibold mb-1 text-[#003366]">Image de Couverture</label>
  <label for="cover_image"
         class="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl py-8 px-4 hover:bg-blue-100 transition text-center">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#0068A9" stroke-width="1.5" class="mb-3">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5V7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5z" />
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5l5.086-5.086a1.5 1.5 0 012.122 0L14.5 15l2.293-2.293a1 1 0 011.414 0L21 16.5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="#0068A9"/>
    </svg>

    <p class="text-sm text-[#003366] font-semibold">
      Cliquez pour sélectionner une image<br />
      <span class="text-xs font-normal text-gray-600">(JPG, PNG, max 5MB)</span>
    </p>
  </label>

  <input id="cover_image" type="file" name="cover_image"   
         class="hidden"
         @change="handleCoverUpload"  />

  <div v-if="form.cover_image" class="mt-2 text-sm text-gray-600">
    📎 {{ form.cover_image.name }}
  </div>
</div>

        <div class="text-right">
          <button  type="submit"class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>


</template>

<style scoped>
input::placeholder {
  color: #999;
}
.text-red-600 {
  color: #dc2626;
}
</style>