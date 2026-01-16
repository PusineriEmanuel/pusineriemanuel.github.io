// ================================================================================
// HEADER SCROLL EFFECT - Efecto backdrop-filter (blur) en navbar al hacer scroll
// ================================================================================
const navbar = document.querySelector("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================================================================================
// MAIN DOM LOADED EVENT - Todo el JavaScript principal
// ================================================================================
document.addEventListener("DOMContentLoaded", function () {
  // ================================================================================
  // MOBILE NAVIGATION MENU - Hamburger menu con overlay y animaciones
  // ================================================================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  // Crear overlay para efecto blur completo (fondo total blur, caja enorme al final de body)
  let overlay = document.querySelector(".menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    menuToggle.classList.add("active");
    navList.classList.add("open");
    overlay.classList.add("active");
    navList.style.overflowY = "auto";
    navList.style.pointerEvents = "all";
    navList.querySelectorAll("li").forEach((li, i) => {
      li.style.transitionDelay = 0.1 + i * 0.1 + "s";
    });
    document.body.style.overflow = "hidden"; // Evita scroll fondo
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    navList.classList.remove("open");
    overlay.classList.remove("active");
    navList.style.overflowY = "hidden";
    navList.style.pointerEvents = "none";
    navList.querySelectorAll("li").forEach((li) => {
      li.style.transitionDelay = "0s";
    });
    document.body.style.overflow = ""; // Restaura scroll fondo
  }

  menuToggle.addEventListener("click", function () {
    if (navList.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  navList
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  // ================================================================================
  // END MOBILE NAVIGATION MENU
  // ================================================================================

  // ================================================================================
  // GALLERY FAN SYSTEM - Galería tipo abanico con auto-rotate y lightbox
  // ================================================================================

  const galleryFan = document.querySelector(".gallery-fan");
  if (galleryFan) {
    const imgs = Array.from(galleryFan.querySelectorAll(".gallery-img"));
    let current = 0;
    let timer = null;

    // --- Gallery Fan Rotation Functions ---
    function updateGalleryFan(idx) {
      imgs.forEach((img, i) => {
        img.classList.remove("active", "left", "right");
        img.style.zIndex = 1;
        img.style.pointerEvents = "none";
      });
      const total = imgs.length;
      imgs[idx].classList.add("active");
      imgs[idx].style.zIndex = 3;
      imgs[idx].style.pointerEvents = "auto";
      imgs[(idx - 1 + total) % total].classList.add("left");
      imgs[(idx + 1) % total].classList.add("right");
      imgs[(idx - 1 + total) % total].style.zIndex = 2;
      imgs[(idx + 1) % total].style.zIndex = 2;
      imgs[(idx - 1 + total) % total].style.pointerEvents = "auto";
      imgs[(idx + 1) % total].style.pointerEvents = "auto";
    }

    function nextGalleryFan() {
      current = (current + 1) % imgs.length;
      updateGalleryFan(current);
    }

    function prevGalleryFan() {
      current = (current - 1 + imgs.length) % imgs.length;
      updateGalleryFan(current);
    }

    // --- Auto-rotate Timer ---
    function startGalleryFan() {
      timer = setInterval(nextGalleryFan, 4000);
    }
    function stopGalleryFan() {
      clearInterval(timer);
    }

    galleryFan.addEventListener("mouseenter", stopGalleryFan);
    galleryFan.addEventListener("mouseleave", startGalleryFan);

    // --- Lightbox Modal System ---
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("galleryLightboxImg");
    const lightboxClose = document.getElementById("galleryLightboxClose");
    const lightboxPrev = document.getElementById("galleryLightboxPrev");
    const lightboxNext = document.getElementById("galleryLightboxNext");

    function openLightbox(idx) {
      const imgTag = imgs[idx].querySelector("img");
      lightboxImg.src = imgTag.src;
      lightboxImg.alt = imgTag.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      lightboxImg.dataset.idx = idx;
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function showLightboxImg(idx) {
      const imgTag = imgs[idx].querySelector("img");
      lightboxImg.src = imgTag.src;
      lightboxImg.alt = imgTag.alt;
      lightboxImg.dataset.idx = idx;
    }

    // --- Lightbox Event Listeners ---
    imgs.forEach((img, i) => {
      img.addEventListener("click", () => {
        openLightbox(i);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxPrev.addEventListener("click", () => {
      let idx = parseInt(lightboxImg.dataset.idx, 10);
      idx = (idx - 1 + imgs.length) % imgs.length;
      showLightboxImg(idx);
    });

    lightboxNext.addEventListener("click", () => {
      let idx = parseInt(lightboxImg.dataset.idx, 10);
      idx = (idx + 1) % imgs.length;
      showLightboxImg(idx);
    });

    // --- Lightbox Keyboard and Click Controls ---
    // Cerrar con fondo click o ESC
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev.click();
      if (e.key === "ArrowRight") lightboxNext.click();
    });

    // --- Initialize Gallery ---
    updateGalleryFan(current);
    startGalleryFan();
  }

  // ================================================================================
  // END GALLERY FAN SYSTEM
  // ================================================================================

  // ================================================================================
  // SCROLL TO TOP BUTTON - Botón flotante para ir arriba
  // ================================================================================

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Mostrar solo si NO está arriba de todo y NO está abajo de todo
    if (
      scrollY > 10 &&
      scrollY + windowHeight < docHeight - 10 // 10px de tolerancia
    ) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================================================================================
  // END SCROLL TO TOP BUTTON
  // ================================================================================

  // ================================================================================
  // INTERACTIVE MAP SYSTEM - OpenStreetMap con Leaflet para reservas
  // ================================================================================

  // --- Map Initialization ---
  // Centra en Chascomús por defecto
  var defaultCoords = [-35.5725, -58.0094];
  var map = L.map("map").setView(defaultCoords, 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var userMarker, destMarker, userPos, destPos;

  // --- User Location Detection ---
  // Intenta obtener la ubicación del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      userPos = [position.coords.latitude, position.coords.longitude];
      map.setView(userPos, 13);
      userMarker = L.marker(userPos, { title: "Tu ubicación" })
        .addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();
    });
  }

  // --- Destination Selection ---
  // Click en el mapa para elegir destino
  map.on("click", function (e) {
    destPos = [e.latlng.lat, e.latlng.lng];
    if (destMarker) map.removeLayer(destMarker);
    destMarker = L.marker(destPos, { title: "Destino" })
      .addTo(map)
      .bindPopup("Destino")
      .openPopup();
    document.getElementById("sendRouteBtn").style.display = "inline-block";
  });

  // --- Address Search System ---
  // Agregar buscador de direcciones
  if (typeof L.Control.Geocoder !== "undefined") {
    var geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Buscar dirección...",
      errorMessage: "No se encontró la dirección",
      geocoder: L.Control.Geocoder.nominatim(),
    })
      .on("markgeocode", function (e) {
        var bbox = e.geocode.bbox;
        var center = e.geocode.center;
        map.fitBounds(bbox);
        // Coloca el marcador de destino y muestra el botón de WhatsApp
        if (destMarker) map.removeLayer(destMarker);
        destPos = [center.lat, center.lng];
        destMarker = L.marker(destPos, { title: "Destino" })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        document.getElementById("sendRouteBtn").style.display = "inline-block";
      })
      .addTo(map);
  }

  // --- WhatsApp Integration ---
  // Botón para enviar por WhatsApp
  document.getElementById("sendRouteBtn").onclick = function () {
    if (!destPos) return;
    let origin = userPos ? userPos : defaultCoords;
    const osmUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${origin[0]},${origin[1]};${destPos[0]},${destPos[1]}`;
    const msg = `Hola, quiero reservar un viaje desde mi ubicación hasta este destino: ${osmUrl}`;
    const waUrl = `https://wa.me/5492241559511?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  // ================================================================================
  // END INTERACTIVE MAP SYSTEM
  // ================================================================================

  // ================================================================================
  // RESPONSIVE LAYOUT HANDLER - Mueve bloque de aeropuerto en mobile
  // ================================================================================

  function moveAirportBlockForMobile() {
    const heroContent = document.querySelector(".hero-content");
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");
    const airportBlock = document.getElementById("viajasAAeroparqueBloque");

    if (!heroContent || !heroText || !heroImage || !airportBlock) return;

    if (window.innerWidth <= 600) {
      // Si está dentro de hero-text, lo movemos después de la imagen
      if (airportBlock.parentElement === heroText) {
        heroContent.insertBefore(airportBlock, heroImage.nextSibling);
      }
    } else {
      // Si está fuera de hero-text, lo devolvemos a hero-text
      if (airportBlock.parentElement === heroContent) {
        heroText.appendChild(airportBlock);
      }
    }
  }

  // --- Responsive Event Listeners ---
  // Ejecutar al cargar y al redimensionar
  window.addEventListener("DOMContentLoaded", moveAirportBlockForMobile);
  window.addEventListener("resize", moveAirportBlockForMobile);

  // ================================================================================
  // END RESPONSIVE LAYOUT HANDLER
  // ================================================================================

  // ================================================================================
  // END OF MAIN DOM LOADED EVENT
  // ================================================================================
});
