<main>
    <section class="hero" id="hero">
        <div class="hero__content">
          <div class="hero__container">
            <?php if (have_rows("hero-banner")): ?>
              <?php while (have_rows("hero-banner")):
                the_row(); ?>
                <h1 class="hero__title unselectable"><?php the_sub_field(
                  "main_slider_title"
                ); ?> </h1>
                <h2 class="hero__subtitle unselectable"><?php the_sub_field(
                  "second_title"
                ); ?> </h2>
                <p class="hero__text unselectable"><?php the_sub_field(
                  "hero_text"
                ); ?></p>
              <?php
              endwhile; ?>
            <?php endif; ?>
          </div>
        </div>
      </section>
      <section class="why-choose-us-mobile" id="why-choose-us-mobile">
    <?php if (have_rows("our_customers_appreciate_us_for")): ?>
      <?php while (have_rows("our_customers_appreciate_us_for")):
        the_row(); ?>
        <h2 class="why-choose-us-mobile__title">
          <?php the_sub_field("title"); ?>
        </h2>
        <div class="why-choose-us-mobile__wrapper">
          <div class="why-choose-us-mobile__container">
            <?php
            $our_customers = get_field("our_customers_appreciate_us_for");
            if (
              $our_customers &&
              isset($our_customers["blocks"]) &&
              is_array($our_customers["blocks"])
            ) {
              foreach ($our_customers["blocks"] as $block) {
                echo "<div class='why-choose-us-mobile__item' tabindex='0'>";
                echo "<span class='why-choose-us-mobile__item-title unselectable'>{$block["title"]}</span>";
                echo "<p class='why-choose-us-mobile__item-description unselectable'>{$block["content"]}</p>";
                echo "</div>";
              }
            }
            ?>
          </div>
        </div>
        <a href="#" class="why-choose-us-mobile__button"><?php the_sub_field(
          "button_text"
        ); ?></a>
      <?php
      endwhile; ?>
    <?php endif; ?>
  </section>
  <section class="why-choose-us" id="values">
      <div class="why-choose-us__wrapper">
        <div class="why-choose-us__content">
          <?php if (have_rows("our_customers_appreciate_us_for")): ?>
            <?php while (have_rows("our_customers_appreciate_us_for")):
              the_row(); ?>
              <h2 class="why-choose-us__title">
                <?php the_sub_field("title"); ?>
              </h2>
              <a href="./price/" class="why-choose-us__button"><?php the_sub_field(
                "button_text"
              ); ?></a>
              <div class="why-choose-us__container unselectable">
              <?php
              $our_customers = get_field("our_customers_appreciate_us_for");
              if (
                $our_customers &&
                isset($our_customers["blocks"]) &&
                is_array($our_customers["blocks"])
              ) {
                foreach ($our_customers["blocks"] as $block) {
                  echo "<div class='why-choose-us__item' tabindex='0'>";
                  echo "<span class='why-choose-us__item-title'>{$block["title"]}</span>";
                  echo "<p class='why-choose-us__item-description'>{$block["content"]}</p>";
                  echo "</div>";
                }
              }
              ?>
                  <div class="why-choose-us__vector"></div>
                  <div class="why-choose-us__dot why-choose-us__dot--first">
                    <div class="why-choose-us__dot-inner"></div>
                  </div>
                  <div class="why-choose-us__dot why-choose-us__dot--second">
                    <div class="why-choose-us__dot-inner"></div>
                  </div>
                  <div class="why-choose-us__dot why-choose-us__dot--third">
                    <div class="why-choose-us__dot-inner"></div>
                  </div>
                </div>
            <?php
            endwhile; ?>
          <?php endif; ?>
        </div>
      </div>
  </section>
  <section class="services" id="services">
    <div class="services__wrapper">
      <h3 class="services__title unselectable">
        We offer the huge list of services for your customers support:
      </h3>
    </div>
    <div class="services__running-line">
      <div class="services__running-line-inner">
        <span class="services__text">
          call support — email support — live-chat support — social media
          support — up-sell and cross-sell support (account management) —
        </span>
        <span class="services__text">
          call support — email support — live-chat support — social media
          support — up-sell and cross-sell support (account management) —
        </span>
        <span class="services__text">
          call support — email support — live-chat support — social media
          support — up-sell and cross-sell support (account management) —
        </span>
        <span class="services__text">
          call support — email support — live-chat support — social media
          support — up-sell and cross-sell support (account management) —
        </span>
      </div>
    </div>
  </section>
    <section class="game-plan" id="gameplan">
    <div class="game-plan__wrapper">
      <?php
      $game_plan = get_field("game_plan");
      if ($game_plan):

        $title = $game_plan["title"];
        $items = $game_plan["items"];
        ?>
      <div class="game-plan__button game-plan__button--left" aria-label="Slider button left"></div>
      <div class="game-plan__button game-plan__button--right" aria-label="Slider button right"></div>
      <div class="game-plan__container">
        <?php if ($title): ?>
            <h2 class="game-plan__title unselectable"><?php echo esc_html(
              $title
            ); ?></h2>
        <?php endif; ?>
        <?php if ($items): ?>
            <?php foreach ($items as $item):

              $item_title = $item["title"];
              $item_time = $item["time"];
              $item_content = $item["content"];
              ?>
                <div class="game-plan__item">
                    <?php if ($item_title): ?>
                        <p class="game-plan__item-title unselectable"><?php echo esc_html(
                          $item_title
                        ); ?></p>
                    <?php endif; ?>
                    <?php if ($item_time || $item_content): ?>
                        <p class="game-plan__item-text unselectable">
                            <?php
                            if ($item_content) {
                              echo wp_kses_post($item_content);
                            }
                            if ($item_time) {
                              echo '<span class="game-plan__item-days">' .
                                esc_html($item_time) .
                                "</span>";
                            }
                            ?>
                        </p>
                    <?php endif; ?>
                </div>
            <?php
            endforeach; ?>
        <?php endif; ?>
      </div>
      <?php
      endif;
      ?>
    </div>
    </section>
  <section class="results" id="results">
    <div class="results__wrapper">
      <?php
      $results = get_field("cooperation_results");
      if ($results):

        $title = $results["title"];
        $button_text = $results["button_text"];
        $list = $results["list"];
        ?>
  <div class="results__content">
    <?php if ($title): ?>
      <h2 class="results__title"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>
    <div class="results__container">
      <?php if ($list): ?>
        <?php foreach ($list as $item):
          $text = $item["text"]; ?>
          <div class="results__item">
            <p class="results__text unselectable">
              <?php echo wp_kses_post($text); ?>
            </p>
          </div>
        <?php
        endforeach; ?>
      <?php endif; ?>
    </div>
    <?php if ($button_text): ?>
      <a href="./price" class="results__button" target="_blank"><?php echo esc_html(
        $button_text
      ); ?></a>
    <?php endif; ?>
  </div>
