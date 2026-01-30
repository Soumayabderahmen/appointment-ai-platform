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

@endsection
@section('content')
<!-- Hero Section -->
<section class="hero pt-3">
    <img src="{{asset('assets/img1/bg-slide1.png')}}" class="bg-img">
    @include('Layouts.HomeView.navbarHome')
    <div class="container pt-5">
        <div class="row mt-5 mb-lg-5 mb-md-4 mb-sm-3 mb-2">
            <div class="col-lg-7 col-md-7 col-sm-12">
                <h1>Bienvenue à Braindcode marketplace</h1>
                <p>Créez un espace unique pour animer, connecter et faire grandir votre communauté startup avec nos agents IA spécialisés, des avatars 3D interactifs et des outils de coaching personnalisés.
                </p>
                <div class="btns d-flex">
                    <button class="btn btn-primary me-3 mb-3">Demander une démo</button>
                    <a href="" class="btn btn-outline-secondary mb-3">Découvrir les fonctionnalités</a>
                </div>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-12 image">
                <div class="box">
                    <img src="{{asset('assets/img1/slide1.png')}}" alt="femme" height="406" width="406">
                </div>
            </div>
        </div>
    </div>
</section>

<!--section 2-->
<section id="Fonctionnalites">
    <div class="container">
        <div class="section-title">
            <h2>Ce que nous proposons</h2>
        </div>
        <div class="row mt-5">
            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/avatar.png')}}" alt="">
                        <h3>Avatars 3D & Voix</h3>
                    </div>
                    <div class="card-body ">
                        <p>Créez des avatars 3D personnalisés avec voix synthétique unique pour une interaction immersive</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/rag.png')}}" alt="">
                        <h3>Mémoire RAG</h3>
                    </div>
                    <div class="card-body ">
                        <p>Intelligence artificielle avec mémoire contextuelle pour des réponses précises et personnalisées</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/Api.png')}}" alt="">
                        <h3>Intégrations API</h3>
                    </div>
                    <div class="card-body ">
                        <p>Connectez vos bases de données, documents et scénarios N8N directement aux agents IA</p>
                    </div>
                </div>
            </div>

            <!-- Répète les cartes suivantes avec les données suivantes -->
            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/chat.png')}}" alt="">
                        <h3>Chatbot Président</h3>
                    </div>
                    <div class="card-body ">
                        <p>Agent orchestrateur intelligent pour coordonner et gérer tous vos agents managers</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/sendbox.png')}}" alt="">
                        <h3>Sandbox de Test</h3>
                    </div>
                    <div class="card-body ">
                        <p>Environnement sécurisé pour tester et optimiser vos agents IA avant déploiement</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                <div class="card cardPropos">
                    <div class="card-header ">
                        <img src="{{asset('assets/img1/marketplace.png')}}" alt="">
                        <h3>Marketplace Globale</h3>
                    </div>
                    <div class="card-body ">
                        <p>Vendez et achetez des agents IA spécialisés sur notre marketplace internationale</p>
                    </div>
                </div>
            </div>

            
        </div>

    </div>
</section>

<!--section 3 -->
<section id="pourqui">
    <div class="container">
        <div class="section-title">
            <h2>La solution idéale pour...</h2>
        </div>
      <div class="row mt-5">
    <!-- Incubateurs -->
    <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center mb-lg-5 mb-md-4 mb-sm-3 mb-2">
        <div class="card cardSolution">
            <div class="card-header">
                <img src="{{ asset('assets/img1/Rectangle 35.png') }}" alt="Incubateurs" class="img-fluid">
            </div>
            <div class="card-body">
                <h3>Incubateurs</h3>
                <p>
                    Proposez à vos startups un accompagnement révolutionnaire avec 
                    des agents IA spécialisés et des outils de mentorat innovants.
                </p>
            </div>
        </div>
    </div>

    <!-- PME/Startup -->
    <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center mb-lg-5 mb-md-4 mb-sm-3 mb-2">
        <div class="card cardSolution mt-150">
            <div class="card-header">
                <img src="{{ asset('assets/img1/startup.png') }}" alt="PME/Startup" class="img-fluid" width="592" height="355">
            </div>
            <div class="card-body">
                <h3>PME/Startup</h3>
                <p>
                    Accélérez votre croissance avec des agents IA personnalisés, 
                    des avatars 3D et un écosystème complet d'outils entrepreneuriaux.
                </p>
            </div>
        </div>
    </div>

    <!-- Organisme de Formation -->
    <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center mb-lg-5 mb-md-4 mb-sm-3 mb-2">
        <div class="card cardSolution ">
            <div class="card-header">
                <img src="{{ asset('assets/img1/test.png') }}" alt="Organisme de Formation" class="img-fluid" width="592" height="355">
            </div>
            <div class="card-body">
                <h3>Organisme de Formation</h3>
                <p>
                    Créez des parcours de formation innovants avec des agents IA formateurs, 
                    des webinaires interactifs et des outils pédagogiques avancés.
                </p>
            </div>
        </div>
    </div>
    
