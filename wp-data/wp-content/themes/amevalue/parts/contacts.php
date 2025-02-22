<section class="contacts" id="contacts">
  <div class="contacts__wrapper">
    <div class="contacts__content">
      <h2 class="contacts__title">Contacts</h2>
      <a class="contacts__telephone" href="tel:+380664908388">+38 (066) 490 83 88</a>
      <a class="contacts__mail" href="mailto:business@ame-value.com">E-Mail: business@ame-value.com</a>
      <p class="contacts__address">
        Office: 76000 Ivano-Frankivsk, Ukraine
      </p>
      <div class="contacts__container">
        <a href="https://www.linkedin.com/company/amevalue/" class="contacts__link"><img
            src="./assets/images/icons/linkedin.svg" alt="LinkedIn icon" class="contacts__link-icon"
            width="24px" /></a>
        <p class="contacts__link">
          <img src="./assets/images/icons/message_fb.svg" alt="Facebook icon" class="contacts__link-icon"
            width="28px" />
        </p>
        <a href="https://wa.me/qr/XCGJBVLQCL4TI1" class="contacts__link contacts__link--square"><img
            src="./assets/images/whatsapp_qr.webp" alt="Whatsapp QR code icon" class="contacts__link-icon"
            width="40px" /></a>
      </div>
      <div class="contacts__info">
        <p class="contacts__info-text">
          Still in doubt? Read more about outsourcing advantages
        </p>
        <a href="https://drive.google.com/file/d/1EatE9dBctq3yHWnzTPZuTdht1atEgJQT/view?usp=sharing"
          class="contacts__info-link"><img src="./assets/images/icons/pdf.svg" alt="PDF icon"
            class="contacts__info-icon" /></a>
      </div>
    </div>
    <form class="contacts__form" data-form-action="<?php echo admin_url('admin-ajax.php'); ?>" novalidate>
      <h2 class="contacts__form-title">Get in touch</h2>
      <p class="contacts__form-text">
        <a href="mailto:business@amevalue.com">
          Amevalue — Free Up Internal resources for Core activities.
        </a>
      </p>
      <div class="contacts__form-group">
        <label for="name" class="contacts__form-label">Your name</label>
        <input type="text" id="name" name="name" class="contacts__form-input" placeholder="Your name" required />
      </div>

      <div class="contacts__form-group">
        <label for="question" class="contacts__form-label">Your question</label>
        <textarea id="question" name="question" class="contacts__form-textarea"
          placeholder="Please write your question here" required></textarea>
      </div>

      <div class="contacts__form-group">
        <label for="contact" class="contacts__form-label">Your phone number or e-mail</label>
        <input type="text" id="contact" name="contact" class="contacts__form-input"
          placeholder="Your phone number or e-mail" required />
      </div>

      <div class="contacts__form-group">
        <input type="checkbox" id="privacy" name="privacy" class="contacts__form-checkbox" required />
        <label for="privacy" class="contacts__form-privacy">
          I agree with the terms of <a href="#" target="_blank">Privacy Policy</a>
        </label>
      </div>

      <input type="submit" class="contacts__form-submit" value="Contact me" />
    </form>
  </div>
</section>