<?php
      endif;
      ?>
      <div class="results__graph">
        <div class="results__graph-main">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/savings.svg" alt="Savings graph" class="results__graph-main-img"
            draggable="false" />
        </div>
        <div class="results__graph-ltv">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/ltv.svg" alt="LTV graph" class="results__graph-ltv-img" draggable="false" />
        </div>
        <div class="results__graph-net">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/10.svg" alt="Profit icon" class="results__graph-net-icon"
            draggable="false" />
          <p class="results__graph-net-text unselectable">
            Net profit +10%
          </p>
        </div>
        <div class="results__graph-rate">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon"
            draggable="false" />
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon"
            draggable="false" /><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/star.svg" alt="Star icon"
            class="results__graph-rate-icon" draggable="false" /><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/star.svg"
            alt="Star icon" class="results__graph-rate-icon" draggable="false" /><img
            src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon" draggable="false" />
          <p class="results__graph-rate-text unselectable">Total rate</p>
        </div>
      </div>
    </div>
  </section>
  <section class="trusted-us" id="Clients">
  <div class="trusted-us__wrapper">
  <?php
  $trusted_us = get_field("they_trusted_us");
  if ($trusted_us):

    $title = $trusted_us["title"];
    $companies = $trusted_us["companies"];
    ?>
    <div class="trusted-us__content">
      <h2 class="trusted-us__title">
        <?php echo esc_html($title); ?>
      </h2>
    </div>
    <div class="trusted-us__container">
      <?php if ($companies): ?>
        <?php foreach ($companies as $company):

          $company_link = $company["company_link"];
          $image = $company["image"];
          $image_width = $company["image_width"];
          ?>
          <div class="trusted-us__item">
            <?php if ($company_link): ?>
              <a class="trusted-us__item-link" href="<?php echo esc_url(
                $company_link
              ); ?>">
            <?php endif; ?>
              <?php if ($image): ?>
                <img class="trusted-us__item-img" 
                    src="<?php echo esc_url($image["url"]); ?>" 
                    alt="<?php echo esc_attr($image["alt"]); ?>" 
                    width="<?php echo esc_attr($image_width); ?>" />
              <?php endif; ?>
            <?php if ($company_link): ?>
            </a>
            <?php endif; ?>
          </div>
        <?php
        endforeach; ?>
      <?php endif; ?>
    </div>
  <?php
  endif;
  ?>
  </div>
  </section>
  <section class="clients" id="clients">
    <div class="clients__wrapper">
      <h3 class="clients__title unselectable">Our future clients:</h3>
    </div>
    <div class="clients__running-line">
      <div class="clients__running-line-inner">
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
        <span class="clients__text">
          OTTO — Babyone — Zalando — ASOS — Ricardo — OnBuy —
        </span>
      </div>
    </div>
  </section>
   <div class="cookie">
    <div class="cookie__container">
      <div class="cookie__close-button">
        <svg role="presentation" width="10" height="10" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
          <desc>Close</desc>
          <g fill="#14134f" fill-rule="evenodd">
            <path d="M2e-7 1.41421306L1.41421378-5e-7l21.21320344 21.21320344-1.41421357 1.41421356z"></path>
            <path d="M21.21320294 2e-7l1.41421356 1.41421357L1.41421306 22.62741721-5e-7 21.21320364z"></path>
          </g>
        </svg>
      </div>
      <div class="cookie__text">
        This website uses cookies. Cookies remember your actions and
        preferences for a better online experience.
      </div>
    </div>
  </div>
</main>
