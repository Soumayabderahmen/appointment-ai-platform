import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h, defineAsyncComponent} from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CoachPage from './Pages/Home/CoachPage.vue';
import AgentAIPage from './Pages/Home/AgentAIPage.vue';
import AgentDetailsPage from './Pages/Home/AgentDetailsPage.vue';
import notifications from './Components/notificationsList/liste.vue';
import notificationsNavbar from './Components/notificationsList/Listenotifications.vue';
import Chatbot from './Pages/ChatBotPresidant/Chatbot.vue';
import categorie from './Pages/Admin/Categorie/Liste.vue';
import addCategorie from './Pages/Admin/Categorie/AddCategorie.vue';
import editCategorie from './Pages/Admin/Categorie/edit.vue';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const appElement = document.getElementById('app');

if (appElement && appElement.hasAttribute('data-page')) {
    // ➤ Page Inertia.js
    createInertiaApp({
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob('./Pages/**/*.vue'),
            ),
        setup({ el, App, props, plugin }) {
            return createApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue)
                .mount(el);
        },
        progress: {
            color: '#4B5563',
        },
    });
} else if (appElement) {
    // ➤ Page Blade classique avec Vue
    const app = createApp({});

    // Enregistrement des composants utilisés dans Blade
        app.component('chatbotia', Chatbot)
 app.component('liste-categorie', categorie);
app.component('add-categorie', addCategorie);
app.component('edit-categorie', editCategorie);
    app.component('top-cards-dashbord', defineAsyncComponent(() => import('./Components/dashbord/top-cards.vue')));
    app.component('avancements-dashbord', defineAsyncComponent(() => import('./Components/dashbord/avancements.vue')));
    app.component('top-card', defineAsyncComponent(() => import('./Components/dashboardAdmin/topCards.vue')));
    app.component('table-user', defineAsyncComponent(() => import('./Components/dashboardAdmin/TableUser.vue')));
    app.component('liste-agents-ia', defineAsyncComponent(() => import('./Components/agentsIA/liste.vue')));
    app.component('add-agent-ia', defineAsyncComponent(() => import('./Components/agentsIA/add.vue')));
    app.component('details-agent-ia',defineAsyncComponent(() => import('./Components/agentsIA/details.vue')));
    app.component('calendrier',defineAsyncComponent(() => import('./Pages/Startups/Calander.vue')));
    app.component('list-reservations',defineAsyncComponent(() => import('./Pages/Admin/ListReservations.vue')));
    app.component('disponibilite',defineAsyncComponent(() => import('./Pages/Coach/Availability.vue')));
    app.component('coach-calender',defineAsyncComponent(() => import('./Pages/Coach/Calandry.vue')));
    app.component('reservations-coach',defineAsyncComponent(() => import('./Pages/Coach/ListeReservation.vue')));
    app.component('coachs',defineAsyncComponent(() => import('./Pages/Admin/Activation/Coach.vue')));
    app.component('investisseur',defineAsyncComponent(() => import('./Pages/Admin/Activation/investisseur.vue')));
    app.component('startups',defineAsyncComponent(() => import('./Pages/Admin/Activation/startup.vue')));
    app.component('add-reservations',defineAsyncComponent(() => import('./Pages/Startups/ReservationCoach.vue')));
    app.component('reservations-startup',defineAsyncComponent(() => import('./Pages/Startups/ListeReservation.vue')));
    app.component('profile-edit',defineAsyncComponent(() => import('./Pages/Profile/Partials/EditCoachProfile.vue')));
    app.component('details_agent',defineAsyncComponent(() => import('./Pages/Admin/AgentIA/DetailsAgent.vue')));
    app.component('list_agent',defineAsyncComponent(() => import('./Pages/Admin/AgentIA/ListAgent.vue')));
    app.component('List_coach',defineAsyncComponent(() => import('./Pages/Coach/ListCoach.vue')));
    app.component('coach-profile',defineAsyncComponent(() => import('./Pages/Coach/profileCoach.vue')));
    app.component('admin-profile',defineAsyncComponent(() => import('./Pages/Admin/ProfileAdmin.vue')));
app.component('message-reservations',defineAsyncComponent(() => import('./Pages/Startups/ReservationMessage.vue')));
  app.component('agents', defineAsyncComponent(() => import('./Pages/Home/AgentAIPage.vue')));
    app.component('agent-details-page', AgentDetailsPage);
    app.component('coach-page', CoachPage);
app.component('investisseur-form',defineAsyncComponent(()=>import('./Pages/Admin/investisseurs/FundingForm.vue')));
app.component('publication',defineAsyncComponent(()=>import('./Pages/Admin/investisseurs/liste.vue')));
app.component('chat',defineAsyncComponent(() => import('./Pages/ChatBotPresidant/Chat.vue')));
    app.component('liste-notif', notifications);

    app.config.globalProperties.$toast = Object.assign(toast, {
        success: (msg, opts) => toast(msg, { type: "success", ...opts }),
        error: (msg, opts) => toast(msg, { type: "error", ...opts }),
        info: (msg, opts) => toast(msg, { type: "info", ...opts }),
        warn: (msg, opts) => toast(msg, { type: "warn", ...opts }),
      });

    app.mount('#app');
// Navbar à part
const navbar = createApp({});
navbar.component('notifications', notificationsNavbar);

navbar.mount('#navbar-nav'); // 👈 Obligatoire pour activer le composant

// navbar.mount('#navbar-nav');


}
