const API_BASE = "http://acep_back_office_v2.test/api/v1"; // 🔄 adapte ton domaine

/**
 * Fonction générique pour faire une requête API
 * @param {String} method - GET, POST, PUT, DELETE
 * @param {String} endpoint - ex: "/banners"
 * @param {Object} data - données envoyées (pour POST/PUT)
 * @param {Boolean} auth - si true → ajoute un token d’auth
 */
function apiRequest(method, endpoint, data = {}, auth = false) {
    return $.ajax({
        url: API_BASE + endpoint,
        method: method,
        data: method === "GET" ? data : JSON.stringify(data),
        contentType:
            method === "GET"
                ? "application/x-www-form-urlencoded; charset=UTF-8"
                : "application/json",
        dataType: "json",
        headers: {
            Accept: "application/json",
            ...(auth && { Authorization: "Bearer " + localStorage.getItem("token") }),
        },
    })
        .then(function (response) {
            return response; // succès
        })
        .catch(function (xhr) {
            console.error("API Error:", xhr.responseJSON || xhr.responseText);
            return { error: true, details: xhr.responseJSON || xhr };
        });
}

//
// === Fonctions spécifiques par module ===
//

// 🔹 Paramètres généraux
function getSettings() {
    return apiRequest("GET", "/settings");
}

// 🔹 Bannières (slider)
function getBanners() {
    return apiRequest("GET", "/banners");
}

function getBanner(id) {
    return apiRequest("GET", `/banners/${id}`);
}

/**
 * Injecte dynamiquement les bannières dans le slider Swiper
 */
function loadBannersToSlider() {
    getBanners().then((data) => {
        if (data.error) return;

        let wrapper = $(".swiper-wrapper");
        wrapper.empty();

        data.forEach((banner) => {
            // si la bannière a plusieurs images
            if (banner.images && banner.images.length > 1) {
                let subSlides = banner.images
                    .map(
                        (img) => `
                        <div class="swiper-slide">
                            <img src="${img}" class="w-full h-[500px] object-cover">
                        </div>
                    `
                    )
                    .join("");

                wrapper.append(`
                    <div class="swiper-slide relative">
                        <div class="swiper sub-swiper h-[500px]">
                            <div class="swiper-wrapper">
                                ${subSlides}
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                        <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
                            <h2 class="text-3xl md:text-5xl font-bold mb-4">${banner.title}</h2>
                            <p class="text-lg md:text-xl mb-6">${banner.content ?? ""}</p>
                            <a href="#" class="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400">En savoir plus</a>
                        </div>
                    </div>
                `);
            } else {
                // sinon → une seule image
                let image =
                    banner.images && banner.images.length > 0
                        ? banner.images[0]
                        : "https://via.placeholder.com/1200x500";

                wrapper.append(`
                    <div class="swiper-slide relative">
                        <img src="${image}" class="w-full h-[500px] object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
                            <h2 class="text-3xl md:text-5xl font-bold mb-4" style="color:#c2ffdd">${banner.title}</h2>
                            <p class="text-lg md:text-xl mb-6" style="color:white">${banner.content ?? ""}</p>
                            <a href="#" class="btn-primary py-2" style="background-color:#338256">En savoir plus</a>
                        </div>
                    </div>
                `);
            }
        });

        // Swiper principal
        new Swiper(".swiper", {
            loop: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            autoplay: { delay: 5000 },
        });

        // Swiper interne (multi-images par bannière)
        $(".sub-swiper").each(function (index, el) {
            new Swiper(el, {
                loop: true,
                pagination: {
                    el: $(el).find(".swiper-pagination")[0],
                    clickable: true,
                },
                autoplay: { delay: 4000 },
            });
        });
    });
}

// 🔹 FAQ
function getFaqs() {
    return apiRequest("GET", "/faqs");
}

// 🔹 Pages statiques
function getPage(slug) {
    return apiRequest("GET", `/pages/${slug}`);
}

// 🔹 Agences
function getAgencies() {
    return apiRequest("GET", "/agencies");
}

function getAgency(id) {
    return apiRequest("GET", `/agencies/${id}`);
}

// 🔹 Simulateur (côté visiteur)
function getSimulatorSettings() {
    return apiRequest("GET", "/simulator/settings");
}

function simulateCredit(data) {
    return apiRequest("POST", "/simulator/simulate", data);
}

// 🔹 Cookies
function getCookieSettings() {
    return apiRequest("GET", "/cookies/settings");
}
