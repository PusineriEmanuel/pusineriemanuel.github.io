const navbar = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // El usuario está desplazándose hacia abajo
    navbar.classList.add("scrolled");
  } else {
    // El usuario está desplazándose hacia arriba
    navbar.classList.remove("scrolled");
  }
  lastScrollTop = scrollTop;
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  // Crear overlay si no existe
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

  // Galería tipo abanico: auto-rotate + lightbox
  const galleryFan = document.querySelector(".gallery-fan");
  if (galleryFan) {
    const imgs = Array.from(galleryFan.querySelectorAll(".gallery-img"));
    let current = 0;
    let timer = null;

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

    // Auto-rotate
    function startGalleryFan() {
      timer = setInterval(nextGalleryFan, 4000);
    }
    function stopGalleryFan() {
      clearInterval(timer);
    }

    galleryFan.addEventListener("mouseenter", stopGalleryFan);
    galleryFan.addEventListener("mouseleave", startGalleryFan);

    // Lightbox
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

    updateGalleryFan(current);
    startGalleryFan();
  }
});
