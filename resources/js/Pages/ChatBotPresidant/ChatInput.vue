<script setup>
import { ref } from "vue";

const props = defineProps({
  primaryColor: { type: String, default: "#0066FF" },
  disabled: { type: Boolean, default: false },              // désactiver input/boutons
  uploadEndpoint: { type: String, default: "/api/chat/upload-pdf" }, // route Laravel conseillée
  sessionHeaderName: { type: String, default: "X-Session-ID" },      // header session
  accept: { type: String, default: "application/pdf" },
});

const emit = defineEmits(["send", "send-message", "pdf-uploaded", "error"]);

const message = ref("");
const fileInput = ref(null);
const uploading = ref(false);

const getSessionId = () => {
  let id = localStorage.getItem("chatbot_session_id");
  if (!id) {
    // fallback si randomUUID indisponible
    const rnd = (length = 16) =>
      Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    id = (crypto?.randomUUID?.() ?? `${rnd(8)}-${rnd(4)}-${rnd(4)}-${rnd(4)}-${rnd(12)}`);
    localStorage.setItem("chatbot_session_id", id);
  }
  return id;
};

const handleSend = () => {
  const text = message.value.trim();
  if (!text || props.disabled || uploading.value) return;
  emit("send", text);           // ✅ compatible avec le parent montré plus tôt
  emit("send-message", text);   // ✅ pour compat ascendante si tu l’utilises déjà
  message.value = "";
};

const handleKeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};

const openFileDialog = () => fileInput.value?.click();

const handleFileUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    emit("error", "Merci de sélectionner un fichier PDF.");
    event.target.value = null;
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  uploading.value = true;
  try {
    const res = await fetch(props.uploadEndpoint, {
      method: "POST",
      headers: { [props.sessionHeaderName]: getSessionId() },
      body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error || "Erreur lors du traitement du PDF.");

    emit("pdf-uploaded", { name: file.name, size: file.size, payload: json });
  } catch (err) {
    emit("error", err?.message || "Erreur réseau lors de l’envoi du PDF.");
  } finally {
    uploading.value = false;
    event.target.value = null; // reset input
  }
};
</script>

<template>
  <div class="chat-input-container">
    <div class="chat-input-wrapper" :style="{ borderColor: primaryColor + '33' }">
      <textarea
        v-model="message"
        class="chat-textarea"
        placeholder="Écrivez votre message..."
        :disabled="disabled || uploading"
        @keydown="handleKeydown"
        aria-label="Champ de saisie du message"
      ></textarea>

      <div class="chat-actions">
        <!-- Upload PDF -->
        <button
          class="action-btn upload-btn"
          :style="{ color: primaryColor }"
          @click="openFileDialog"
          :disabled="disabled || uploading"
          title="Joindre un PDF"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8l-5-5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <input
          ref="fileInput"
          type="file"
          class="hidden-file-input"
          :accept="accept"
          @change="handleFileUpload"
        />

        <!-- Send -->
        <button
          class="send-btn"
          :disabled="!message.trim() || disabled || uploading"
          :style="{ backgroundColor: primaryColor, opacity: (!message.trim() || disabled || uploading) ? '0.6' : '1' }"
          @click="handleSend"
          title="Envoyer"
        >
          <span v-if="!uploading" class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span v-else class="spinner" aria-label="Envoi en cours"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-input-container {
  padding: 16px;
  background: white;
  border-top: 1px solid #f0f0f0;
}
.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  background: #f5f7fa;
  border-radius: 18px;
  padding: 12px 12px 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}
.chat-input-wrapper:focus-within {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 102, 255, 0.2);
}
.chat-textarea {
  flex: 1;
  border: none;
  background: transparent;
  min-height: 40px;
  max-height: 120px;
  resize: none;
  font-family: inherit;
  font-size: 15px;
  color: #333;
  outline: none;
  line-height: 1.5;
}
.chat-textarea::placeholder { color: #999; }
.chat-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}
.action-btn {
  background: none;
  border: none;
  color: #667085;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
.action-btn:disabled { opacity: .5; cursor: not-allowed; }
.hidden-file-input { display: none; }
.send-btn {
  color: white;
  border: none;
  width: 40px; height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 102, 255, 0.2);
}
.send-btn:hover:not(:disabled) {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
}
.send-btn:disabled {
  cursor: not-allowed;
  background: #ddd;
}
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.6);
  border-top-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
