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
    const sections = [
      {
        id: "hero",
        element: heroElement,
        startColor: { r: 245, g: 248, b: 255 },
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
    ].filter((section) => section.element);

    function updateBackground() {
      const viewportCenter = window.innerHeight / 2;
      let newBackgroundColor = "";

      for (let i = 0; i < sections.length; i++) {
        const {
          element: el,
          dynamic,
          startColor,
          endColor,
          color,
        } = sections[i];
        const rect = el.getBoundingClientRect();

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          if (dynamic) {
            const halfway = rect.top + rect.height / 2;
            newBackgroundColor =
              viewportCenter < halfway
                ? `rgb(${startColor.r}, ${startColor.g}, ${startColor.b})`
                : `rgb(${endColor.r}, ${endColor.g}, ${endColor.b})`;
          } else {
            newBackgroundColor = color;
          }
          break;
        }
      }

      if (document.body.style.backgroundColor !== newBackgroundColor) {
        document.body.style.backgroundColor = newBackgroundColor;
      }
    }

    window.addEventListener("scroll", updateBackground, { passive: true });
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

  const centerTransform = "translate(-50%, -50%)";

  function setCursorDotScale(scaleValue) {
    cursorDot.style.transform = `${centerTransform} scale(${scaleValue})`;
  }

  function setCursorOutlineScale(scaleValue) {
    cursorOutline.style.transform = `${centerTransform} scale(${scaleValue})`;
  }

  function setCursorOutlineOpacity(opacityValue) {
    cursorOutline.style.opacity = opacityValue;
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${Math.floor(mouseX)}px`;
    cursorDot.style.top = `${Math.floor(mouseY)}px`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    cursorOutline.style.left = `${Math.floor(outlineX)}px`;
    cursorOutline.style.top = `${Math.floor(outlineY)}px`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      setCursorDotScale(0.01);
      setCursorOutlineScale(1.8);
      setCursorOutlineOpacity("1");
    } else if (e.button === 2) {
      setCursorDotScale(0.7);
      setCursorOutlineOpacity("1");
    }
  });

  document.addEventListener("mouseup", () => {
    setCursorDotScale(1);
    setCursorOutlineOpacity("0");
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

  document.addEventListener("mouseover", (e) => {
    const link = e.target.closest("a");
    if (link) {
      setCursorDotScale(0.01);
      setCursorOutlineScale(1.8);
      setCursorOutlineOpacity("1");
    }
  });

  document.addEventListener("mouseout", (e) => {
    const link = e.target.closest("a");
    if (link) {
      setCursorDotScale(1);
      setCursorOutlineOpacity("0");
    }
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
