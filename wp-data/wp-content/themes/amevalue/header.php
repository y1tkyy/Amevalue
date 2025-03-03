<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico" type="image/x-icon">

  <?php
    // Load page-specific SEO meta tags
    if ( is_page('main') ) {
      get_template_part('parts/meta', 'main');
    } elseif ( is_page('faq') ) {
      get_template_part('parts/meta', 'faq');
    } elseif ( is_page('prices') ) {
      get_template_part('parts/meta', 'price');
    } elseif ( is_page('policy') ) {
      get_template_part('parts/meta', 'policy');
    }
  ?>

  <!-- Preconnect and DNS Prefetch -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500&display=swap" type="text/css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" type="text/css">
  
  <?php wp_head(); ?>
</head>


<body <?php body_class(); ?>>
  <header class="header">
    <div class="success">
      <div class="success__overlay"></div>
      <div class="success__container">
        <a href="#" class="success__close-button" aria-label="Close menu"></a>
        <svg width="50" height="50" fill="#62C584">
          <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"></path>
          <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"></path>
        </svg>
        <p class="success__description unselectable">Thanks! We'll contact you as soon as possible</p>
      </div>
    </div>
   <?php 
      $promo = get_field('promo', 'option');
      if ( $promo ) :
        $title             = $promo['title'];
        $subtitle          = $promo['subtitle'];
        $button            = $promo['button'];
        $consent_statement = $promo['consent_statement'];
    ?>
    <div class="promo">
      <div class="promo__overlay"></div>
      <a href="#" class="promo__close-button" aria-label="Close menu"></a>
      <div class="promo__container">
        <?php if ( $title ) : ?>
          <h2 class="promo__title"><?php echo esc_html( $title ); ?></h2>
        <?php endif; ?>
        <?php if ( $subtitle ) : ?>
          <p class="promo__description"><?php echo esc_html( $subtitle ); ?></p>
        <?php endif; ?>
        <form data-form-action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>" method="POST" class="promo__form" novalidate>
          <div>
            <label for="name" class="promo__label">Name</label>
            <input id="name" name="name" type="text" class="promo__input" placeholder="Name" required />
          </div>
          <div>
            <label for="email" class="promo__label">E-mail</label>
            <input id="email" name="email" type="email" class="promo__input" placeholder="E-mail" required />
          </div>
          <button type="submit" class="promo__button"><?php echo esc_html( $button ); ?></button>
        </form>
        <?php if ( $consent_statement ) : ?>
          <p class="promo__text"><?php echo wp_kses_post( $consent_statement ); ?></p>
        <?php else : ?>
          <p class="promo__text">
            By clicking on the button, you agree to the 
            <a href="./policy" class="promo__link">privacy policy</a> and the personal data processing.
          </p>
        <?php endif; ?>
      </div>
    </div>
    <?php endif; ?>
    <div class="header__overlay"></div>
    <nav class="header__nav">
      <aside class="sidebar">
        <a href="#" class="sidebar__close-button" aria-label="Close menu"></a>
        <div class="sidebar__logo">
          <a class="sidebar__link" href="../../../..">
            <img class="sidebar__logo-img unselectable" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo/logo-dots.svg" alt="Amevalue burger logo" draggable="false" />
          </a>
        </div>
        <?php wp_nav_menu([
          'menu' => 'sidebar_menu',
          'container' => 'nav',
          'container_class' => 'sidebar__nav',
          'menu_class' => 'sidebar__list',
          'items_wrap' => '<ul class="%2$s">%3$s</ul>',
          'walker' => new Custom_Walker_Sidebar_Menu(),
        ]); ?>
      </aside>
      <ul class="header__list">
        <li class="header__logo">
          <a class="header__logo-link" href="../../../..">
            <img class="header__logo-img unselectable" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo/logo.svg" alt="Amevalue logo" draggable="false" />
            <img class="header__logo-img header__logo-img--blured" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo/logo.svg" alt="Amevalue logo blur" draggable="false" />
          </a>
        </li>
        <?php wp_nav_menu([
          'menu' => 'Header menu',
          'items_wrap' => '%3$s',
          'container' => false,
          'menu_class' => 'header__list-item',
          'walker' => new Custom_Walker_Nav_Menu(),
        ]); ?>
      </ul>
      <div class="header__burger unselectable"></div>
    </nav>
  </header>
</body>
</html>
