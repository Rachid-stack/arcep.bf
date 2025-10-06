// === main.js ===
// Assure-toi que jQuery et Swiper.js sont bien inclus avant ce fichier
// Exemple dans ton HTML :
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
// <script src="Api.js"></script>
// <script src="main.js"></script>

$(document).ready(function () {
    console.log("Frontend ready...");

    // Charger les bannières dans le slider
    loadBannersToSlider();

    // Exemple : charger et afficher la FAQ
    getFaqs().then((faqs) => {
        if (faqs.error) return;
        let faqContainer = $("#faq-container");
        if (faqContainer.length) {
            faqContainer.empty();
            faqs.forEach((faq) => {
                faqContainer.append(`
                    <div class="border-b py-4">
                        <h3 class="font-semibold">${faq.question}</h3>
                        <p class="text-gray-600">${faq.answer}</p>
                    </div>
                `);
            });
        }
    });

    // Exemple : afficher agences dans la console
    getAgencies().then((agences) => {
        if (agences.error) return;
        console.log("🌍 Agences:", agences);
    });

    // Charger paramètres cookies
    getCookieSettings().then((cookies) => {
        if (!cookies.error && cookies.enabled) {
            $("#cookie-banner").removeClass("hidden");
        }
    });

    // Boutons d’actions cookies
    $(document).on("click", "#acceptCookies", function () {
        localStorage.setItem("cookiesAccepted", true);
        $("#cookie-banner").fadeOut();
    });

    $(document).on("click", "#rejectCookies", function () {
        localStorage.setItem("cookiesAccepted", false);
        $("#cookie-banner").fadeOut();
    });
});
