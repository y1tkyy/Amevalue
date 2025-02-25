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

function send_custom_form() {
    // Ensure the required fields are present
    if ( ! isset( $_POST['name'] ) || ! isset( $_POST['email'] ) ) {
        wp_send_json_error("Required data not provided");
    }

    $name  = sanitize_text_field( $_POST['name'] );
    $email = sanitize_text_field( $_POST['email'] );

    // Start building the email message with name and email
    $message = "Name: $name\n";
    $message .= "Email: $email\n\n";

    // Check if quizData is provided
    if ( isset( $_POST['quizData'] ) ) {
        // Decode the JSON data into an associative array
        $quizData = json_decode( wp_unslash( $_POST['quizData'] ), true );
        
        if ( is_array( $quizData ) ) {
            $message .= "Quiz Data:\n";

            foreach ( $quizData as $key => $value ) {
                // Skip name or email if they are also in quizData (to avoid duplication)
                if ( $key === 'name' || $key === 'email' ) {
                    continue;
                }

                // If the value is an array (e.g., for checkboxes), join them with a comma
                if ( is_array( $value ) ) {
                    $value = implode(", ", $value);
                }

                // Make the key more readable by removing unwanted characters
                $formatted_key = str_replace(['[]'], '', $key); // Remove [] from e.g. "communication-languages[]"
                $formatted_key = str_replace(['-', '_'], ' ', $formatted_key); // Replace hyphens/underscores with spaces
                $formatted_key = ucfirst($formatted_key); // Capitalize the first letter

                $message .= "- {$formatted_key}: {$value}\n";
            }
        }
    }

    // Send the email to the administrator
    wp_mail( 'admin@example.com', 'New Quiz Submission', $message );

    // Log for debugging purposes
    error_log("Form submitted: $name");

    wp_send_json_success("Form submitted successfully");
}

add_action('wp_ajax_send_custom_form', 'send_custom_form');
add_action('wp_ajax_nopriv_send_custom_form', 'send_custom_form'); // For non-logged in users



function theme_enqueue_assets() {
    // Always load the global CSS for all pages.
    wp_enqueue_style( 'global-style', get_template_directory_uri() . '/styles/global.css', array(), '1.0.0', 'all' );
    
    if ( is_page( 'price' ) ) {
        // For the page with slug "price", load the price-specific CSS and JS.
        wp_enqueue_style( 'price-style', get_template_directory_uri() . '/styles/price.css', array(), '1.0.0', 'all' );
        wp_enqueue_script( 'price-scripts', get_template_directory_uri() . '/js/price-script.js', array(), '1.0.0', true );
    } else {
        // For all other pages, load the general JS.
        wp_enqueue_script( 'theme-scripts', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true );
    }
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_assets' );

add_action('wp_enqueue_scripts', 'theme_enqueue_assets');
