<?php
$policy = get_field('policy');
if ($policy) :
?>
<section class="privacy">
    <div class="privacy__wrapper">
        <h2 class="privacy__title"><?php echo esc_html($policy['title']); ?></h2>
        <div class="privacy__content"><?php echo wp_kses_post($policy['content']); ?></div>
    </div>
</section>
<?php endif; ?>
