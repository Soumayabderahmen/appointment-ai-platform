<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

const props = defineProps({
  coach: Object,
  availability: Object,
  slots: Array,
  honoraire: Number,
  date: String,
  startup_id: Number,
});

const form = ref({
  coach: props.coach?.user?.name || '',
  availability_id: props.availability.id,
  startup_id: props.startup_id,
  message: '',
  selected_time: '',
  duration: 30,
  honoraire: props.honoraire,
  total: 0,
});

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const minutesToTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const filteredSlots = computed(() => {
  const duration = parseInt(form.value.duration);
  const times = props.slots;
  const result = [];

  for (let i = 0; i < times.length; i++) {
    const startMinutes = timeToMinutes(times[i]);
    const endTime = minutesToTime(startMinutes + duration);
    if (timeToMinutes(endTime) <= timeToMinutes(times[times.length - 1]) + 30) {
      result.push({
        start: times[i],
        end: endTime,
        label: `${times[i]} - ${endTime}`,
      });
    }
  }

  return result;
});

watch(() => form.value.duration, (newDuration) => {
  const horaire = parseFloat(form.value.honoraire);
  form.value.total = ((horaire * newDuration) / 60).toFixed(2);
});

const submitReservation = async () => {
  try {
    const response = await axios.post('/api/startup/reservation', form.value, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'application/json',
      },
    });

    toast.success("Réservation envoyée avec succès");

    // ✅ Redirection ici
    if (response.data.redirect) {
      window.location.href = response.data.redirect;
    }

  } catch (error) {
    console.error('Erreur:', error);
    toast.error("Réservation échouée, veuillez réessayer");
  }
};

</script>


<template>
 

 <div class="mt-3  formulaire">
        <div class="col-12">
            <div class="card card-1">
                <div class="card-body px-lg-4 px-md-3 px-2">
                    <div class="bs-stepper wizard-numbered shadow-none mt-2">

      <form @submit.prevent="submitReservation">
        <div class="form-group">
          <label>Nom du Coach</label>
          <input type="text" v-model="form.coach" class="form-control" disabled />
        </div>
<br>
        <div class="form-group">
          <label>Durée de la réunion (minutes)<strong style="color: brown;">*</strong></label>
          <input type="number" v-model="form.duration" class="form-control" min="15" step="15" />
        </div>
        <br>
        <div class="form-group">
          <label>Choisir une heure <strong style="color: brown;">*</strong></label>
          <select v-model="form.selected_time" class="form-control" required>
            <option disabled value="">Sélectionner une heure</option>
            <option
              v-for="slot in filteredSlots"
              :key="slot.start"
              :value="slot.start"
            >
              {{ slot.label }}
            </option>
          </select>
        </div>
        <br>
        <div class="form-group">
  <label>Honoraire par heure (€)</label>
  <input type="text" v-model="form.honoraire" class="form-control" disabled />
</div>
<br>
<div class="form-group">
  <label>Total (€)</label>
  <input type="text" v-model="form.total" class="form-control" disabled />
</div>
<br>
        <div class="form-group">
          <label>Message</label>
          <textarea v-model="form.message" class="form-control" placeholder="Ajouter un message" />
        </div>
        <br>
        <button type="submit" class="btn btn-primary mt-3" >Réserver</button>
      </form>
    </div>
    
  </div>   </div>   </div>   </div>   
</template>

<style scoped>
</style>
