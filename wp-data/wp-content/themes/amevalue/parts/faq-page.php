<section class="faq">
  <div class="faq__wrapper">
    <h2 class="faq__title unselectable"><?php the_field('faq_page_title') ?></h2>
    <?php
      $faq_items = get_field('faq_items');

      if ($faq_items) : ?>
         <div class="faq__list">
            <?php foreach ($faq_items as $item) : ?>
              <div class="faq__item">
                <div class="faq__item-container">
                  <div class="faq__item-button">
                    <svg role="presentation" focusable="false" width="24px" height="24px"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g stroke="none" stroke-width="1px" fill-rule="evenodd" stroke-linecap="square">
                        <g transform="translate(1.000000, 1.000000)" stroke="#fb596a">
                          <path d="M0,11 L22,11"></path>
                          <path d="M11,0 L11,22"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3 class="faq__item-title unselectable"><?php echo $item['title']; ?> </h3>
                </div>
                <p class="faq__item-text"><?php echo $item['content']; ?> </p>
              </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
  </div>
</section>
