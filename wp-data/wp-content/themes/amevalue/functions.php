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
