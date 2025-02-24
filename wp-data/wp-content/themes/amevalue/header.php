<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title(''); ?><?php bloginfo('name'); ?></title>
  <meta name="description" content="customer support outsourcing company">
  <meta property="og:url" content="https://ame-value.com">
  <meta property="og:title" content="Amevalue">
  <meta property="og:description" content="customer support outsourcing company">
  <meta property="og:type" content="website">
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/thumbnail.webp">
  <link rel="canonical" href="https://ame-value.com">
  <meta name="format-detection" content="telephone=no">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico" type="image/x-icon">

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">

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
          <path
            d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z">
          </path>
          <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z">
          </path>
        </svg>
        <p class="success__description unselectable">
          Thanks! We'll contact you as soon as possible
        </p>
      </div>
    </div>
    <div class="promo">
      <div class="promo__overlay"></div>
      <a href="#" class="promo__close-button" aria-label="Close menu"></a>
      <div class="promo__container">
        <h2 class="promo__title">Get the discount</h2>
        <p class="promo__description">
          Register now and get a yearly discount of 7% on your first agent.
        </p>
        <form action="/submit" method="POST" class="promo__form" novalidate>
          <div>
            <label for="name" class="promo__label">Name</label>
            <input id="name" name="name" type="text" class="promo__input" placeholder="Name" required />
          </div>
          <div>
            <label for="email" class="promo__label">E-mail</label>
            <input id="email" name="email" type="email" class="promo__input" placeholder="E-mail" required />
          </div>
          <button type="submit" class="promo__button">Send</button>
        </form>
        <p class="promo__text">
          By clicking on the button, you agree to the
          <a href="#" class="promo__link">privacy policy</a> and the personal
          data processing.
        </p>
      </div>
    </div>
    <div class="header__overlay"></div>
    <nav class="header__nav">
      <aside class="sidebar">
        <a href="#" class="sidebar__close-button" aria-label="Close menu"></a>
        <div class="sidebar__logo">
          <a class="sidebar__link" href="../../../..">
            <img
              class="sidebar__logo-img unselectable"
              src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/logo/logo-dots.svg"
              alt="Amevalue burger logo"
              draggable="false"
            />
          </a>
        </div>
         <?php
            wp_nav_menu( array(
              'menu' => 'sidebar_menu',
              'container' => 'nav',  // Контейнер для меню, это будет тег <nav>
              'container_class' => 'sidebar__nav', // Класс для <nav>
              'menu_class' => 'sidebar__list', // Класс для <ul>
              'items_wrap' => '<ul class="%2$s">%3$s</ul>',  // Рендерит список <ul> с классом
              'walker' => new Custom_Walker_Sidebar_Menu(), // Наш кастомный walker
            ) );
          ?>
      </aside>
      <ul class="header__list">
        <li class="header__logo">
          <a class="header__logo-link" href="../../../..">
            <img
              class="header__logo-img unselectable"
              src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/logo/logo.svg"
              alt="Amevalue logo"
              draggable="false"
            />
            <img
              class="header__logo-img header__logo-img--blured"
              src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/logo/logo.svg"
              alt="Amevalue logo blur"
              draggable="false"
            />
          </a>
        </li>
         <?php
            wp_nav_menu( array(
            'menu' => 'Header menu',
                'items_wrap'     => '%3$s', // Убираем <ul> (оно уже есть в верстке)
                'container'      => false,  // Убираем контейнер <nav>
                'menu_class'     => 'header__list-item',
                'walker'         => new Custom_Walker_Nav_Menu()
            ) );
        ?>
      </ul>
      <a href="#" class="header__burger unselectable"></a>
    </nav>
  </header>
