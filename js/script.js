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

  burgerButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

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

  leftBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: 450,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", () => {
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
});
