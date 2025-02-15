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
        <script defer src="./js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="./styles/global.css" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="header">
      <div class="header__overlay"></div>
      <nav class="header__nav">
        <ul class="sidebar">
          <li class="sidebar__button">
            <button class="sidebar__close-button" aria-label="Close menu">
              <div class="sidebar__close-icon">
                <span class="sidebar__close-line"></span>
                <span class="sidebar__close-line"></span>
              </div>
            </button>
          </li>
          <li class="sidebar__logo">
            <a class="sidebar__link" href="./">
              <img
                class="sidebar__logo-img unselectable"
                src="./images/logo/logo-dots.svg"
                alt="Amevalue burger logo"
                draggable="false"
            /></a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="./pages/prices.html">Prices</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="./pages/faq.html">FAQ</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#values">Values</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#gameplan">Game plan</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#results">Results</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#clients">Clients</a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#contacts">Contacts</a>
          </li>
        </ul>
        <ul class="header__list">
          <li class="header__logo">
            <a class="header__logo-link" href="./"
              ><img
                class="header__logo-img unselectable"
                src="./images/logo/logo.svg"
                alt="Amevalue logo"
                draggable="false" />
              <img
                class="header__logo-img header__logo-img--blured"
                src="./images/logo/logo.svg"
                alt="Amevalue logo blur"
                draggable="false"
            /></a>
          </li>
          <li class="header__list-item">
            <a class="header__link" href="./pages/prices.html">Prices</a>
          </li>
          <li class="header__list-item">
            <a class="header__link" href="./pages/faq.html">FAQ</a>
          </li>
          <li class="header__list-item">
            <a class="header__link" href="#contacts">Contacts</a>
          </li>
        </ul>
        <button class="header__burger unselectable">
          <img
            class="header__burger-icon"
            src="./images/icons/burger.svg"
            alt="Burger menu"
            draggable="false"
          />
          <img
            class="header__burger-icon header__burger-icon--blured"
            src="./images/icons/burger.svg"
            alt="Burger menu blur"
            draggable="false"
          />
        </button>
      </nav>
    </header>
