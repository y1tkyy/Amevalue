<footer class="footer">
  <div class="footer__container">
    <div class="footer__logo">
      <a href="/" class="footer__logo-link"><img class="footer__logo-img" src="./assets/images/logo/logo-dots.svg"
          alt="Amevalue footer logo" /></a>
    </div>
      <?php
          wp_nav_menu( array(
              'menu' => 'Footer Menu', // ID, который мы зарегистрировали
              'container'      => 'ul', // Оборачиваем меню в <nav>
              'menu_class'     => 'footer__menu',
              'walker' => new Custom_Walker_Footer_Menu()
          ) );
      ?>
    <div class="footer__copyright">
      <p class="footer__text">
        &copy; <span class="footer__year">2025</span>, all rights protected, Amevalue
      </p>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
