<?php
get_header();
?>

<main>
  <?php
  if ( is_page('main') ) {
    get_template_part('parts/main-page');
    get_template_part('parts/contacts');
  }

  if ( is_page('faq') ) {
    get_template_part('parts/faq-page');
    get_template_part('parts/contacts');
  }

  if ( is_page('prices') ) {
    get_template_part('parts/price-page');
  }

  if ( is_page('policy') ) {
    get_template_part('parts/privacy-policy');
  }
  ?>
</main>

<?php
get_footer();
?>