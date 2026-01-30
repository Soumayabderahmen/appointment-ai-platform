<script>
import { ref, computed } from 'vue'

// Icônes
const IconBrain = { name: 'IconBrain', template: `<svg ... />` }
const IconAvatar = { name: 'IconAvatar', template: `<svg ... />` }
const IconMic = { name: 'IconMic', template: `<svg ... />` }
const IconPlug = { name: 'IconPlug', template: `<svg ... />` }
const IconFlow = { name: 'IconFlow', template: `<svg ... />` }
const IconBill = { name: 'IconBill', template: `<svg ... />` }
const IconTag = { name: 'IconTag', template: `<svg ... />` }
const IconWallet = { name: 'IconWallet', template: `<svg ... />` }

export default {
  name: 'Step6ModelEco',
  components: { IconBrain, IconAvatar, IconMic, IconPlug, IconFlow, IconBill, IconTag, IconWallet },

  setup() {
    const pricing = computed(() => ({
  std_price: features.value.find(f => f.key === 'std')?.price || 0,
  avatar_price: features.value.find(f => f.key === 'avatar')?.price || 0,
  voice_price: features.value.find(f => f.key === 'voice')?.price || 0,
  apis_price: features.value.find(f => f.key === 'apis')?.price || 0,
  n8n_price: features.value.find(f => f.key === 'n8n')?.price || 0,
  price_startup: priceStartup.value,
  total_price: totalCost.value,
  creator_share: creatorShare.value,
  platform_share: platformShare.value,
}));

    // Features avec prix modifiable
    const features = ref([
      { key: 'std',   label: 'Agent IA standard',                 price: 4.90, icon: IconBrain },
      { key: 'avatar',label: 'Avatar 3D animé',                   price: 9.00, icon: IconAvatar },
      { key: 'voice', label: 'Voix personnalisée (clonée)',       price: 6.00, icon: IconMic },
      { key: 'apis',  label: 'API externes connectées (max 3)',   price: 4.00, icon: IconPlug },
      { key: 'n8n',   label: 'Scénarios N8N actifs (jusqu’à 5)',  price: 7.00, icon: IconFlow },
    ])

    // Total dynamique (se met à jour dès qu’un prix change)
    const totalCost = computed(() =>
      features.value.reduce((sum, f) => sum + Number(f.price || 0), 0)
    )

    // Prix startup modifiable
    const priceStartup = ref(9.90)

    // Partage des revenus
    const creatorShare = computed(() => +(priceStartup.value * 0.70).toFixed(2))
    const platformShare = computed(() => +(priceStartup.value * 0.30).toFixed(2))

    return { features, totalCost, priceStartup, creatorShare, platformShare ,pricing }
  }
}
</script>

<template>
  <section class="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">

    <h4 class="mb-2">Configurez la tarification de l’abonnement pour votre Agent IA</h4>
    <p class="text-orange fw-bold">Coût mensuel créateur</p>

    <!-- Header -->
    <div class="px-5 text-[13px] text-slate-500 font-semibold grid grid-cols-[1fr_auto] gap-2">
      <div>Fonctionnalité activée</div>
      <div>Coût / mois HT</div>
    </div>

    <!-- Liste des features -->
    <ul class="mt-2 space-y-3">
      <li
        v-for="f in features"
        :key="f.key"
        class="bg-white rounded-[16px] border border-slate-100 shadow px-5 py-4 grid grid-cols-[1fr_auto] gap-3 items-center"
      >
        <!-- Libellé + icône -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <component :is="f.icon" class="w-5 h-5"/>
          </div>
          <div class="text-[15px] font-semibold text-slate-800">{{ f.label }}</div>
        </div>

        <!-- Prix modifiable -->
        <div class="flex items-center gap-2">
          <input
            v-model.number="f.price"
            type="number" step="0.1" min="0"
            class="w-24 h-9 text-right rounded-lg border border-slate-200 px-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0093EE]"
          />
          <span class="text-[15px] font-bold text-slate-700">€</span>
        </div>
      </li>

      <!-- Total -->
      <li class="bg-white rounded-[16px] border border-slate-100 shadow px-5 py-4 grid grid-cols-[1fr_auto] gap-3 items-center">
        <div class="text-[15px] font-bold text-[#0B74C7]">Total à payer</div>
        <div class="text-[15px] font-extrabold text-[#0B74C7]">
          {{ totalCost.toFixed(2) }} € HT / mois
        </div>
      </li>
    </ul>

  </section>
</template>
