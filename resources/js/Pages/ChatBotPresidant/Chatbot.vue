<!-- ChatWidget.vue -->
<script setup>
import { ref, nextTick } from "vue";
import ChatInput from "./ChatInput.vue";

const isOpen = ref(false);
const messageContainer = ref(null);
const sending = ref(false);

const botSettings = ref({
  bot_name: "ChatBot",
  welcome_message: "Bienvenue ! 🎉 Je suis là pour vous aider. Que puis-je faire pour vous aujourd'hui ?",
  primary_color: "#2563eb",
});

const botAvatar = "/asset/img/bot-avatar.jpg";        // avatar bot
const receiveFileUrl = "/asset/sounds/messenger.mp3"; // son “Messenger”

// Messages init
const messages = ref([
  { sender: "bot", text: "Bonjour 👋, je suis ton assistant virtuel." },
]);

const toggleChatbot = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && messages.value.length === 0) {
    messages.value.push({ sender: "bot", text: botSettings.value.welcome_message });
  }
};

const scrollToBottom = async (smooth = false) => {
  await nextTick();
  const el = messageContainer.value;
  if (!el) return;
  if (smooth && "scrollTo" in el) {
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  } else {
    el.scrollTop = el.scrollHeight;
  }
};

/* ---------- Audio ---------- */
let receiveAudio = null;
let audioCtx = null;

const setupReceiveAudio = () => {
  if (!receiveAudio) {
    receiveAudio = new Audio(receiveFileUrl);
    receiveAudio.preload = "auto";
    receiveAudio.volume = 0.5;
  }
  return receiveAudio;
};

const playBeepFallback = async () => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();

    const pop = (f, t0) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(g); g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.1, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.10);
      o.start(t0); o.stop(t0 + 0.11);
    };

    const t = audioCtx.currentTime;
    pop(700, t);
    pop(920, t + 0.09);
  } catch {}
};

const playReceiveSound = async () => {
  try {
    const a = setupReceiveAudio();
    a.currentTime = 0;
    await a.play();
  } catch {
    await playBeepFallback();
  }
};

/* ---------- Bulle typing (on utilise UNE bulle & on la remplit instantanément à 200 OK) ---------- */
const pushTypingBubble = () => {
  const id = `typing-${Date.now()}`;
  const msg = { sender: "bot", typing: true, id, text: "" }; // text est prêt à être remplacé
  messages.value.push(msg);
  return msg;
};

/* ---------- Envoi ---------- */
const sendMessage = async (text) => {
  if (!text || sending.value) return;

  // message utilisateur
  messages.value.push({ sender: "user", text });
  await scrollToBottom();

  // bulle "typing"
  sending.value = true;
  const typingMsg = pushTypingBubble();
  await scrollToBottom();

  try {
    const res = await fetch("/api/chat/president", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ message: text, context: null }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      typingMsg.text = data?.error || "❌ Erreur lors de l’appel au service.";
      typingMsg.typing = false;
      // force une mise à jour + scroll
      messages.value = [...messages.value];
      await scrollToBottom(true);
      return;
    }

    // ✅ Afficher immédiatement la réponse dans CETTE bulle
    const botText = (data?.text ?? "[Réponse vide]").toString();
    typingMsg.text = botText;
    typingMsg.typing = false;

    // ✅ Forcer le DOM à peindre le texte avant de jouer le son
    await nextTick();
    messages.value = [...messages.value]; // forceRender (au cas où)
    await scrollToBottom(true);

    // 🔊 Son APRÈS affichage
    await playReceiveSound();
  } catch (e) {
    typingMsg.text = "❌ Erreur réseau. Réessaie plus tard.";
    typingMsg.typing = false;
    messages.value = [...messages.value];
    await scrollToBottom(true);
    console.error(e);
  } finally {
    sending.value = false;
  }
};
</script>

<template>
  <div>
    <!-- BACKDROP -->
    <transition name="fade">
      <div v-if="isOpen" class="chatbot-backdrop" @click="toggleChatbot"></div>
    </transition>

    <!-- BOUTON FLOTTANT -->
    <div class="chat-icon-wrapper" :class="{ 'chat-open': isOpen, pulse: !isOpen }" @click="toggleChatbot">
      <img src="/asset/img/bot-avatar.jpg" alt="chatbot icon" class="chat-icon" />
      <div class="chat-tooltip">Besoin d'aide ?</div>
    </div>

    <!-- POPUP CHATBOT -->
    <transition name="chatbot-popup">
      <div v-if="isOpen" class="chatbot-container">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-info">
            <div class="chatbot-avatar-container" :class="{ 'typing-glow': sending }">
              <img src="/asset/img/bot-avatar.jpg" alt="bot avatar" class="chatbot-avatar" />
            </div>
            <div class="chatbot-name-status">
              <h4 class="chat-title">{{ botSettings.bot_name }}</h4>
              <span class="active-status">
                <template v-if="!sending">🟢 Active</template>
                <template v-else>
                  ✍️ Écrit <span class="dots"><span>.</span><span>.</span><span>.</span></span>
                </template>
              </span>
            </div>
          </div>

          <button class="close-btn" @click="toggleChatbot">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" ref="messageContainer" aria-live="polite">
          <transition-group name="msg" tag="div">
            <div v-for="(msg, index) in messages" :key="`msg-${index}-${msg.id || ''}`">
              <!-- BOT : une seule bulle (typing puis texte) -->
              <div v-if="msg.sender === 'bot'" class="message-row bot">
                <img :src="botAvatar" alt="Bot" class="msg-avatar" />
                <div class="chat-bubble bot" :style="{ borderColor: `${botSettings.primary_color}20` }">
                  <div class="bubble-content">
                    <span v-if="msg.text" class="msg-text">{{ msg.text }}</span>
                    <span v-if="msg.typing" class="typing-dots inline">
                      <i></i><i></i><i></i>
                    </span>
                  </div>
                </div>
              </div>

              <!-- USER -->
              <div v-else class="message-row user">
                <div class="chat-bubble user" :style="{ backgroundColor: `${botSettings.primary_color}` }">
                  <span>{{ msg.text }}</span>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Input -->
        <ChatInput :primary-color="botSettings.primary_color" :disabled="sending" @send="sendMessage" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* --- Container principal --- */
