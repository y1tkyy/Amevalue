<section class="quiz">
  <div class="quiz__wrapper">
    <?php
// Retrieve custom fields
$page_title = get_field('title');
$slides = get_field('slides');

// Retrieve slides sub-fields from the slides group
$slides_title = isset($slides['slides_title']) ? $slides['slides_title'] : '';
$proposal_summary  = isset($slides['proposal_summary']) ? $slides['proposal_summary'] : 'Thanks for your answers. The estimated cost per agent, relative to your request is:';
$slides_form_title = isset($slides['slides_form_title']) ? $slides['slides_form_title'] : '';
?>
<!-- Global header with page title -->
<div class="quiz__header">
  <h1 class="quiz__header-title">
    <span class="quiz__header-title-text"><?php echo esc_html($page_title); ?></span>
  </h1>
</div>

<!-- Quiz Form -->
<form id="quizForm" class="quiz__form" data-form-action="<?php echo admin_url('admin-ajax.php'); ?>">
  <!-- Top Info Section -->
  <div class="quiz__form-top">
    <div class="quiz__form-top-info">
      <div class="quiz__info-container">
        <div class="quiz__info-container-left">
          <img class="quiz__info-container-left-img" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/price_icon.svg" width="23px" height="20px" alt="price icon" />
          <?php if ( ! empty( $slides_title ) ) : ?>
            <span class="quiz__info-container-left-text"><?php echo esc_html( $slides_title ); ?></span>
          <?php endif; ?>
        </div>
        <div class="quiz__info-container-right">
          <div class="quiz__info-container-right-counter" id="quizCounter">1/8</div>
        </div>
      </div>
       <?php if ( ! empty( $slides_form_title ) ) : ?>
        <div class="quiz__info-container--last-slide-text"><?php echo esc_html( $slides_form_title ); ?></div>
      <?php endif; ?>
      <div class="quiz__info-progressbar">
        <div class="quiz__info-progress"></div>
      </div>
    </div>
  </div>


      <!-- Slides Container -->
      <?php if ( $slides && ! empty( $slides['slide_item'] ) ) : ?>
        <?php foreach ( $slides['slide_item'] as $slide ) : 
          $question_title = $slide['slide_title'];
          $input_name = sanitize_title( $question_title );
        ?>
          <div class="quiz__slide">
            <!-- Each slide displays its own title -->
            <div class="quiz__slide-title"><?php echo esc_html( $question_title ); ?></div>
            
            <?php if ( ! empty( $slide['slide_checkbox'] ) ) : ?>
              <div class="quiz__checkbox-list">
                <?php foreach ( $slide['slide_checkbox'] as $checkbox ) : 
                  $label = $checkbox['checkbox_label'];
                ?>
                  <label class="quiz__checkbox">
                    <input class="quiz__checkbox-input" type="checkbox" name="<?php echo esc_attr( $input_name ); ?>[]" value="<?php echo esc_attr( $label ); ?>" />
                    <span class="quiz__checkbox-box"></span>
                    <span class="quiz__checkbox-label"><?php echo esc_html( $label ); ?></span>
                  </label>
                <?php endforeach; ?>
              </div>
            <?php elseif ( ! empty( $slide['slide_radio'] ) ) : ?>
              <div class="quiz__radio-list">
                <?php foreach ( $slide['slide_radio'] as $radio ) : 
                  $label = $radio['radio_label'];
                ?>
                  <label class="quiz__radio">
                    <input class="quiz__radio-input" type="radio" name="<?php echo esc_attr( $input_name ); ?>" value="<?php echo esc_attr( $label ); ?>" />
                    <span class="quiz__radio-box"></span>
                    <span class="quiz__radio-label"><?php echo esc_html( $label ); ?></span>
                  </label>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
            
            <div class="quiz__slide-error">You must select at least one option.</div>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>

      <!-- Pre-last Slide: Proposal Summary / Estimated Price -->
      <div class="quiz__slide">
        <div class="quiz__slide-title"><?php echo esc_html( $proposal_summary ); ?></div>
        <div class="quiz__slide-info">1350 €</div>
        <div class="quiz__slide-error">You must select at least one option.</div>
      </div>

      <!-- Last Slide: Form -->
      <div class="quiz__slide">
    <div class="quiz__slide-form-container">
      <input class="quiz__slide-form-input" type="text" name="email" placeholder="Your email" />
      <div class="quiz__slide-error">Required field</div>
    </div>
    <div class="quiz__slide-form-container">
      <input class="quiz__slide-form-input" type="text" name="name" placeholder="Your name and company" />
      <div class="quiz__slide-error">Please fill out all required fields</div>
    </div>
  </div>

      <!-- Navigation Buttons -->
      <div class="quiz__actions-buttons">
    <button type="button" id="prevBtn" class="quiz__button quiz__button--prev">Prev</button>
    <button type="button" id="nextBtn" class="quiz__button quiz__button--next">Next</button>
    <button type="button" id="lastStep" class="quiz__button quiz__button--last" style="display: none;">Last Step</button>
    <button type="submit" id="submit" class="quiz__button quiz__button--submit" style="display: none;">Submit</button>
  </div>
    </form>
  </div>
</section>
