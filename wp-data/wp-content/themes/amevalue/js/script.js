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

  setTimeout(openPromo, 35000); // TIME default: 35000

  //  SLIDER
  function initSlider(slider, leftBtn, rightBtn) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let lastX;
    let lastTime;
    let velocity = 0;
    let momentumID;

    if (leftBtn) {
      leftBtn.addEventListener("click", (e) => {
        e.preventDefault();
        slider.scrollBy({
          left: 450,
          behavior: "smooth",
        });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("click", (e) => {
        e.preventDefault();
        slider.scrollBy({
          left: -450,
          behavior: "smooth",
        });
      });
    }

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
  }

  const oldSlider = document.querySelector(".game-plan__container");
  const leftBtn = document.querySelector(".game-plan__button--left");
  const rightBtn = document.querySelector(".game-plan__button--right");
  if (oldSlider) {
    initSlider(oldSlider, leftBtn, rightBtn);
  }

  const mobileSlider = document.querySelector(
    ".why-choose-us-mobile__container"
  );
  if (mobileSlider) {
    initSlider(mobileSlider);
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
  let customCursorInitialized = false;
  let cursorDot = null;
  let cursorOutline = null;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  let moveHandler,
    mousedownHandler,
    mouseupHandler,
    winMouseOutHandler,
    winMouseOverHandler,
    linkMouseOverHandler,
    linkMouseOutHandler;

  const centerTransform = "translate(-50%, -50%)";

  function setCursorDotScale(scaleValue) {
    if (cursorDot)
      cursorDot.style.transform = `${centerTransform} scale(${scaleValue})`;
  }

  function setCursorOutlineScale(scaleValue) {
    if (cursorOutline)
      cursorOutline.style.transform = `${centerTransform} scale(${scaleValue})`;
  }

  function setCursorOutlineOpacity(opacityValue) {
    if (cursorOutline) cursorOutline.style.opacity = opacityValue;
  }

  function initCustomCursor() {
    if (customCursorInitialized) return;
    customCursorInitialized = true;

    cursorDot = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    document.body.appendChild(cursorDot);

    cursorOutline = document.createElement("div");
    cursorOutline.classList.add("cursor-dot-outline");
    document.body.appendChild(cursorOutline);

    moveHandler = function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = `${Math.floor(mouseX)}px`;
        cursorDot.style.top = `${Math.floor(mouseY)}px`;
      }
    };

    mousedownHandler = function (e) {
      if (e.button === 0) {
        setCursorDotScale(0.01);
        setCursorOutlineScale(1.8);
        setCursorOutlineOpacity("1");
      } else if (e.button === 2) {
        setCursorDotScale(0.7);
        setCursorOutlineOpacity("1");
      }
    };

    mouseupHandler = function () {
      setCursorDotScale(1);
      setCursorOutlineOpacity("0");
    };

    winMouseOutHandler = function (e) {
      if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
        if (cursorDot) cursorDot.style.opacity = "0";
        if (cursorOutline) cursorOutline.style.opacity = "0";
      }
    };

    winMouseOverHandler = function () {
      if (cursorDot) cursorDot.style.opacity = "1";
    };

    linkMouseOverHandler = function (e) {
      const link = e.target.closest("a");
      if (link) {
        setCursorDotScale(0.01);
        setCursorOutlineScale(1.8);
        setCursorOutlineOpacity("1");
      }
    };

    linkMouseOutHandler = function (e) {
      const link = e.target.closest("a");
      if (link) {
        setCursorDotScale(1);
        setCursorOutlineOpacity("0");
      }
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mousedown", mousedownHandler);
    document.addEventListener("mouseup", mouseupHandler);
    window.addEventListener("mouseout", winMouseOutHandler);
    window.addEventListener("mouseover", winMouseOverHandler);
    document.addEventListener("mouseover", linkMouseOverHandler);
    document.addEventListener("mouseout", linkMouseOutHandler);

    (function animateOutline() {
      if (!customCursorInitialized) return;
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;
      if (cursorOutline) {
        cursorOutline.style.left = `${Math.floor(outlineX)}px`;
        cursorOutline.style.top = `${Math.floor(outlineY)}px`;
      }
      requestAnimationFrame(animateOutline);
    })();
  }

  function destroyCustomCursor() {
    if (!customCursorInitialized) return;
    customCursorInitialized = false;

    // Remove elements
    if (cursorDot) {
      cursorDot.remove();
      cursorDot = null;
    }
    if (cursorOutline) {
      cursorOutline.remove();
      cursorOutline = null;
    }

    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mousedown", mousedownHandler);
    document.removeEventListener("mouseup", mouseupHandler);
    window.removeEventListener("mouseout", winMouseOutHandler);
    window.removeEventListener("mouseover", winMouseOverHandler);
    document.removeEventListener("mouseover", linkMouseOverHandler);
    document.removeEventListener("mouseout", linkMouseOutHandler);
  }

  function checkScreenWidth() {
    if (window.innerWidth >= 1200) {
      initCustomCursor();
    } else {
      destroyCustomCursor();
    }
  }

  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);

  // MOVE TEXT FROM SPAN TO TITLE
  if (window.innerWidth < 1200) {
    document.querySelectorAll(".game-plan__item").forEach(function (item) {
      const titleEl = item.querySelector(".game-plan__item-title");
      const daysSpan = item.querySelector(
        ".game-plan__item-text .game-plan__item-days"
      );

      if (titleEl && daysSpan) {
        let daysText = daysSpan.textContent.trim();
        if (!daysText.startsWith("(")) {
          daysText = "(" + daysText + ")";
        }
        titleEl.textContent = titleEl.textContent.trim() + " " + daysText;
        daysSpan.remove();

        const textEl = item.querySelector(".game-plan__item-text");
        if (textEl && textEl.textContent.trim() === "") {
          textEl.remove();
        }
      }
    });
  }

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
