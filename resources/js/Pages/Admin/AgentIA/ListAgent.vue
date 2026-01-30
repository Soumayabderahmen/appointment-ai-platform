<script setup>
import { computed, onMounted, ref } from "vue";
import { toast } from 'vue3-toastify';
import './Css/ListAgentCss.css';
const showModal = ref(false);
const agents = ref([]);
const form = ref({
    name: "",
    domain: "",
    description: "",
    image: null,
    type: "public",
    sections: [],
});
const errors = ref({
  name: '',
  domain: '',
  description: '',
  image: '',
  type: '',
  sections: []
});

const validateAgentForm = () => {
  let valid = true;

  errors.value = {
    name: '',
    domain: '',
    description: '',
    // image: '',
    type: '',
    sections: []
  };

  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis.';
    valid = false;
  }

  if (!form.value.domain.trim()) {
    errors.value.domain = 'Le domaine est requis.';
    valid = false;
  }

  if (!form.value.type || !['public', 'private'].includes(form.value.type)) {
    errors.value.type = "Le type est requis (public ou privé).";
    valid = false;
  }

  if (form.value.description && form.value.description.trim().length < 10) {
    errors.value.description = 'La description doit contenir au moins 10 caractères.';
    valid = false;
  }

//   if (!form.value.image) {
//     errors.value.image = "L'image est requise.";
//     valid = false;
//   }

  form.value.sections.forEach((section, i) => {
    errors.value.sections[i] = { title: '', tasks: [] };

    if (!section.title.trim()) {
      errors.value.sections[i].title = 'Le titre est requis.';
      valid = false;
    }

    section.tasks.forEach((task, j) => {
      if (!task.trim()) {
        if (!errors.value.sections[i].tasks) {
          errors.value.sections[i].tasks = [];
        }
        errors.value.sections[i].tasks[j] = 'La tâche est requise.';
        valid = false;
      }
    });
  });

  return valid;
};

const uploadFile = (event) => {
    form.value.image = event.target.files[0];
};

const addSection = () => {
    form.value.sections.push({
        title: "",
        tasks: [""],
    });
};

const addTaskToSection = (sectionIndex) => {
    form.value.sections[sectionIndex].tasks.push("");
};

const submitForm = async () => {
  if (!validateAgentForm()) {
    toast.error("Veuillez corriger les erreurs du formulaire.");
    return;
  }
    try {
        const payload = new FormData();
        payload.append("name", form.value.name);
        payload.append("domain", form.value.domain);
        payload.append("description", form.value.description || "");
        payload.append("type", form.value.type);

        if (form.value.image) {
            payload.append("image", form.value.image);
        }

        form.value.sections.forEach((section, i) => {
            payload.append(`sections[${i}][title]`, section.title);
            section.tasks.forEach((task, j) => {
                payload.append(`sections[${i}][tasks][${j}]`, task);
            });
        });

        const response = await axios.post("/api/admin/agent/", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success(" Agent IA ajouté avec succès !");
        // console.log(' Response:', response.data)
        showModal.value = false;

        form.value = {
            name: "",
            domain: "",
            description: "",
            image: null,
            sections: [],
        };
        location.reload();
    } catch (error) {
        console.error(" Erreur lors de la soumission :", error);
        toast.error(" Une erreur est survenue lors de l’enregistrement.");
    }
};
const showDeleteModal = ref(false);
const agentToDelete = ref(null);

const openDeleteModal = (agent) => {
    agentToDelete.value = agent;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await axios.delete(`/api/admin/agent/${agentToDelete.value.id}`);
        showDeleteModal.value = false;
                toast.success(" Agent IA supprimé avec succès !");
                location.reload();
    } catch (error) {
        console.error(" Erreur lors de la suppression :", error);
        toast.error(" Une erreur est survenue lors de la suppression.");
    }
};

const search = ref("");

onMounted(async () => {
    await fetchAgents();
});

const fetchAgents = async () => {
    try {
        const res = await axios.get("/api/admin/agent");
        agents.value = res.data;
    } catch (error) {
        console.error("Erreur de récupération des agents IA :", error);
    }
};

const currentPage = ref(1);
const perPage = 5;
const totalPages = computed(() =>
    Math.ceil(filteredAgents.value.length / perPage)
);
const paginatedAgents = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredAgents.value.slice(start, start + perPage);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const filteredAgents = computed(() => {
    return agents.value.filter((r) => {
        const queryMatch =
            !search.value ||
            r.statut?.toLowerCase().includes(search.value.toLowerCase()) ||
            r.startup?.user?.name
                ?.toLowerCase()
                .includes(search.value.toLowerCase());

        return queryMatch;
    });
});
</script>

