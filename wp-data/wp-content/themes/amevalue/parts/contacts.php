<section class="contacts" id="contacts">
  <div class="contacts__wrapper">
    <div class="contacts__content">
      <?php if( have_rows('field_67b9c53f5d275') ): ?>
        <?php $contacts_block = get_field('field_67b9c53f5d275');?>
        <h2 class="contacts__title"><?php echo $contacts_block['title']; ?></h2>
        <a class="contacts__telephone" href="tel:<?php echo $contacts_block['phone']; ?>"><?php echo $contacts_block['phone']; ?></a>
        <a class="contacts__mail" href="mailto:<?php echo $contacts_block['email']; ?>">E-Mail: <?php echo $contacts_block['email']; ?></a>
        <p class="contacts__address"><?php echo $contacts_block['adress']; ?> </p>
        <div class="contacts__container">
          <a href="https://www.linkedin.com/company/amevalue/" class="contacts__link"><img
              src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/icons/linkedin.svg" alt="LinkedIn icon" class="contacts__link-icon"
              width="24px" /></a>
          <p class="contacts__link">
            <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/icons/message_fb.svg" alt="Facebook icon" class="contacts__link-icon"
              width="28px" />
          </p>
          <a href="https://wa.me/qr/XCGJBVLQCL4TI1" class="contacts__link contacts__link--square"><img
              src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/whatsapp_qr.webp" alt="Whatsapp QR code icon" class="contacts__link-icon"
              width="50px" /></a>
        </div>
        <div class="contacts__info">
          <p class="contacts__info-text"><?php echo $contacts_block['pdf_text']; ?> </p>
          <a href="<?php echo $contacts_block['pdf_link']; ?>" class="contacts__info-link" target="_blank">
            <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/icons/pdf.svg" alt="PDF icon" class="contacts__info-icon" />
          </a>
        </div>
      </div>
      <?php endif; ?>

      <form class="contacts__form" data-form-action="<?php echo admin_url('admin-ajax.php'); ?>" novalidate>
        <?php if( have_rows('field_67bb47c551f70') ): ?>
          <?php $contacts_form = get_field('field_67bb47c551f70'); ?>
          <h2 class="contacts__form-title"><?php echo $contacts_form['title']; ?></h2>

          <p class="contacts__form-text">
            <a href="mailto:business@amevalue.com"><?php echo $contacts_form['sub_title']; ?></a>
          </p>
          <div class="contacts__form-group">
            <label for="name" class="contacts__form-label">Your name</label>
            <input type="text" id="name" name="name" class="contacts__form-input" placeholder="Your name" required />
          </div>

          <div class="contacts__form-group">
            <label for="question" class="contacts__form-label">Your question</label>
            <textarea id="question" name="question" class="contacts__form-textarea" placeholder="Please write your question here" required></textarea>
          </div>

          <div class="contacts__form-group">
            <label for="contact" class="contacts__form-label">Your phone number or e-mail</label>
            <input type="text" id="contact" name="email" class="contacts__form-input" placeholder="Your phone number or e-mail" required />
          </div>

          <div class="contacts__form-group">
            <input type="checkbox" id="privacy" name="privacy" class="contacts__form-checkbox" required />
            <label for="privacy" class="contacts__form-privacy">
              I agree with the terms of <a href="./policy" target="_blank">Privacy Policy</a>
            </label>
          </div>

          <input type="submit" class="contacts__form-submit" value="<?php echo $contacts_form['submit_button']; ?>" />
        <?php endif; ?>
      </form>
  </div>
</section>
