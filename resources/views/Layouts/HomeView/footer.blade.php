<footer class="footer bg-white py-5">
    <div class="container">
        <div class="row gy-4 align-items-start justify-content-between">
            <!-- Colonne 1 : Logo + Description -->
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="mb-2 logo-brand">
                    <img src="{{asset('assets/img1/logoMarket.png')}}" alt="Braindcode Formation" width="179" height="47">
                </div>
                <p class="">
                    La plateforme de formation intelligente qui s’adapte à votre image et à vos besoins
                </p>
                <div class="d-flex gap-3 media mt-2">
                    <a href="#"><i class="bi bi-facebook"></i></a>
                    <a href="#"><i class="bi bi-linkedin"></i></a>
                    <a href="#"><i class="bi bi-youtube"></i></a>
                </div>
            </div>

            <!-- Colonne 2 : Liens utiles -->
            <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                <h6 class="">Liens utiles</h6>
                <ul class="list-unstyled small">
                    <li><a href="{{route('mentions')}}" class="text-decoration-none">Mentions légales</a></li>
                </ul>
            </div>

            <!-- Colonne 3 : Soutien -->
            <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                <h6 class="">Soutien</h6>
                <ul class="list-unstyled small">
                    <li><a href="{{route('contacter')}}" class="text-decoration-none">Contact</a></li>
                    <li><a href="#faq" class="text-decoration-none">FAQ</a></li>
                </ul>
            </div>

            <!-- Colonne 4 : Contact -->
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <h6 class="">Contactez-nous</h6>
                <ul class="list-unstyled small">
                    <li>
                        <a href=""><i class="bi bi-telephone-fill me-2"></i>
                            +33 6 14 18 92 25
                        </a>
                    </li>
                    <li>
                        <a href=""> <i class="bi bi-envelope-fill me-2"></i>
                            contact@braindcode.com
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-12 text-center">
                <p>Développé par <a href="https://braindcode.com/">Braindcode</a> - Tous les droits sont réservés ©</p>
            </div>
        </div>
    </div>
</footer>