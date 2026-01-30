@extends('Layouts.HomeView.generale')

@section('title')
Braindcode formation
@endsection

@section('page_description')@endsection
@section('keywords')@endsection

@section('css')
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <style>
     .bg-img { width: 100%; height: auto; }
    [v-cloak]{ display:none; }
    .cardAgent {
      border: none;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform .2s;
      text-align: center;
      background: #fff;
    }
    .cardAgent:hover { transform: translateY(-5px); }
    .cardAgent img, .cardAgent model-viewer {
      width: 120px; height: 120px; object-fit: contain;
    }
    .cardAgent .card-title {
      font-weight: 700;
      color: #FF5A00; /* orange comme ton design */
      margin-top: 15px;
    }
    .cardAgent .card-text {
      font-size: 0.9rem;
      color: #555;
      min-height: 40px;
    }
    .cardAgent .btn {
      border-radius: 25px;
      padding: 6px 20px;
      font-weight: 500;
    }
  </style>
@endsection

@section('content')
  <!-- Hero Section -->
  <section class="hero pt-3">
    <img src="{{ asset('assets/img1/bg-slide1.png') }}" class="bg-img" alt="">
    @include('Layouts.HomeView.navbarHome')
    <div class="container pt-5">
      <div class="row mt-5 mb-lg-5 mb-md-4 mb-sm-3 mb-2">
        <div class="col-lg-7 col-md-7 col-sm-12"style="
    margin-top: 205px;
    ">
          <h1>Marketplace</h1>
          <p>Découvrez un aperçu des agents d'intelligence artificielle intégrés que vous trouverez dans notre logiciel.</p>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-12 image">
          <div class="box">
            <img src="{{ asset('assets/img1/L-Shop.png') }}" height="300" width="300" alt="Marketplace">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- App Vue -->
  <div id="app" v-cloak class="container py-5">
    <!-- Filtres -->
  

    <!-- Grille des agents -->
    <div class="row g-5">
     

   <div v-for="item in filteredAgents" :key="item.id" class="col-lg-4 col-md-6 col-12">
    <div class="card cardAgent p-3 h-100" style="max-width: 280px; margin:auto;">

      <!-- Avatar -->
      <model-viewer
        v-if="item.avatar_url"
        :src="item.avatar_url"
        bounds="tight"
        camera-target="0m 1.60m 0m"
        camera-orbit="0deg 90deg 0.9m"
        field-of-view="15deg"
        interaction-prompt="none"
        style="background:transparent; width:180px; height:170px; margin:auto;"
        shadow-intensity="0.6"
        v-on:error="() => { item.avatar_url = null }"
      ></model-viewer>

      <img v-else src="/assets/img/dash/robot_smile.png"
           alt="avatar"
           style="width:180px;height:170px;margin:auto;">

      <!-- Nom / Description -->
      <h5 class="card-title mt-3">@{{ item.nom }}</h5>
      <p class="card-text">@{{ item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }}</p>

      <!-- Bouton -->
      <div class="text-center mt-auto ">
<!-- sans Ziggy -->
<a :href="`{{ url('home/voir') }}/${item.id}/details`"
   class="btn btn-primary mb-2">Voir plus</a>
      </div>
    </div>
  </div>
  </div>
      </div>
    </div>
  </div>
@endsection

@section('script')
  <script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"></script>

  <!-- Vue.js -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>

  <!-- Web component model-viewer (pour afficher les .glb) -->
  <script type="module" src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"></script>
  <script nomodule src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer-legacy.js"></script>

  <script>
    const { createApp } = Vue;

    const app = createApp({
      data() {
        return {
          search: "",
          selectedCategory: "",
          agents: @json($mesagents)
        };
      },
      computed: {
        filteredAgents() {
          const q = (this.search || "").toLowerCase();
          return (this.agents || []).filter(a => {
            const txt = ((a.nom || "") + " " + (a.type || "") + " " + (a.description || "")).toLowerCase();
            const matchTxt = !q || txt.includes(q);
            const matchCat = !this.selectedCategory || String(a.category_id) === String(this.selectedCategory);
            return matchTxt && matchCat;
          });
        }
      }
    });

    // Autoriser le custom element <model-viewer> pour éviter le warning Vue
    app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer';

    app.mount('#app');
  </script>
@endsection