<template>
    <div class="px-6 pb-4 flex justify-between items-center">
        <div
            class="col-lg-8 col-md-8 col-sm-8 col-12 d-lg-flex d-md-flex d-sm-flex d-block justify-content-start align-items-center"
        >
            <div class="input-group me-8 mb-4" style="width: 247px">
                <span class="input-group-text">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                    >
                        <path
                            d="M17.8749 18L12.4244 12.3333M1.52344 7.61111C1.52344 8.47929 1.68792 9.33898 2.00748 10.1411C2.32705 10.9432 2.79544 11.672 3.38592 12.2859C3.9764 12.8998 4.6774 13.3867 5.4489 13.719C6.22039 14.0512 7.04728 14.2222 7.88234 14.2222C8.71741 14.2222 9.54429 14.0512 10.3158 13.719C11.0873 13.3867 11.7883 12.8998 12.3788 12.2859C12.9692 11.672 13.4376 10.9432 13.7572 10.1411C14.0768 9.33898 14.2412 8.47929 14.2412 7.61111C14.2412 6.74293 14.0768 5.88325 13.7572 5.08115C13.4376 4.27905 12.9692 3.55025 12.3788 2.93635C11.7883 2.32245 11.0873 1.83548 10.3158 1.50324C9.54429 1.171 8.71741 1 7.88234 1C7.04728 1 6.22039 1.171 5.4489 1.50324C4.6774 1.83548 3.9764 2.32245 3.38592 2.93635C2.79544 3.55025 2.32705 4.27905 2.00748 5.08115C1.68792 5.88325 1.52344 6.74293 1.52344 7.61111Z"
                            stroke="#C6C6C6"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </span>
                <input
                    v-model="search"
                    type="text"
                    class="form-control"
                    placeholder="Rechercher"
                />
            </div>
        </div>

        <div class="d-flex align-items-center">
            <button
                @click="showModal = true"
                class="btn btn-primary fs-sm"
                style="padding-left: 40px; padding-right: 40px"
            >
                Ajouter Agent IA
            </button>
            <!-- MODAL AGENT IA -->
            <div v-if="showModal" class="modal-overlay">
                <div class="modal-content">
                    <button @click="showModal = false" class="close-btn">
                        &times;
                    </button>

                    <form @submit.prevent="submitForm">
                        <div class="form-group">
                            <label
                                >Nom de l’agent IA
                                <b style="color: tomato">*</b></label
                            >
                            <input
                                v-model="form.name"
                                type="text"
                                placeholder="Entrer un nom pour ton agent IA..."
                                class="form-control"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            />
                            <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>

                        </div>

                        <div class="form-group">
                            <label
                                >Domaine d’expertise
                                <b style="color: tomato">*</b></label
                            >
                            <input
                                v-model="form.domain"
                                type="text"
                                placeholder="Exemple : Assistant en marketing"
                                class="form-control"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            />
                            <p v-if="errors.domain" class="text-red-600 text-sm mt-1">{{ errors.domain }}</p>

                        </div>
                        <div class="form-group">
                            <label>Type de l’agent IA <b style="color: tomato">*</b></label>
                            <select
                                v-model="form.type"
                                placeholder="Décrire votre agent..."
                                class="form-control"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            >
                                <option value="private">Privé</option>
                                <option value="public">Public</option>
                            </select>
                            <p v-if="errors.type" class="text-red-600 text-sm mt-1">{{ errors.type }}</p>

                        </div>
                        <div class="form-group">
                            <label>Description de l’agent IA <b style="color: tomato">*</b></label>
                            <textarea
                                v-model="form.description"
                                placeholder="Décrire votre agent..."
                                rows="4"
                                class="form-control"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            ></textarea>
                            <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>

                        </div>

                        <div class="form-group">
                            <label>Image de couverture   <b style="color: tomato">*</b></label>
                            <label
                                class="image-upload cursor-pointer"
                                for="agent-image"
                            >
                                <center>
                                    <svg
                                        class="mb-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="71"
                                        height="53"
                                        viewBox="0 0 71 53"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M20.917 11.6665C18.5963 11.6665 16.3708 12.5884 14.7298 14.2293C13.0889 15.8703 12.167 18.0959 12.167 20.4165C12.167 22.7371 13.0889 24.9627 14.7298 26.6037C16.3708 28.2446 18.5963 29.1665 20.917 29.1665C23.2376 29.1665 25.4632 28.2446 27.1042 26.6037C28.7451 24.9627 29.667 22.7371 29.667 20.4165C29.667 18.0959 28.7451 15.8703 27.1042 14.2293C25.4632 12.5884 23.2376 11.6665 20.917 11.6665ZM18.0003 20.4165C18.0003 19.643 18.3076 18.9011 18.8546 18.3541C19.4016 17.8071 20.1434 17.4998 20.917 17.4998C21.6905 17.4998 22.4324 17.8071 22.9794 18.3541C23.5264 18.9011 23.8337 19.643 23.8337 20.4165C23.8337 21.1901 23.5264 21.9319 22.9794 22.4789C22.4324 23.0259 21.6905 23.3332 20.917 23.3332C20.1434 23.3332 19.4016 23.0259 18.8546 22.4789C18.3076 21.9319 18.0003 21.1901 18.0003 20.4165Z"
                                            fill="#0068A9"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M9.25 0C6.92936 0 4.70376 0.921873 3.06282 2.56282C1.42187 4.20376 0.5 6.42936 0.5 8.75L0.5 43.75C0.5 46.0706 1.42187 48.2962 3.06282 49.9372C4.70376 51.5781 6.92936 52.5 9.25 52.5H61.75C64.0706 52.5 66.2962 51.5781 67.9372 49.9372C69.5781 48.2962 70.5 46.0706 70.5 43.75V8.75C70.5 6.42936 69.5781 4.20376 67.9372 2.56282C66.2962 0.921873 64.0706 0 61.75 0H9.25ZM61.75 5.83333H9.25C8.47645 5.83333 7.73459 6.14062 7.18761 6.68761C6.64062 7.23459 6.33333 7.97645 6.33333 8.75V43.75C6.33333 44.5235 6.64062 45.2654 7.18761 45.8124C7.73459 46.3594 8.47645 46.6667 9.25 46.6667H21.8325L41.8933 26.6029C42.7059 25.7902 43.6705 25.1456 44.7322 24.7058C45.7939 24.266 46.9319 24.0396 48.081 24.0396C49.2302 24.0396 50.3682 24.266 51.4299 24.7058C52.4916 25.1456 53.4562 25.7902 54.2687 26.6029L64.6667 37.0008V8.75C64.6667 7.97645 64.3594 7.23459 63.8124 6.68761C63.2654 6.14062 62.5235 5.83333 61.75 5.83333ZM61.75 46.6667H30.0808L46.0204 30.73C46.5674 30.1832 47.3091 29.876 48.0825 29.876C48.8559 29.876 49.5976 30.1832 50.1446 30.73L64.3954 44.9808C64.1609 45.4847 63.7873 45.911 63.3186 46.2097C62.85 46.5083 62.3057 46.6669 61.75 46.6667Z"
                                            fill="#0068A9"
                                        />
                                    </svg>
                                </center>
                                <br />

                                Cliquez pour sélectionner une image<br />
                                <span>(JPG, PNG, max 5MB)</span>
                            </label>
                            <input
                                id="agent-image"
                                type="file"
                                accept="image/*"
                                @change="uploadFile"
                                class="hidden"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            />
                            <!-- <p v-if="errors.image" class="text-red-600 text-sm mt-1">{{ errors.image }}</p> -->

                            <div
                                v-if="form.image"
                                class="mt-2 text-sm text-gray-600"
                            >
                                📎 {{ form.image.name }}
                            </div>
                        </div>

                        <div
                            v-for="(section, index) in form.sections"
                            :key="'section-' + index"
                            class="form-group"
                        >
                            <label>Sous Titre   <b style="color: tomato">*</b></label>
                            <input
                                v-model="section.title"
                                class="form-control mb-2"
                                placeholder="Sous-titre ex: Génération de leads"
                                style="
                                    border-radius: 15px;
                                    background: var(--Color, #fff);
                                    box-shadow: 10px 8px 20px 0px
                                        rgba(0, 81, 131, 0.25);
                                "
                            />
<p v-if="errors.sections[index]?.title" class="text-red-600 text-sm mt-1">
  {{ errors.sections[index].title }}
</p>

                            <div
                                v-for="(task, tIndex) in section.tasks"
                                :key="'task-' + index + '-' + tIndex"
                                class="pl-4"
                            >
                                <label>Responsabilité   <b style="color: tomato">*</b></label>
                                <input
                                    v-model="section.tasks[tIndex]"
                                    class="form-control"
                                    placeholder="Responsabilité liée"
                                    style="
                                        border-radius: 15px;
                                        background: var(--Color, #fff);
                                        box-shadow: 10px 8px 20px 0px
                                            rgba(0, 81, 131, 0.25);
                                    "
                                />
                                <p v-if="errors.sections[index]?.tasks?.[tIndex]" class="text-red-600 text-sm mt-1">
  {{ errors.sections[index].tasks[tIndex] }}
</p>

                            </div>

                            <button
                                type="button"
                                class="btn-blue mt-1"
                                @click="addTaskToSection(index)"
                            >
                                + Ajouter une responsabilité<b style="color: tomato">*</b>
                            </button>
                        </div>

                        <button
                            type="button"
                            class="btn-blue mt-3"
                            @click="addSection"
                        >
                            + Ajouter un sous-titre <b style="color: tomato">*</b>
                        </button>

                        <div class="mt-6 text-right">
                            <button type="submit" class="btn-submit">
                                Terminer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="flex flex-col gap-4 mt-4">
            <div
                class="flex items-center px-6 py-3 font-semibold text-sm"
                style="border-radius: 12px"
            >
                <div class="w-1/6 text-center" style="color: #005183">
                    <b>Nom de L'agent </b>
                </div>
                <!-- <div class="w-1/7 text-center" style="color: #005183;"><b></b></div> -->

                <div
                    class="w-1/6 text-center"
                    style="color: #005183; margin-left: 10px"
                >
                    <b>Catégorie</b>
                </div>
                <div
                    class="w-1/7 text-center"
                    style="color: #005183; margin-left: 101px"
                >
                    <b>Type</b>
                </div>

                <div
                    class="w-1/6 text-center"
                    style="color: #005183; margin-left: 88px"
                >
                    <b>crée le </b>
                </div>
                <div
                    class="w-1/6 text-center"
                    style="color: #005183; margin-left: 93px"
                >
                    <b>Actions</b>
                </div>
            </div>
            <div
                v-for="agent in agents"
                :key="agent.id"
                class="flex items-center justify-between bg-white rounded-xl px-6 py-6 hover:shadow-md transition"
                style="
                    height: 70px;
                    background: #fff;
                    box-shadow: 10px 8px 20px rgba(0, 81, 131, 0.25);
                    border-radius: 15px;
                "
            >
                <!-- ✅ Image ou initiale -->
                <div
                    class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 overflow-hidden"
                >
                    <template v-if="agent.image">
                        <img
                            :src="'/storage/' + agent.image"
                            alt="Agent IA"
                            class="w-full h-full object-cover rounded-full"
                        />
                    </template>
                    <!-- <template v-else>
      {{ agent.name.charAt(0).toUpperCase() }}
    </template> -->
                </div>

                <!-- ✅ Nom -->
                <div
                    class="w-28 text-center text-sm"
                    style="color: #0093ee; margin-left: -71px"
                >
                    {{ agent.name }}
                </div>

                <!-- ✅ Domaine -->
                <div
                    class="w-28 text-center text-sm"
                    style="color: rgb(0, 147, 238); margin-left: 5px"
                >
                    {{ agent.domain }}
                </div>

                <!-- ✅ Type = Nombre de sections -->
                <div
                    class="w-28 text-center text-sm"
                    style="color: #0093ee; margin-left: 33px"
                >
                    {{ agent.type ?? "-" }}
                </div>

                <!-- ✅ Date de création -->
                <div class="w-28 text-center text-sm" style="color: #0093ee">
                    {{ new Date(agent.created_at).toLocaleDateString("fr-FR") }}
                </div>

                <!-- ✅ Actions -->
                <div class="d-flex justify-content-end">
                    <a
                        :href="`/admin/detailsAgent/${agent.id}`"
                        class="btn btn-primary fs-sm me-2 text-white"
                    >
                        Voir plus
                    </a>

                    <button
                        class="btn btn-outline-primary fs-sm"
                        @click="openDeleteModal(agent)"
                    >
                        Supprimer
                    </button>
                </div>
                <!-- MODAL SUPPRESSION -->
                <div v-if="showDeleteModal" class="modal-overlay">
                    <div class="modal-content text-center">
                        <h2 class="modal-title">
                            Êtes-vous sûr de vouloir supprimer cet agent IA ?
                        </h2>

                        <div class="mt-6 flex justify-center gap-4">
                            <button
                                @click="showDeleteModal = false"
                                class="btn btn-sm btn-outline-primary"
                            >
                                Annuler
                            </button>
                            <button
                                @click="confirmDelete"
                                class="btn btn-primary fs-lm"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Aucun résultat -->
        </div>

        <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-4 mt-6"
            style="margin-left: 992px; margin-top: 43px"
        >
            <!-- Précédent -->
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="w-10 h-10 rounded-[10px] border-2 border-[#29B6F6] text-[#0288D1] flex items-center justify-center text-xl font-light shadow-md hover:shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                &lt;
            </button>

            <!-- Pages -->
            <div class="flex items-center gap-3 text-sm">
                <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                        'w-6 h-6 text-center',
                        page === currentPage
                            ? 'text-[#0288D1] font-semibold'
                            : 'text-gray-400',
                    ]"
                >
                    {{ page }}
                </button>
            </div>

            <!-- Suivant -->
            <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="w-10 h-10 rounded-[10px] border-2 border-[#29B6F6] text-[#0288D1] flex items-center justify-center text-xl font-light shadow-md hover:shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                &gt;
            </button>
        </div>
    </div>
</template>

