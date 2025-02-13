document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".header__burger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".header__overlay");
  const closeButton = document.querySelector(".sidebar__close-button");
  const body = document.body;
  const header = document.querySelector(".header");
  const yearElement = document.querySelector(".footer__year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

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
});
