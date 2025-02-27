<?php
$meta = get_field('meta');
$title = !empty($meta['title']) ? $meta['title'] : 'Amevalue';
$description = !empty($meta['description']) ? $meta['description'] : 'customer support outsourcing company';
?>
<!-- Main Page SEO Meta Tags -->
<title><?php echo esc_html($title); ?></title>
<meta name="description" content="<?php echo esc_attr($description); ?>" />
<meta property="og:url" content="https://ame-value.com" />
<meta property="og:title" content="<?php echo esc_attr($title); ?>" />
<meta property="og:description" content="<?php echo esc_attr($description); ?>" />
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/thumbnail.webp" />
<link rel="canonical" href="https://ame-value.com" />
<meta name="format-detection" content="telephone=no" />