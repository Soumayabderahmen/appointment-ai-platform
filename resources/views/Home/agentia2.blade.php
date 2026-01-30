@extends('Layouts.HomeView.generale')

@section('title')
Agent IA - Détail
@endsection

@section('css')
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.6/dist/css/uikit.min.css" />
  <style>
    .page-wrap { padding-bottom:60px; }
    .bg-img { width:100%; height:auto; }
    .section-title { font-weight:800; font-size:44px; line-height:1.1; margin-bottom:6px; color:#0E2E5C; }
    .section-subtitle { font-size:16px; color:#5D6B82; max-width:780px; }

    .hero { position:relative; overflow:hidden; }
    .hero .container { position:relative; z-index:2; }
    .hero-illustration img { max-width:320px; }
.chat-modal{
    border-radius: 22px;
    box-shadow: 0 18px 40px rgba(0,0,0,.18);
    padding: 28px 26px 24px;
    text-align: center;
    max-width: 560px;
  }
  .chat-modal-icon{
    width: 92px; height: 92px; margin: 0 auto 12px;
    border-radius: 50%;
    background: linear-gradient(180deg,#E9F3FF 0%, #DDEBFF 100%);
    box-shadow: 0 8px 18px rgba(0,86,179,.15), inset 0 0 0 6px #F7FBFF;
    display:grid; place-items:center;
  }
  .chat-modal-icon span{
    font-size: 48px; font-weight: 800; color:#1A5FD0; line-height:1;
  }
  .chat-modal-text{
    margin: 5px 0 1px; color:#3A4B62; font-size:20px;
  }
  .chat-modal-sub{
    margin: 0 0 12px; color:#0098F3; font-size:23px;
  }
  .chat-actions{
  display:flex;
  justify-content:center;
  gap:14px;               /* espace entre les 2 boutons */
  margin-top: 14px;
}

/* base des boutons */
.chat-btn{
  border-radius: 10px;    /* arrondi comme la maquette */
  padding: 10px 22px;
  font-weight: 700;
  line-height: 1;
  border: 0 !important;   /* override UIkit */
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  text-transform: none;   /* pas de uppercase forcé */
}

/* bleu "Se connecter" */
.chat-btn-primary{
  background: #0A88E8 !important;
  color: #fff !important;
}
.chat-btn-primary:hover{ background:#0a7bd1 !important; }

/* orange "Annuler" */
.chat-btn-cancel{
  background: #E8650A !important;
  color: #fff !important;
}
.chat-btn-cancel:hover{ background:#cf5908 !important; }

/* responsive: empile sur mobile */
@media (max-width: 460px){
  .chat-actions{ flex-direction: column; }
  .chat-btn{ width: 100%; }
}
    .agent-card { background:#fff; border-radius:18px; box-shadow:0 12px 24px rgba(25,72,143,.08); padding:22px; }
    .agent-card .avatar { width:110px; height:110px; border-radius:16px; object-fit:contain; background:#F3F7FF; display:block; }
    .agent-card .hello { display:inline-block; color:#0093EE; font-weight:700; padding:6px 12px; border-radius:999px; font-size:14px; margin-bottom:10px; }
    .agent-card .title-name { font-size:20px; font-weight:800; color:#005183; margin:2px 0; }
    .agent-card .desc { margin:6px 0 10px; color:#51607A; font-size:15px; max-width:720px; }
    .agent-card .tags .tag { display:inline-block; color:#1A5FD0; border-radius:6px; padding:4px 8px; font-size:12px; margin-right:6px; }
    .agent-card .cta { background:#FF6B00; color:#fff; font-weight:700; border-radius:999px; padding:10px 16px; border:none; transition:transform .15s ease; }
    .agent-card .cta:hover { transform:translateY(-2px); color:#fff; }

    .resp-wrap { position:relative; }
    .resp-title { font-weight:800; font-size:28px; color:#0093EE; margin:6px 0 16px; }

    .resp-container { position:relative; background:#fff; border:1px solid #E7F0FF; border-radius:22px; box-shadow:0 14px 28px rgba(25,72,143,.08); padding:28px 28px 18px 80px; }
    .resp-timeline { position:absolute; left:36px; top:93px; bottom:24px; width:6px; border-radius:6px; background:linear-gradient(180deg,#D7E8FF 0%, #BFD8FF 100%); box-shadow:inset 0 0 0 2px #EAF3FF; }
    .resp-dot { position:absolute; left:-7px; width:20px; height:20px; border-radius:50%; background:#fff; border:3px solid #1A5FD0; box-shadow:0 4px 10px rgba(26,95,208,.15); }

    .resp-block { background:linear-gradient(180deg,#F5FAFF 0%, #F0F7FF 100%); border:1px solid #E2EEFF; border-radius:18px; padding:18px 20px; margin-bottom:18px; box-shadow:0 8px 22px rgba(25,72,143,.06); }
    .resp-block-wide { margin-bottom:6px; }
    .resp-block-head { font-weight:800; font-size:18px; color:#00588F; margin-bottom:10px; }

    .resp-list { list-style:none; padding:0; margin:0; }
    .resp-item { display:flex; align-items:flex-start; gap:10px; padding:8px 0; color:#51607A; font-size:14px; }
    .resp-bullet { flex:0 0 auto; display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:#E6F0FF; color:#1A5FD0; font-weight:800; line-height:1; box-shadow: inset 0 0 0 4px #F8FBFF; }

    @media (max-width:991px) {
      .section-title { font-size:36px; }
      .hero-illustration { text-align:center; margin-top:10px; }
      .agent-card .desc { max-width:none; }
      .resp-container { padding:24px 20px 10px 56px; }
      .resp-timeline { left:26px; }
    }
    @media (max-width:640px) {
      .resp-container { padding-left:48px; }
      .resp-title { font-size:24px; }
    }
  </style>
@endsection

@section('content')
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
   <section class="container pt-5">
      {{-- Carte haute (Bonjour, je suis …) --}}
      <div class="agent-card uk-margin-medium-top">
        <div class="uk-grid-medium uk-flex-middle" uk-grid>
          <div class="uk-width-auto@s">
            {{-- Avatar : GLB via model-viewer sinon image --}}
            @if($agent->avatar_url && \Illuminate\Support\Str::endsWith($agent->avatar_url, '.glb'))
              <model-viewer
                src="{{ $agent->avatar_url }}"
                bounds="tight"
                camera-target="0m 1.60m 0m"
                camera-orbit="0deg 90deg 0.9m"
                field-of-view="15deg"
                interaction-prompt="none"
                style="background:transparent; width:180px; height:190px;"
                shadow-intensity="0.6">
              </model-viewer>
            @else
              <img src="{{ $agent->avatar_url ?? asset('/assets/img/dash/robot_smile.png') }}"
                   alt="Avatar {{ $agent->nom }}"
                   style="width:180px;height:170px;object-fit:contain;margin:auto;">
            @endif
          </div>

          <div class="uk-width-expand@s">
            <div class="hello">Bonjour ! Je suis {{ $agent->nom ?? 'MarketingGPT' }}</div>
            <div class="title-name">{{ $agent->nom ?? 'MarketingGPT' }}</div>
            <p class="desc">{{ $agent->description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }}</p>
            <div class="tags">
              <span class="tag"><b>#Publicité</b></span>
              <span class="tag"><b>#IA</b></span>
              <span class="tag"><b>#Campagne</b></span>
            </div>
          </div>

       <div class="uk-width-auto@s">
      @auth
    <a href="{{ route('chat.start', $agent->id) }}" class="cta">Commencer un chat</a>
    @else
    <a href="#chatModal" class="cta" uk-toggle>Commencer un chat</a>
      @endauth
    </div>
        </div>
      </div>

      {{-- RESPONSABILITÉ (DYNAMIQUE via sousTitres.responsabilites) --}}
      @if($agent->sousTitres && $agent->sousTitres->count())
        <div class="resp-wrap uk-margin-large-top">
          <div class="resp-container">
            <h2 class="resp-title">Responsabilité</h2>

            {{-- Timeline décorative : positionne 1-3 points selon le nombre de sous-titres --}}
            <div class="resp-timeline">
              @php
                $count = $agent->sousTitres->count();
                $tops = $count === 1 ? [12] : ($count === 2 ? [110, 300] : [87, 298, 502]);
              @endphp
              @foreach($tops as $t)
                <span class="resp-dot" style="top: {{ $t }}px;"></span>
              @endforeach
            </div>

            {{-- Boucles sur les sous-titres et responsabilités --}}
            @foreach($agent->sousTitres as $st)
              <div class="resp-block {{ $loop->last ? 'resp-block-wide' : '' }}">
                <div class="resp-block-head">{{ $st->titre ?? $st->title ?? 'Sous-titre' }}</div>

                @if($st->responsabilites && $st->responsabilites->count())
                  <ul class="resp-list">
                    @foreach($st->responsabilites as $r)
                      <li class="resp-item">
                        <span class="resp-bullet">+</span>
                        <span class="resp-text">{{ $r->responsabilite  ?? 'Responsabilité' }}</span>
                      </li>
                    @endforeach
                  </ul>
                @else
                  <div class="resp-item">
                    <span class="resp-bullet">+</span>
                    <span class="resp-text">Aucune responsabilité listée.</span>
                  </div>
                @endif
              </div>
            @endforeach
          </div>
        </div>
      @else
        <div class="uk-alert-warning uk-margin-top" uk-alert>
          <p>Aucune responsabilité définie pour cet agent pour le moment.</p>
        </div>
      @endif

    </div>
    {{-- Modal de confirmation de chat --}}
<div id="chatModal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body chat-modal"style="
    width: 510px;
    height: 368px;
">
  <img src="{{asset('/assets/img1/L-Info Circle.png')}}" alt="" style="width: 150px; heigth:150px"; >

    <p class="chat-modal-text">
      Souhaitez-vous commencer un chat avec l’agent <b>{{ $agent->nom }}</b> ?
    </p>
    <p class="chat-modal-sub">
      <b>Veuillez vous connecter pour commencer.</b>
    </p>

    <div class="chat-actions">
  <a href="{{ route('login') }}" class="uk-button chat-btn chat-btn-primary">
    Se connecter
  </a>
  <button class="uk-button chat-btn chat-btn-cancel uk-modal-close" type="button">
    Annuler
  </button>
</div>
  </div>
</div>

  </section>
@endsection

@section('script')
  <script src="https://cdn.jsdelivr.net/npm/uikit@3.23.6/dist/js/uikit.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/uikit@3.23.6/dist/js/uikit-icons.min.js"></script>
  {{-- model-viewer pour GLB --}}
  <script type="module" src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"></script>
  <script nomodule src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer-legacy.js"></script>
@endsection
