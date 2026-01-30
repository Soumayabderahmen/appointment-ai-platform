<template>
 
      <!-- Intro -->
      <h2 class="fw-bold text-primary mb-4">Bonjour ! Je suis <span class="text-gradient">{{agent.name}}</span></h2>
      <p class="text-muted mb-4 fs-5">{{agent.domain}}</p>
      <p class="text-muted">
        {{agent.description}}
      </p>

      <!-- Responsabilités -->
      <div class="mt-5">
        <h4 class="fw-bold mb-4">Responsabilités</h4>
        <div class="row g-4">
          <div class="col-md-4" v-for="(responsibility, index) in responsibilities" :key="index">
            <div class="border rounded-4 p-4 shadow-sm h-100 bg-white">
              <h5 class="fw-bold mb-3">{{ responsibility.title }}</h5>
              <ul class="list-unstyled ps-3">
                <li v-for="(task, taskIndex) in responsibility.tasks" :key="taskIndex" class="mb-2">
                  <i class="bi bi-check-circle-fill text-primary me-2"></i>{{ task }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Autres agents -->
      <div class="mt-5">
        <h4 class="fw-bold mb-4">Tu pourrais aussi aimer</h4>
        <div class="row g-4">
          <div class="col-md-4" v-for="agent in suggestedAgents" :key="agent.name">
            <div class="card shadow-sm border-0 text-center">
              <img :src="'/storage/' + agent.image" :alt="agent.name" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ agent.name }}</h5>
                <p class="card-text">{{ agent.domain }}</p>
                <a :href="`/detailsAgent/${agent.id}`" class="btn btn-primary btn-sm">Voir plus</a>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  agent: Object,
    suggestedAgents: Array


});
const agent = ref(props.agent);
const responsibilities = ref([]) 

responsibilities.value = agent.value.sections?.map(section => ({
  title: section.title,
  tasks: section.tasks?.map(task => task.content)
})) || []


</script>

<style scoped>
.agent-details {
  background: #f8fbff;
}

.text-gradient {
  background: linear-gradient(90deg, #007bff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>