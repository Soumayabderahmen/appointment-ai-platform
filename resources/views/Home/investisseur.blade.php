@extends('Layouts.HomeView.generale')
@section('title')
Braindcode formation
@endsection
@section('page_description')

@endsection
@section('keywords')

@endsection
@section('css')


<!-- UIkit CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.6/dist/css/uikit.min.css" />
<style>
    .finance-search {
        display: flex;
        gap: 15px;
        margin-bottom: 40px;
        justify-content: center;
    }
    .finance-search input, .finance-search select {
        border-radius: 8px;
        border: 1px solid #ddd;
        padding: 10px 15px;
        flex: 1;
    }
    .finance-card {
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 20px;
        margin-bottom: 25px;
        transition: transform 0.3s ease;
    }
    .finance-card:hover {
        transform: translateY(-5px);
    }
    .finance-card .card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    .finance-card .card-header img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: #f0f0f0;
    }
    .finance-card h5 {
        margin: 0;
        font-weight: 600;
        color: #0070c9;
    }
    .finance-card p.desc {
        font-size: 14px;
        color: #555;
        margin: 5px 0 15px 0;
    }
    .finance-card p {
        margin: 2px 0;
        font-size: 15px;
    }
    .finance-card strong {
        font-weight: 700;
    }
    .finance-card .uk-button {
        margin-top: 15px;
        border-radius: 8px;
        font-weight: 600;
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
          <h1>Accédez aux financements qui propulsent vos idées</h1>
          <p>Retrouvez en un seul endroit les subventions publiques, fonds privés, business angels et banques partenaires pour accélérer votre startup.</p>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-12 image">
          <div class="box">
            <img src="{{ asset('assets/img1/inves.png') }}" height="300" width="300" alt="Marketplace">
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-5">
    <div class="container">
        <h3 class="text-center mb-5">Trouvez le financement adapté à votre projet</h3>

        <!-- Barre de recherche -->
        <div class="finance-search">
            <input type="text" placeholder="🔍  Chercher">
            <select>
                <option>Domaine</option>
            </select>
            <select>
                <option>Filtre</option>
            </select>
        </div>

        <!-- Cartes -->
                <div class="row justify-content-center">
            @forelse($fundings as $funding)
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="finance-card">
                    <div class="card-header">
                        <img src="{{ $funding->operator_logo ?? asset('assets/img1/inves.png') }}" alt="logo">
                        <div>
                            <h5>{{ $funding->title }}</h5>
                            <p class="desc">{{ Str::limit($funding->description, 100) }}</p>
                        </div>
                    </div>
                    <p><strong>Opérateur :</strong> {{ $funding->operator ?? 'Non renseigné' }}</p>
                    <p>
                        @if($funding->amount_max)
                            Jusqu’à <strong>{{ number_format($funding->amount_max, 0, ',', ' ') }} €</strong>
                        @else
                            <strong>Montant non précisé</strong>
                        @endif
                    </p>
                    @if($funding->application_link)
                        <a href="{{ $funding->application_link }}" target="_blank" class="uk-button uk-button-primary uk-width-1-1">
                            Postuler →
                        </a>
                    @endif
                </div>
            </div>
            @empty
                <p class="text-center">Aucun financement disponible pour le moment.</p>
            @endforelse
        </div>
    </div>
</section>
<!-- Section Stats -->
<section class="stats-section py-5" style="background:#0092ff; color:#fff; text-align:center;">
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-3">
                <h2 style="
    color: white;
"><b>+ 100</b></h2>
                <p><strong>Financements référencés</strong><br>Subventions, fonds et banques partenaires</p>
            </div>
            <div class="col-md-4 mb-3">
                <h2 style="
    color: white;
"><b>3</b></h2>
                <p><strong>Livrables clés générés automatiquement</strong><br>BP, Pitch Deck, Cahier des charges</p>
            </div>
            <div class="col-md-4 mb-3">
                <h2 style="
    color: white;
"><b>80%</b></h2>
                <p><strong>Des startups incubées</strong><br>candidatant à un financement en moins de 2 mois</p>
            </div>
        </div>
    </div>
</section>

<!-- Section CTA -->
<section class="cta-section py-5" style="background:#E6F5FE; text-align:center;">
    <div class="container">
        <h2 style="font-weight:700; color:#333;">
            Trouvez votre <span style="color:#0092ff;">financement</span> dès aujourd'hui
        </h2>
        <a href="#" class="uk-button mt-4" style="background:#ff6b1a; color:#fff; border-radius:8px; padding:12px 25px; font-weight:600;">
            Référencer un financement →
        </a>
    </div>
</section>

@endsection
