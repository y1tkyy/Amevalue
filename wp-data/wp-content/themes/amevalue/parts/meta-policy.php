<?php
$meta = get_field('meta');
$title = !empty($meta['title']) ? $meta['title'] : 'Privacy Policy';
$description = !empty($meta['description']) ? $meta['description'] : '';
?>
<!-- Privacy Policy Page SEO Meta Tags -->
<title><?php echo esc_html($title); ?></title>
<meta property="og:url" content="https://ame-value.com/policy" />
<meta property="og:title" content="<?php echo esc_attr($title); ?>" />
<meta property="og:description" content="<?php echo esc_attr($description); ?>" />
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/logo/logo-dots.svg" />
<link rel="canonical" href="https://ame-value.com/policy" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="x-dns-prefetch-control" content="on" />
