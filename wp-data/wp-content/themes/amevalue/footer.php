
<footer class="footer">
  <div class="footer__container">
    <div class="footer__item">
      <a href="/" class="footer__logo-link"
        ><img
          class="footer__logo-img"
          src="./images/logo/logo-dots.svg"
          alt="Amevalue footer logo"
      /></a>
    </div>
    <div class="footer__item">
      <a href="" class="footer__link footer__link--highlighted">Prices</a
      ><a href="" class="footer__link footer__link--highlighted">FAQ</a>
    </div>
    <div class="footer__item">
      <a href="" class="footer__link"
        >Privacy <br />
        policy</a
      >
    </div>
    <div class="footer__item">
      <p class="footer__text">
        &copy; <span class="footer__year">2025</span>, all rights <br />
        protected, Amevalue
      </p>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("custom-popup");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelector(".open-popup").addEventListener("click", () => {
        popup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
  });
</script>
<script>
document.getElementById("custom-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("action", "send_custom_form"); // Important

    fetch("<?php echo admin_url('admin-ajax.php'); ?>", {
        method: "POST",
        body: formData
    }).then(response => response.text()).then(result => {
        alert("Форма отправлена!");
        document.getElementById("custom-popup").style.display = "none";
    }).catch(error => console.error(error));
});
</script>
</body>
</html>
