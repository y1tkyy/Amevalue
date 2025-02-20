<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo( 'name' ); ?></title>
    <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500&display=swap"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          type="text/css"
        />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <header class="header">
    <div class="promo">
      <div class="promo__overlay"></div>
      <a href="#" class="promo__close-button" aria-label="Close menu"></a>
      <div class="promo__container">
        <h2 class="promo__title">Get the discount</h2>
        <p class="promo__description">
          Register now and get a yearly discount of 7% on your first agent.
        </p>
        <div class="promo__input"></div>
        <div class="promo__input"></div>
        <div class="promo__button"></div>
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
              src="./assets/images/logo/logo-dots.svg"
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
              src="./assets/images/logo/logo.svg"
              alt="Amevalue logo"
              draggable="false"
            />
            <img
              class="header__logo-img header__logo-img--blured"
              src="./assets/images/logo/logo.svg"
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
