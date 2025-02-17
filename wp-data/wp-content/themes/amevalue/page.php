<?php

get_header();
?>
<?php
?>
<?php
  if ( is_page('main') ) {
  ?>

  <?php
    get_template_part('parts/main-page');
    get_template_part('parts/contacts');
  }
?>
<?php
  if ( is_page('faq') ) {
  ?>

  <?php
    get_template_part('parts/contacts');
  }
?>
<?php
get_footer();
?>
