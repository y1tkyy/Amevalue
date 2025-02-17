<?php

get_header();
?>
<?php

//     the_content()
//     the_field('custom_text');
//   if ( is_page('faq') ) {
//        get_template_part('parts/contacts');
//   }
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
