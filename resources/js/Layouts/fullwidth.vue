<template>
   <!-- <AppHeader :canLogin="true" :canRegister="true" />-->
    <div class="auth-section h-full">
         <div class="flex flex-wrap">
            <!-- Colonne 1 : visible uniquement sur md+ -->
            <div class="hidden md:block md:w-4/12 lg:w-4/12 left">
                <img src="/assets/img1/left.png" alt="" class="bg">
                <img src="/assets/img1/logoMarketplace.png" alt="" class="logo">
            </div>

            <!-- Colonne 2 : toujours visible, 100% sur mobile -->
              <slot />
            
        </div>
    </div>
    <!--<div class="w-full" >
      <Footer class="mt-12" />
    </div>-->
</template>
  
  <script>
  export default {
    name: "FullWidthLayout",
    mounted() {
      // Charger dynamiquement les CSS
      this.loadStyles([

        "/assets/css1/auth.css",
        "/assets/css1/style.css",
      "/assets/css1/header.css",
      ]);
  
      // Charger dynamiquement les JS
      this.loadScripts([
        "https://code.iconify.design/3/3.1.0/iconify.min.js",
        "/assets/vendor/libs/jquery/jquery.js",
        "/assets/vendor/libs/popper/popper.js",
        "/assets/vendor/js/bootstrap.js",
        "/assets/vendor/libs/node-waves/node-waves.js",
        "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
        "/assets/vendor/libs/hammer/hammer.js",
        "/assets/vendor/libs/i18n/i18n.js",
        "/assets/vendor/libs/typeahead-js/typeahead.js",
        "/assets/vendor/js/menu.js",
        "/assets/vendor/libs/plyr/plyr.js",
        "/assets/js/main.js",
      ]);
    },
    methods: {
      loadStyles(urls) {
        urls.forEach(url => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          document.head.appendChild(link);
        });
      },
      loadScripts(urls) {
        urls.forEach(url => {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          document.body.appendChild(script);
        });
      }
    }
  };
  </script>
<style scoped>
/* Additional animations for page transitions */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.min-h-screen {
    animation: fadeIn 0.6s ease-out;
}
body {
    height: 100vh;
}
</style>
  