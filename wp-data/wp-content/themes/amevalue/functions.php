<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'my-theme-style', get_stylesheet_uri() );
}

add_theme_support( 'menus' );

function my_custom_block_patterns() {
    register_nav_menus(
        array(
            'header_menu' => 'Header menu',
            'sidebar_menu' => 'Sidebar Menu',
            'footer_menu' => 'Footer Menu'
        )
    );
}

class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $class_names = !empty($item->classes) ? implode(' ', $item->classes) : '';
        $output .= '<li class="header__list-item ' . esc_attr($class_names) . '">';
        $output .= '<a class="header__link" href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a>';
    }
}

class Custom_Walker_Sidebar_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $output .= '<a href="' . esc_url($item->url) . '" class="sidebar__link">' . esc_html($item->title) . '</a>';
    }

    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= '</li>';
    }
}

class Custom_Walker_Footer_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $output .= '<li class="footer__menu-item">';
        $output .= '<a href="' . esc_url($item->url) . '" class="footer__item-link">' . esc_html($item->title) . '</a>';
    }

    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= '</li>';
    }
}


add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles', 'my_custom_block_patterns' );

// name the same like in js: formData.append("action", "send_custom_form"); // Important
function send_custom_form() {
    if (!isset($_POST['name'])) {
        wp_send_json_error("Не переданы данные");
    }

    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_text_field($_POST['email']);

    wp_mail('admin@example.com', 'Новая заявка', "Имя: $name\nEmail: $email");

    // Логируем, чтобы проверить, вызывается ли обработчик
    error_log("Форма отправлена: $name");

    wp_send_json_success("Форма успешно отправлена");
}

add_action('wp_ajax_send_custom_form', 'send_custom_form');
add_action('wp_ajax_nopriv_send_custom_form', 'send_custom_form'); // Для неавторизованных пользователей

function theme_enqueue_assets() {
    // Подключаем дополнительный CSS-файл (например, в папке assets/css/)
     wp_enqueue_style('reset-style', get_template_directory_uri() . '/styles/reset.css', array(), '1.0.0', 'all');
    wp_enqueue_style('global-style', get_template_directory_uri() . '/styles/global.css', array(), '1.0.0', 'all');


    wp_enqueue_script('theme-scripts', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_assets');
