<main>
    <section class="hero" id="hero">
        <div class="hero__content">
          <div class="hero__container">
            <?php if( have_rows('hero-banner') ): ?>
              <?php while ( have_rows('hero-banner') ): the_row(); ?>
                <h1 class="hero__title unselectable"><?php the_sub_field('main_slider_title'); ?> </h1>
                <h2 class="hero__subtitle unselectable"><?php the_sub_field('second_title'); ?> </h2>
                <p class="hero__text unselectable"><?php the_sub_field('hero_text'); ?></p>
              <?php endwhile; ?>
            <?php endif; ?>
          </div>
        </div>
      </section>
  <section class="why-choose-us-mobile" id="why-choose-us">
    <?php if( have_rows('our_customers_appreciate_us_for') ): ?>
      <?php while ( have_rows('our_customers_appreciate_us_for') ): the_row(); ?>
        <h2 class="why-choose-us-mobile__title">
           <?php the_sub_field('title'); ?>
        </h2>
        <div class="why-choose-us-mobile__wrapper">
          <div class="why-choose-us-mobile__container">
            <?php
              $our_customers = get_field('our_customers_appreciate_us_for');
              if ($our_customers && isset($our_customers['blocks']) && is_array($our_customers['blocks'])) {
                foreach ($our_customers['blocks'] as $block) {
                    echo "<div class='why-choose-us-mobile__item' tabindex='0'>";
                    echo "<span class='why-choose-us-mobile__item-title unselectable'>{$block['title']}</span>";
                    echo "<p class='why-choose-us-mobile__item-description unselectable'>{$block['content']}</p>";
                    echo "</div>";
                }
              }
            ?>
          </div>
        </div>
        <a href="#" class="why-choose-us-mobile__button"><?php the_sub_field('button_text'); ?></a>
      <?php endwhile; ?>
    <?php endif; ?>
  </section>
   <section class="why-choose-us" id="why-choose-us">
      <div class="why-choose-us__wrapper">
        <div class="why-choose-us__content">
          <?php if( have_rows('our_customers_appreciate_us_for') ): ?>
            <?php while ( have_rows('our_customers_appreciate_us_for') ): the_row(); ?>
              <h2 class="why-choose-us__title">
                <?php the_sub_field('title'); ?>
              </h2>
              <a href="#" class="why-choose-us__button"><?php the_sub_field('button_text'); ?></a>
              <div class="why-choose-us__container unselectable">
              <?php
                $our_customers = get_field('our_customers_appreciate_us_for');
                if ($our_customers && isset($our_customers['blocks']) && is_array($our_customers['blocks'])) {
                  foreach ($our_customers['blocks'] as $block) {
                      echo "<div class='why-choose-us__item' tabindex='0'>";
                      echo "<span class='why-choose-us__item-title'>{$block['title']}</span>";
                      echo "<p class='why-choose-us__item-description'>{$block['content']}</p>";
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
            <?php endwhile; ?>
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
  <section class="game-plan" id="game-plan">
    <div class="game-plan__wrapper">
      <div class="game-plan__button game-plan__button--left" aria-label="Slider button left"></div>
      <div class="game-plan__button game-plan__button--right" aria-label="Slider button right"></div>
      <div class="game-plan__container">
        <h2 class="game-plan__title unselectable">Game plan:</h2>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">your application</p>
        </div>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">
            consultation and cost estimate
          </p>
          <p class="game-plan__item-text unselectable">
            <span class="game-plan__item-days">1 day</span>
          </p>
        </div>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">
            signing of the contract
          </p>
          <p class="game-plan__item-text unselectable">
            <span class="game-plan__item-days">3-5 days</span>
          </p>
        </div>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">
            sourcing and hiring agents
          </p>
          <p class="game-plan__item-text unselectable">
            <span class="game-plan__item-days">1-4 weeks</span>
          </p>
        </div>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">onboarding</p>
          <p class="game-plan__item-text unselectable">
            product research, creating a knowledge base, training staff,
            <br />
            developing client communication scripts, etc.
            <span class="game-plan__item-days">(1&ndash;2 weeks)</span>
          </p>
        </div>
        <div class="game-plan__item">
          <p class="game-plan__item-title unselectable">
            launch new horizons
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="results" id="results">
    <div class="results__wrapper">
      <div class="results__content">
        <h2 class="results__title">Cooperation results:</h2>
        <div class="results__container">
          <div class="results__item">
            <p class="results__text unselectable">
              Annual savings of up to 40% <br />
              of support service costs
            </p>
          </div>
          <div class="results__item">
            <p class="results__text unselectable">
              The LTV of most of your customers <br />
              will increase by 3 times or even more
            </p>
          </div>
          <div class="results__item">
            <p class="results__text unselectable">
              CAC will be reduced by at least 2 times <br />
              because customers will recommend you
            </p>
          </div>
          <div class="results__item">
            <p class="results__text unselectable">Net Profit + 10%</p>
          </div>
          <div class="results__item">
            <p class="results__text unselectable">
              Amevaluable partnership for years
            </p>
          </div>
          <div class="results__item">
            <p class="results__text unselectable">
              Highly motivated and satisfied team
            </p>
          </div>
        </div>
        <a href="#" class="results__button">Calculate your price</a>
      </div>
      <div class="results__graph">
        <div class="results__graph-main">
          <img src="./assets/images/icons/savings.svg" alt="Savings graph" class="results__graph-main-img"
            draggable="false" />
        </div>
        <div class="results__graph-ltv">
          <img src="./assets/images/icons/ltv.svg" alt="LTV graph" class="results__graph-ltv-img" draggable="false" />
        </div>
        <div class="results__graph-net">
          <img src="./assets/images/icons/10.svg" alt="Profit icon" class="results__graph-net-icon"
            draggable="false" />
          <p class="results__graph-net-text unselectable">
            Net profit +10%
          </p>
        </div>
        <div class="results__graph-rate">
          <img src="./assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon"
            draggable="false" />
          <img src="./assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon"
            draggable="false" /><img src="./assets/images/icons/star.svg" alt="Star icon"
            class="results__graph-rate-icon" draggable="false" /><img src="./assets/images/icons/star.svg"
            alt="Star icon" class="results__graph-rate-icon" draggable="false" /><img
            src="./assets/images/icons/star.svg" alt="Star icon" class="results__graph-rate-icon" draggable="false" />
          <p class="results__graph-rate-text unselectable">Total rate</p>
        </div>
      </div>
    </div>
  </section>
  <section class="trusted-us" id="trusted-us">
    <div class="trusted-us__wrapper">
      <div class="trusted-us__content">
        <h2 class="trusted-us__title">
          They <br />
          trusted us:
        </h2>
      </div>
      <div class="trusted-us__container">
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/anex.png" alt="Anex logo" width="100px" />
        </div>
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/lyght_living.png" alt="Lyght living logo"
            width="166px" />
        </div>
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/betten_jumbo.png" alt="Betten Jumbo logo"
            width="152px" />
        </div>
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/wave_makers.png" alt="Wave Makers logo"
            width="166px" />
        </div>
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/les_lunes.png" alt="Les Lunes logo"
            width="166px" />
        </div>
        <div class="trusted-us__item">
          <img class="trusted-us__item-img" src="./assets/images/brands/tigres.png" alt="Tigres logo" width="96px" />
        </div>
      </div>
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
</main>
