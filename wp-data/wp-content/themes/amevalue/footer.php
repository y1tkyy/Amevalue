
<footer class="footer">
    <?php
        wp_nav_menu( array(
            'theme_location' => 'footer_menu', // ID, который мы зарегистрировали
            'container'      => 'nav', // Оборачиваем меню в <nav>
            'menu_class'     => 'header-menu2', // CSS-класс для стилизации
        ) );
    ?>
  <div class="footer__container">
    <div class="footer__item">
      <a href="/" class="footer__logo-link"
        ><img
          class="footer__logo-img"
          src="./images/logo/logo-dots.svg"
          alt="Amevalue footer logo"
      /></a>
    </div>
    <div class="footer__item">
      <a href="" class="footer__link footer__link--highlighted">Prices</a
      ><a href="" class="footer__link footer__link--highlighted">FAQ</a>
    </div>
    <div class="footer__item">
      <a href="" class="footer__link"
        >Privacy <br />
        policy</a
      >
    </div>
    <div class="footer__item">
      <p class="footer__text">
        &copy; <span class="footer__year">2025</span>, all rights <br />
        protected, Amevalue
      </p>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("custom-popup");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelector(".open-popup").addEventListener("click", () => {
        popup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
  });
</script>
</body>
</html>
