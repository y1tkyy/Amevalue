document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".header__burger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".header__overlay");
  const closeButton = document.querySelector(".sidebar__close-button");
  const body = document.body;
  const header = document.querySelector(".header");
  const yearElement = document.querySelector(".footer__year");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  //FAQ
  const faqItems = document.querySelectorAll(".faq__item");

  if (faqItems.length) {
    faqItems[0].classList.add("faq__item--active");
  }

  faqItems.forEach((item, index) => {
    const titleElement = item.querySelector(".faq__item-title");
    if (titleElement) {
      titleElement.textContent = `${index + 1}) ${titleElement.textContent}`;
    }
  });

  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (item.classList.contains("faq__item--active")) {
        item.classList.remove("faq__item--active");
      } else {
        faqItems.forEach((i) => i.classList.remove("faq__item--active"));
        item.classList.add("faq__item--active");
      }
    });
  });

  // FOOTER YEAR
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // HERO BG IMAGE
  let heroContent = document.querySelector(".hero__content");

  let bgImage = new Image();

  bgImage.src =
    "./wp-content/themes/amevalue/assets/images/background_map.webp";

  bgImage.onload = function () {
    heroContent.style.backgroundImage = "url('" + bgImage.src + "')";
  };

  // SIDEBAR WITH OVERLAY
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        closeMenu();
      } else {
        closeMenu();
      }
    });
  });

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
if (window.location.pathname.indexOf("/wp-admin") === -1) {
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

  setTimeout(openPromo, 5000); // default 35000

  const form = document.querySelector(".promo__form");

  if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const sendButton = document.querySelector(".promo__button");

    // Create error elements for name and email
    const nameError = document.createElement("p");
    nameError.textContent = "Required field";
    nameError.classList.add("promo__error-field");
    nameError.style.display = "none";
    nameInput.parentNode.appendChild(nameError);

    const emailError = document.createElement("p");
    emailError.textContent = "Required field";
    emailError.classList.add("promo__error-field");
    emailError.style.display = "none";
    emailInput.parentNode.appendChild(emailError);

    // Create global error element
    const globalError = document.createElement("div");
    globalError.classList.add("promo__error-global");
    globalError.style.display = "none";

    const errorText = document.createElement("p");
    errorText.textContent = "Please fill out all required fields";
    errorText.classList.add("promo__error-text");

    globalError.appendChild(errorText);
    form.insertBefore(globalError, sendButton);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.style.display = "block";
        nameInput.classList.add("promo__input--error");
        isValid = false;
      } else {
        nameError.style.display = "none";
        nameInput.classList.remove("promo__input--error");
      }

      if (!emailInput.value.trim()) {
        emailError.style.display = "block";
        emailInput.classList.add("promo__input--error");
        isValid = false;
      } else {
        emailError.style.display = "none";
        emailInput.classList.remove("promo__input--error");
      }

      if (!isValid) {
        globalError.style.display = "block";
        return;
      }

      // If valid, prepare and send the AJAX request
      let action = form.getAttribute("data-form-action");
      if (!action) {
        // Fallback if the data attribute is missing
        action = "/wp-admin/admin-ajax.php";
      }
      let formData = new FormData(form);
      formData.append("action", "send_custom_form"); // Important for your AJAX handler

      fetch(action, {
        method: "POST",
        body: formData
      })
        .then((response) => response.text())
        .then((result) => {
          // Update UI after successful submission
          nameInput.style.display = "none";
          emailInput.style.display = "none";
          sendButton.style.display = "none";
          errorText.textContent = "Thank you!";
          globalError.style.display = "block";
          globalError.style.backgroundColor = "#62C584";
        })
        .catch((error) => {
          console.error(error);
          // Optionally, show an error message
          errorText.textContent = "An error occurred. Please try again.";
          globalError.style.display = "block";
          globalError.style.backgroundColor = "#ff0000";
        });
    });
  }
}


  //SUCCESS
  function openSuccessWindow() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const successWindow = document.querySelector(".success");
    if (successWindow) {
      successWindow.classList.add("success--active");
    }
  }

  function closeSuccessWindow() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    const successWindow = document.querySelector(".success");
    if (successWindow) {
      successWindow.classList.remove("success--active");
    }
  }

  const successCloseButton = document.querySelector(".success__close-button");
  const successOverlay = document.querySelector(".success__overlay");

  if (successCloseButton) {
    successCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeSuccessWindow();
    });
  }

  if (successOverlay) {
    successOverlay.addEventListener("click", closeSuccessWindow);
  }

  // CONTACTS FORM
  const contactsForm = document.querySelector(".contacts__form");
  if (contactsForm) {
    const nameInput = contactsForm.querySelector("#name");
    const questionTextarea = contactsForm.querySelector("#question");
    const contactInput = contactsForm.querySelector("#contact");
    const privacyCheckbox = contactsForm.querySelector("#privacy");

    contactsForm.addEventListener("submit", (e) => {
      let isValid = true;

      const nameGroup = nameInput.parentNode;
      if (!nameInput.value.trim()) {
        nameGroup.classList.remove("hide-error-message");
        nameGroup.classList.add("error");
        nameGroup.setAttribute("data-error", "Please fill out this field");
        isValid = false;
      } else {
        nameGroup.classList.remove("error");
        nameGroup.removeAttribute("data-error");
        nameGroup.classList.remove("hide-error-message");
      }

      const questionGroup = questionTextarea.parentNode;
      if (!questionTextarea.value.trim()) {
        questionGroup.classList.remove("hide-error-message");
        questionGroup.classList.add("error");
        questionGroup.setAttribute("data-error", "Please fill out this field");
        isValid = false;
      } else {
        questionGroup.classList.remove("error");
        questionGroup.removeAttribute("data-error");
        questionGroup.classList.remove("hide-error-message");
      }

      const contactGroup = contactInput.parentNode;
      if (!contactInput.value.trim()) {
        contactGroup.classList.remove("hide-error-message");
        contactGroup.classList.add("error");
        contactGroup.setAttribute("data-error", "Please fill out this field");
        isValid = false;
      } else {
        contactGroup.classList.remove("error");
        contactGroup.removeAttribute("data-error");
        contactGroup.classList.remove("hide-error-message");
      }

      const privacyGroup = privacyCheckbox.parentNode;
      if (!privacyCheckbox.checked) {
        privacyGroup.classList.remove("hide-error-message");
        privacyGroup.classList.add("error");
        privacyGroup.setAttribute("data-error", "Please fill out this field");
        isValid = false;
      } else {
        privacyGroup.classList.remove("error");
        privacyGroup.removeAttribute("data-error");
        privacyGroup.classList.remove("hide-error-message");
      }

      if (!isValid) {
        e.preventDefault();
        setTimeout(() => {
          nameGroup.classList.add("hide-error-message");
          questionGroup.classList.add("hide-error-message");
          contactGroup.classList.add("hide-error-message");
          privacyGroup.classList.add("hide-error-message");
        }, 3000);
      }
      if (isValid) {
        e.preventDefault();
        let action = contactsForm.getAttribute("data-form-action");
        let formData = new FormData(contactsForm);
        formData.append("action", "send_custom_form"); // Important

        fetch(action, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((result) => {
            // TODO create and show popup
          })
          .catch((error) => console.error(error));
      }
    });
  }

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

  // COOKIES
  const cookieWindow = document.querySelector(".cookie");
  const cookieCloseButton = document.querySelector(".cookie__close-button");
  if (cookieWindow) {
    if (localStorage.getItem("cookieDismissed") === "true") {
      cookieWindow.style.display = "none";
    } else {
      cookieWindow.style.display = "flex";
    }

    cookieCloseButton.addEventListener("click", function () {
      cookieWindow.style.display = "none";
      localStorage.setItem("cookieDismissed", "true");
    });
  }
});
