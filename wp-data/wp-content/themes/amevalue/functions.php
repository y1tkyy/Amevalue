<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'my-theme-style', get_stylesheet_uri() );
}

function my_custom_block_patterns() {
    // Регистрируем паттерн блока
    register_block_pattern(
        'my-plugin/my-pattern', // Уникальный идентификатор
        array(
            'title' => __( 'My Custom Pattern', 'my-plugin' ), // Название паттерна
            'content' => '<!-- wp:paragraph --><p>' . __( 'This is a custom paragraph in my pattern.', 'my-plugin' ) . '</p><!-- /wp:paragraph -->' // HTML контент для паттерна
        )
    );
}


add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles', 'my_custom_block_patterns' );