</div>

    </div>
</section>

<!--section 4-->
<section id="Tarifs">
    <div class="container">
        <div class="section-title">
            <h2>Une grille claire, sans surprise</h2>
        </div>
        <div class="row mt-5">
            <div class="col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center mb-5">
                <div class="card cardTarif premium">
                    <div class="card-header">
                        <img src="{{asset('assets/img1/F-Shoppingmode.png')}}" alt="">
                        <h3>Marque Blanche</h3>
                        <p>Solution personnalisée 100%</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/>
Personnalisation complète</h4>
                            </div>
                            
                             <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/>Votre branding intégré</h4>
                            </div>
                             <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/> Déploiement sur vos serveurs</h4>
                            </div>

                              <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/> Formation équipe dédiée</h4>
                            </div>

                            <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/> Intégrations sur mesure</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100 py-3">Prendre cette offre</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center mb-5">
                <div class="card cardTarif">
                    <div class="card-header">
                        <img src="{{asset('assets/img1/F-Cloud.png')}}" alt="">
                        <h3>Licence SaaS</h3>
                        <p>Solution hébergée et managée</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/>
Accès complet à tous les agents IA</h4>
                            </div>
                            
                             <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/>Avatars 3D illimités</h4>
                            </div>
                             <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/>Marketplace et sandbox inclus</h4>
                            </div>

                              <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/> Support prioritaire 24/7</h4>
                            </div>

                            <div class="col-12 mb-2">
                                <h4><img src="/assets/img1/valide.png"style="
    width: 20px;
    height: 20px;
"/> Mises à jour automatiques</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100 py-3">Prendre cette offre</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!--section 5-->
<section id="faq">
    <div class="container">
        <div class="section-title">
            <h2>Questions fréquentes</h2>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Puis-je ajouter mon logo et mes couleurs ?
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                    Oui, vous pouvez entièrement personnaliser votre espace de formation avec votre logo, vos couleurs, et même votre charte graphique. L’objectif est de vous offrir une plateforme à votre image, que vous soyez un formateur indépendant, un organisme ou une entreprise.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Qu'est-ce qui différencie BraindCode des autres plateformes d'accompagnement ?
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                   Notre plateforme intègre des agents IA personnalisés avec avatars 3D, mémoire RAG et voix synthétique. Contrairement aux solutions traditionnelles, nous offrons une expérience immersive et automatisée 24/7.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Est-ce hébergé ou installé chez moi ?
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                    La plateforme est hébergée sur des serveurs sécurisés en cloud (AWS ). Toutefois, une version auto-hébergée est possible pour les grandes structures ou les projets nécessitant une installation en interne.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Puis-je suivre les résultats de mes apprenants ?
                            </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                    Absolument. Vous avez accès à un tableau de bord complet vous permettant de : <br>
                                    • suivre les résultats par apprenant,
                                    • visualiser les taux de complétion,
                                    • générer des certificats automatiques,
                                    • et obtenir des rapports détaillés d’activité et de performance.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Combien de temps dure une formation ?
                            </button>
                        </h2>
                        <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                    La durée dépend du contenu et de l’objectif pédagogique. Vous pouvez créer des formations courtes (micro-learning de quelques minutes) ou des parcours complets étalés sur plusieurs semaines/mois. C’est vous qui décidez du rythme.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                Puis-je vendre mes formations en ligne ?
                            </button>
                        </h2>
                        <div id="collapse6" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>
                                    Oui. BraindCode Formation intègre une marketplace ou un espace boutique personnalisé.
                                    Vous pouvez : <br>
                                    • fixer vos prix,
                                    • proposer des codes promo,
                                    • gérer les paiements (Stripe)
                                    • et suivre vos ventes en temps réel.

                                </p>
                            </div>
                        </div>
                    </div>
                    
                  
                  
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section('script')
<script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"></script>


@endsection