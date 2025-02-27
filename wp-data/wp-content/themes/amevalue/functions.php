<?php
function my_theme_enqueue_styles() {
	wp_enqueue_style("my-theme-style", get_stylesheet_uri());
}

add_theme_support("menus");

function my_custom_block_patterns() {
	register_nav_menus([
		"header_menu"  => "Header menu",
		"sidebar_menu" => "Sidebar Menu",
		"footer_menu"  => "Footer Menu",
	]);
}

class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {
	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		$class_names = !empty($item->classes) ? implode(" ", $item->classes) : "";
		$main_links = array('Values', 'Game plan', 'Results', 'Clients', 'Contacts');
		if ( in_array( $item->title, $main_links ) ) {
			if ( ! is_front_page() ) {
				$url = home_url( '/#' . sanitize_title( $item->title ) );
			} else {
				$url = '#' . sanitize_title( $item->title );
			}
		} else {
			$url = $item->url;
		}
		$output .= '<li class="header__list-item ' . esc_attr( $class_names ) . '">';
		$output .= '<a class="header__link" href="' . esc_url( $url ) . '">' . esc_html( $item->title ) . "</a>";
	}
}

class Custom_Walker_Sidebar_Menu extends Walker_Nav_Menu {
	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		$output .= '<li class="sidebar__item">';
		$main_links = array('Values', 'Game plan', 'Results', 'Clients', 'Contacts');
		if ( in_array( $item->title, $main_links ) ) {
			if ( ! is_front_page() ) {
				$url = home_url( '/#' . sanitize_title( $item->title ) );
			} else {
				$url = '#' . sanitize_title( $item->title );
			}
		} else {
			$url = $item->url;
		}
		$output .= '<a href="' . esc_url( $url ) . '" class="sidebar__link">' . esc_html( $item->title ) . "</a>";
	}
	function end_el(&$output, $item, $depth = 0, $args = null) {
		$output .= "</li>";
	}
}

class Custom_Walker_Footer_Menu extends Walker_Nav_Menu {
	function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
		$output .= '<li class="footer__menu-item">';
		$output .= '<a href="' . esc_url($item->url) . '" class="footer__item-link">' . esc_html($item->title) . "</a>";
	}

	function end_el(&$output, $item, $depth = 0, $args = null) {
		$output .= "</li>";
	}
}

add_action("wp_enqueue_scripts", "my_theme_enqueue_styles");

function send_custom_form() {
	if (!isset($_POST["name"]) || !isset($_POST["email"])) {
		wp_send_json_error("Required data not provided");
	}

	$name  = sanitize_text_field($_POST["name"]);
	$email = sanitize_text_field($_POST["email"]);

	$message  = "Name: $name\n";
	$message .= "Email: $email\n\n";

	if (isset($_POST["quizData"])) {
		$quizData = json_decode(wp_unslash($_POST["quizData"]), true);
		if (is_array($quizData)) {
			$message .= "Data:\n";
			foreach ($quizData as $key => $value) {
				if ($key === "name" || $key === "email") {
					continue;
				}
				if (is_array($value)) {
					$value = implode(", ", $value);
				}
				$formatted_key = str_replace(["[]"], "", $key);
				$formatted_key = str_replace(["-", "_"], " ", $formatted_key);
				$formatted_key = ucfirst($formatted_key);
				$message .= "- {$formatted_key}: {$value}\n";
			}
		}
	}

	$custom_email = get_field('mail', 'option');
	if (empty($custom_email)) {
		$custom_email = 'admin@example.com'; 
	}
	$custom_topic = get_field('topic', 'option');
	if (empty($custom_topic)) {
		$custom_topic = 'New Submission'; 
	}

	wp_mail($custom_email, $custom_topic, $message);
	error_log("Form submitted: $name");
	wp_send_json_success("Form submitted successfully");
}

add_action("wp_ajax_send_custom_form", "send_custom_form");
add_action("wp_ajax_nopriv_send_custom_form", "send_custom_form");

function theme_enqueue_assets() {
	wp_enqueue_style("global-style", get_template_directory_uri() . "/styles/global.css", [], "1.0.0", "all");
	wp_enqueue_script("theme-scripts", get_template_directory_uri() . "/js/script.js", [], "1.0.0", true);

	if (is_page("prices")) {
		wp_enqueue_style("price-style", get_template_directory_uri() . "/styles/price.css", [], "1.0.0", "all");
		wp_enqueue_script("price-scripts", get_template_directory_uri() . "/js/price-script.js", [], "1.0.0", true);
	}
}
add_action("wp_enqueue_scripts", "theme_enqueue_assets");

if (function_exists('acf_add_options_page')) {
	acf_add_options_page();
}