.chatbot-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 360px;
  max-height: 520px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex; flex-direction: column; overflow: hidden;
  font-family: "Segoe UI", sans-serif;
}

/* --- Header --- */
.chatbot-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
}
.chatbot-info { display: flex; align-items: center; gap: 10px; }
.chatbot-avatar-container {
  width: 40px; height: 40px; border-radius: 50%; overflow: hidden;
  border: 2px solid #2563eb22; transition: box-shadow .25s ease, transform .25s ease;
}
.typing-glow {
  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.35);
  animation: pulseGlow 1.8s infinite;
}
@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(37,99,235,.35); transform: scale(1); }
  50% { box-shadow: 0 0 18px 6px rgba(37,99,235,.25); transform: scale(1.03); }
  100%{ box-shadow: 0 0 0 0 rgba(37,99,235,.35); transform: scale(1); }
}
.chatbot-avatar { width: 100%; height: 100%; object-fit: cover; }
.chatbot-name-status { display: flex; flex-direction: column; font-size: 14px; }
.chat-title { font-weight: 600; margin: 0; color: #111827; }
.active-status { font-size: 12px; color: #16a34a; display:flex; align-items:center; gap:4px; }
.dots span { animation: blink 1.2s infinite; opacity: .3; }
.dots span:nth-child(2){ animation-delay: .15s; }
.dots span:nth-child(3){ animation-delay: .3s; }
@keyframes blink { 0%, 80%, 100% { opacity: .3 } 40% { opacity: 1 } }

/* --- Messages --- */
.chatbot-messages { flex: 1; padding: 14px; overflow-y: auto; background: #f9fafb; }
.msg-enter-active, .msg-leave-active { transition: all .15s ease; }
.msg-enter-from, .msg-leave-to { opacity: 0; transform: translateY(4px); }

.message-row {
  display: flex; align-items: flex-end; gap: 8px; margin: 6px 0;
}
.message-row.user { justify-content: flex-end; }
.message-row.bot { justify-content: flex-start; }

.msg-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  flex: 0 0 28px; object-fit: cover; box-shadow: 0 1px 2px rgba(0,0,0,.08);
}

/* bulles */
.chat-bubble {
  padding: 10px 14px; border-radius: 14px; max-width: 80%;
  font-size: 14px; line-height: 1.45; animation: bubbleIn .18s ease-out;
}
@keyframes bubbleIn { from { transform: translateY(4px); opacity: .0; } to { transform: translateY(0); opacity: 1; } }

.chat-bubble.bot { background: #ffffff; border: 1px solid #e5e7eb; color: #111827; }
.chat-bubble.user { background: #2563eb; color: white; }

/* contenu bulle bot : texte + dots */
.bubble-content { display: inline-flex; align-items: flex-end; gap: 6px; flex-wrap: wrap; }
.msg-text { white-space: pre-wrap; word-break: break-word; }

/* Dots inline (quand typing = true) */
.typing-dots.inline {
  display: inline-flex; gap: 6px; align-items: center;
}
.typing-dots.inline i {
  width: 6px; height: 6px; background:#cbd5e1; border-radius: 50%;
  display:block; animation: updown .9s infinite ease-in-out;
}
.typing-dots.inline i:nth-child(2){ animation-delay: .15s; }
.typing-dots.inline i:nth-child(3){ animation-delay: .3s; }
@keyframes updown { 0%, 60%, 100% { transform: translateY(0); opacity:.6 } 30% { transform: translateY(-4px); opacity:1 } }

/* --- Bouton flottant --- */
.chat-icon-wrapper {
  position: fixed; bottom: 20px; right: 20px; background: #2563eb;
  border-radius: 50%; width: 64px; height: 64px; cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex; justify-content: center; align-items: center;
  transition: transform 0.2s;
}
.chat-icon-wrapper:hover { transform: scale(1.08); }

/* Animation pulse quand fermé */
.pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0%{ transform: scale(1) } 50%{ transform: scale(1.1) } 100%{ transform: scale(1) } }
.chat-icon { width: 48px; height: 48px; object-fit: cover; border-radius: 50%; }

/* Tooltip */
.chat-tooltip {
  position: absolute; right: 70px; bottom: 30px; background: #111827; color: white;
  font-size: 12px; padding: 6px 10px; border-radius: 8px; opacity: 0; pointer-events: none; transition: 0.3s;
}
.chat-icon-wrapper:hover .chat-tooltip { opacity: 1; }

/* Bouton fermer */
.close-btn { background: transparent; border: none; cursor: pointer; color: #6b7280; transition: 0.2s; }
.close-btn:hover { color: #111827; }
</style>
