<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header avec avatar -->
    <div class="flex items-center justify-center bg-blue-100 py-4">
      <model-viewer
        v-if="agent.avatar_url"
        :src="agent.avatar_url"
        bounds="tight"
        camera-target="0m 1.60m 0m"
        camera-orbit="0deg 90deg 0.9m"
        field-of-view="15deg"
        interaction-prompt="none"
        style="width:180px; height:190px; background:transparent;"
        shadow-intensity="0.6"
      />
      <img
        v-else
        src="/assets/img/dash/robot_smile_2.png"
        alt="avatar"
        style="width:220px;height:220px;object-fit:contain;"
      >
    </div>

    <!-- Zone de messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
      <!-- Boucle sur tous les messages -->
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex"
        :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-md p-3 rounded-xl"
          :class="msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
        >
          {{ msg.text }}
        </div>
      </div>

      <!-- Indicateur "typing…" -->
      <div v-if="isTyping" class="flex justify-start">
        <div class="max-w-md bg-gray-200 text-gray-500 p-3 rounded-xl italic">
          {{ agent.nom }} est en train d'écrire...
        </div>
      </div>
    </div>

    <!-- Zone de saisie -->
    <div class="border-t bg-white p-3 flex items-center space-x-2">
      <input
        type="text"
        v-model="message"
        placeholder="Message"
        class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        ➤
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import axios from "axios"

const message = ref("")
const messages = ref([])
const isTyping = ref(false)

const props = defineProps({
  agent: {
    type: Object,
    required: true
  }
})

// Ajouter un message de bienvenue à l’ouverture
onMounted(() => {
  messages.value.push({
    text: `Bonjour, je suis ${props.agent.nom}. Comment je peux aider ?`,
    sender: "bot"
  })
})

async function sendMessage() {
  if (!message.value.trim()) return

  // Ajouter message de l'utilisateur
  messages.value.push({ text: message.value, sender: "user" })
  scrollToBottom()

  const userMessage = message.value
  message.value = ""

  try {
    // Afficher "typing…" pendant la réponse
    isTyping.value = true

    const response = await axios.post("/api/chat/ask", {
      agent: props.agent.id,
      question: userMessage,
    })

    isTyping.value = false
    messages.value.push({ text: response.data.answer, sender: "bot" })
    scrollToBottom()
  } catch (e) {
    console.error(e)
    isTyping.value = false
    messages.value.push({ text: "Erreur serveur", sender: "bot" })
    scrollToBottom()
  }
}

function scrollToBottom() {
  nextTick(() => {
    const container = document.querySelector('[ref="chatContainer"]')
    if (container) container.scrollTop = container.scrollHeight
  })
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
