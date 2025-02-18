document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".header__burger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".header__overlay");
  const closeButton = document.querySelector(".sidebar__close-button");
  const body = document.body;
  const header = document.querySelector(".header");
  const yearElement = document.querySelector(".footer__year");

  // FOOTER YEAR
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // SIDEBAR WITH OVERLAY
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function openMenu() {
    const scrollBarWidth = getScrollbarWidth();
    body.style.maxWidth = window.innerWidth - scrollBarWidth + "px";
    header.style.paddingRight = scrollBarWidth + "px";
    sidebar.classList.add("sidebar--active");
    overlay.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    sidebar.classList.remove("sidebar--active");
    overlay.classList.remove("active");
    body.style.overflow = "";
    body.style.paddingRight = "";
    header.style.paddingRight = "";
  }

  burgerButton.addEventListener("click", function (e) {
    e.preventDefault();
    openMenu();
  });

  closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu();
  });

  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu();
  });

  // PROMO
  const promo = document.querySelector(".promo");
  const promoOverlay = document.querySelector(".promo__overlay");
  const promoClose = document.querySelector(".promo__close-button");
  const promoOpen = document.querySelector(".promo__open-button");

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function openPromo() {
    if (promo.classList.contains("promo--active")) return;

    const scrollBarWidth = getScrollbarWidth();
    document.body.style.maxWidth = window.innerWidth - scrollBarWidth + "px";
    document.body.style.overflow = "hidden";
    promo.classList.add("promo--active");
  }

  function closePromo() {
    promo.classList.remove("promo--active");
    document.body.style.overflow = "";
    document.body.style.maxWidth = "";
  }

  if (promoOpen) {
    promoOpen.addEventListener("click", function (e) {
      e.preventDefault();
      openPromo();
    });
  }

  if (promoClose) {
    promoClose.addEventListener("click", function (e) {
      e.preventDefault();
      closePromo();
    });
  }

  if (promoOverlay) {
    promoOverlay.addEventListener("click", function (e) {
      e.preventDefault();
      closePromo();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && promo.classList.contains("promo--active")) {
      closePromo();
    }
  });

  setTimeout(openPromo, 35000); // TIME

  //  SLIDER
  const slider = document.querySelector(".game-plan__container");
  const leftBtn = document.querySelector(".game-plan__button--left");
  const rightBtn = document.querySelector(".game-plan__button--right");

  let isDown = false;
  let startX;
  let scrollLeft;
  let lastX;
  let lastTime;
  let velocity = 0;
  let momentumID;

  leftBtn.addEventListener("click", (e) => {
    e.preventDefault();
    slider.scrollBy({
      left: 450,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", (e) => {
    e.preventDefault();
    slider.scrollBy({
      left: -450,
      behavior: "smooth",
    });
  });

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    lastX = e.pageX;
    lastTime = Date.now();
    velocity = 0;

    cancelAnimationFrame(momentumID);
  });

  slider.addEventListener("mouseleave", () => {
    if (isDown) {
      isDown = false;
      slider.classList.remove("active");
      startMomentum();
    }
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
    startMomentum();
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const dx = e.pageX - lastX;
      velocity = dx / dt;
      lastX = e.pageX;
      lastTime = now;
    }
  });

  function startMomentum() {
    const friction = 0.95;
    const minVelocity = 0.02;

    function momentumStep() {
      slider.scrollLeft -= velocity * 16;
      velocity *= friction;
      if (Math.abs(velocity) > minVelocity) {
        momentumID = requestAnimationFrame(momentumStep);
      }
    }

    momentumStep();
  }

  //BACKGROUND COLOR CHANGE
  const heroElement = document.getElementById("hero");
  if (heroElement) {
    function updateBackground() {
      const viewportCenter = window.innerHeight / 2;
      const sections = [
        {
          id: "hero",
          element: heroElement,
          startColor: { r: 255, g: 255, b: 255 },
          endColor: { r: 230, g: 237, b: 255 },
          dynamic: true,
        },
        {
          id: "why-choose-us",
          element: document.getElementById("why-choose-us"),
          color: "rgb(250, 250, 250)",
        },
        {
          id: "game-plan",
          element: document.getElementById("game-plan"),
          color: "rgb(230, 237, 255)",
        },
        {
          id: "results",
          element: document.getElementById("results"),
          color: "rgb(238, 247, 255)",
        },
        {
          id: "trusted-us",
          element: document.getElementById("trusted-us"),
          color: "rgb(245, 248, 255)",
        },
      ];

      let backgroundSet = false;

      sections.forEach((sectionData) => {
        const el = sectionData.element;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          if (sectionData.dynamic) {
            const t = Math.min(
              Math.max((viewportCenter - rect.top) / rect.height, 0),
              1
            );
            const r = Math.round(
              sectionData.startColor.r +
                (sectionData.endColor.r - sectionData.startColor.r) * t
            );
            const g = Math.round(
              sectionData.startColor.g +
                (sectionData.endColor.g - sectionData.startColor.g) * t
            );
            const b = Math.round(
              sectionData.startColor.b +
                (sectionData.endColor.b - sectionData.startColor.b) * t
            );
            document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          } else {
            document.body.style.backgroundColor = sectionData.color;
          }
          backgroundSet = true;
        }
      });

      if (!backgroundSet) {
        document.body.style.backgroundColor = "";
      }
    }

    window.addEventListener("scroll", updateBackground);
    updateBackground();
  }

  //CURSOR
  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);

  const cursorOutline = document.createElement("div");
  cursorOutline.classList.add("cursor-dot-outline");
  document.body.appendChild(cursorOutline);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.01)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.8)";
      cursorOutline.style.opacity = "1";
    } else if (e.button === 2) {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)";
      cursorOutline.style.opacity = "1";
    }
  });

  document.addEventListener("mouseup", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOutline.style.opacity = "0";
  });

  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
    }
  });

  window.addEventListener("mouseover", () => {
    cursorDot.style.opacity = "1";
  });

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.01)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.8)";
      cursorOutline.style.opacity = "1";
    });
    link.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.opacity = "0";
    });
  });

  //SCROLL ANIMATIONS
  const animatedTitles = document.querySelectorAll(
    ".why-choose-us__title, .game-plan__title, .results__title, .trusted-us__title, .contacts__title"
  );
  const animatedImages = document.querySelectorAll(".why-choose-us__vector");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("why-choose-us__vector")) {
            entry.target.classList.add("animate-from-center");
          } else {
            entry.target.classList.add("animate");
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  animatedTitles.forEach((title) => observer.observe(title));
  animatedImages.forEach((image) => observer.observe(image));
});
