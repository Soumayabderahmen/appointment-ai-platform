@extends('Layouts.HomeView.generale')
@section('title')
Contact
@endsection
@section('page_description')

@endsection
@section('keywords')

@endsection
@section('css')
<!-- UIkit CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.6/dist/css/uikit.min.css" />
<style>
    body {
        background-image: url('/assets/img/bg-contact.png');
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
@endsection
@section('content')
<!-- Hero Section -->
<section class="hero pt-3">
    @include('Layouts.HomeView.navbarHome')
    <div class="container pt-5">
        <div class="row mt-5 mb-lg-5 mb-md-4 mb-sm-3 mb-2">
            <div class="col-lg-7 col-md-7 col-sm-12">
                <div class="card cardContact">
                    <div class="card-header">
                        <h1>Essayez la plateforme, découvrez le potentiel</h1>
                        <p>Laissez-nous vous guider avec une démonstration gratuite
                            Réponse sous 24h
                        </p>
                    </div>
                    <div class="card-body">
                        <div class="row formulaire">
                            <div class="col-lg-6 col-12 mb-4">
                                <label for="" class="form-label">Nom</label>
                                <input type="text" class="form-control" placeholder="Entrer votre nom">
                            </div>
                            <div class="col-lg-6 col-12 mb-4">
                                <label for="" class="form-label">Prénom</label>
                                <input type="text" class="form-control" placeholder="Entrer votre prènom">
                            </div>
                            <div class="col-12 mb-4">
                                <label for="" class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Entrer votre email">
                            </div>
                            <div class="col-12 mb-4">
                                <label for="" class="form-label">Numéro de téléphone</label>
                                <input type="tel" class="form-control" placeholder="Entrer votre numéro">
                            </div>
                            <div class="col-12 mb-4">
                                <label for="" class="form-label">Categorie </label>
                               <div class="d-flex flex-wrap gap-4">
                                <div class="form-check">
                                    <input type="radio" id="tech" name="categorie" class="form-check-input">
                                    <label for="tech" class="form-check-label">Problème technique</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" id="general" name="categorie" class="form-check-input">
                                    <label for="general" class="form-check-label">Demande générale</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" id="other" name="categorie" class="form-check-input">
                                    <label for="other" class="form-check-label">Autre</label>
                                </div>
                               </div>
                            </div>
                            <div class="col-12 mb-4">
                                <label for="" class="form-label">Décrivez votre besoin en quelques lignes...</label>
                                <textarea name="" rows="3" id="" class="form-control" placeholder="Ecrire ici"></textarea>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary w-100">
                                    Envoyer
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.99989 10L2.72412 2.60376C8.23673 4.20514 13.3564 6.73 17.9047 9.99978C13.3565 13.2696 8.23679 15.7945 2.7242 17.396L4.99989 10ZM4.99989 10L11.2501 10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-12 image">
                <div class="box">
                    <img src="{{asset('assets/img1/message.png')}}" alt="femme" height="406" width="406">
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@section('script')
<script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"></script>


@endsection