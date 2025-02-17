<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'my-theme-style', get_stylesheet_uri() );
}

function my_custom_block_patterns() {
    register_nav_menus(
        array(
            'header_menu2' => 'Головне меню'
        )
    );
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
