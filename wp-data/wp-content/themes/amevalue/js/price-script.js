document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".quiz__slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const lastStepBtn = document.getElementById("lastStep");
  const submitBtn = document.getElementById("submit");
  const counter = document.getElementById("quizCounter");
  const progressBar = document.querySelector(".quiz__info-progress");
  const form = document.getElementById("quizForm");
  let quizData = {};

  function updateCounter() {
    counter.textContent = `${currentSlide + 1}/${slides.length}`;
    const progress = (currentSlide / (slides.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function toggleLastSlideText() {
    const infoContainer = document.querySelector(".quiz__info-container");
    const lastSlideText = document.querySelector(
      ".quiz__info-container--last-slide-text"
    );
    if (currentSlide === slides.length - 1) {
      if (infoContainer) infoContainer.style.display = "none";
      if (lastSlideText) lastSlideText.style.display = "block";
    } else {
      if (infoContainer) infoContainer.style.display = "flex";
      if (lastSlideText) lastSlideText.style.display = "none";
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("quiz__slide--active", i === index);
    });
    prevBtn.style.visibility = index > 0 ? "visible" : "hidden";
    nextBtn.style.display = index < slides.length - 2 ? "inline-block" : "none";
    lastStepBtn.style.display =
      index === slides.length - 2 ? "inline-block" : "none";
    submitBtn.style.display =
      index === slides.length - 1 ? "inline-block" : "none";
    updateCounter();
    toggleLastSlideText();
  }

  function saveAnswers() {
    const activeSlide = slides[currentSlide];
    const radioInputs = activeSlide.querySelectorAll("input[type='radio']:checked");
    radioInputs.forEach((radio) => {
      const labelSpan = radio.closest("label").querySelector(".quiz__radio-label");
      quizData[radio.name] = labelSpan ? labelSpan.textContent.trim() : radio.value;
    });

    const checkboxInputs = activeSlide.querySelectorAll("input[type='checkbox']");
    const checkboxNames = new Set();
    checkboxInputs.forEach((checkbox) => {
      checkboxNames.add(checkbox.name);
    });
    checkboxNames.forEach((name) => {
      quizData[name] = [];
    });
    checkboxInputs.forEach((checkbox) => {
      if (checkbox.checked) {
        const labelSpan = checkbox.closest("label").querySelector(".quiz__checkbox-label");
        quizData[checkbox.name].push(labelSpan ? labelSpan.textContent.trim() : checkbox.value);
      }
    });

    const textAndEmailInputs = activeSlide.querySelectorAll("input[type='text'], input[type='email']");
    textAndEmailInputs.forEach((input) => {
      quizData[input.name] = input.value.trim();
    });

    calculatePrice();
    console.log("Collected data:", quizData);
  }

  function calculatePrice() {
    const priceDataEl = document.getElementById('quizPriceData');
    if (!priceDataEl) return;

    const defaultPrice = parseInt(priceDataEl.getAttribute('data-default-price'), 10);
    const ticketsCallsPrice = parseInt(priceDataEl.getAttribute('data-tickets-calls'), 10);
    const languagePrice = parseInt(priceDataEl.getAttribute('data-language-price'), 10);

    let price = defaultPrice;

    if (
      quizData["number-of-tickets-per-month"] === "over 1000" &&
      quizData["number-of-calls-per-month"] === "over 200"
    ) {
      price = ticketsCallsPrice;
    } else if (
      quizData["communication-languages[]"] &&
      quizData["communication-languages[]"].includes("German")
    ) {
      price = languagePrice;
    }

    quizData["estimated_price"] = `${price} €`;
    const priceElement = document.querySelector(".quiz__slide-info");
    if (priceElement) {
      priceElement.textContent = `${price} €`;
    }
  }

  function validateSlide() {
    const activeSlide = slides[currentSlide];
    const radioInputs = activeSlide.querySelectorAll("input[type='radio']");
    const checkboxInputs = activeSlide.querySelectorAll(
      "input[type='checkbox']"
    );
    const textInputs = activeSlide.querySelectorAll("input[type='text']");
    const errorMessage = activeSlide.querySelector(".quiz__slide-error");
    let isValid = true;
    if (radioInputs.length > 0) {
      const checkedRadio = activeSlide.querySelector(
        "input[type='radio']:checked"
      );
      if (!checkedRadio) {
        isValid = false;
      }
    }
    if (checkboxInputs.length > 0) {
      const checkedCheckbox = activeSlide.querySelector(
        "input[type='checkbox']:checked"
      );
      if (!checkedCheckbox) {
        isValid = false;
      }
    }
    if (textInputs.length > 0) {
      textInputs.forEach((input) => {
        if (input.name === "name" && input.value.trim().length < 2) {
          isValid = false;
          input.classList.add("input-error");
        } else if (
          input.name === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        ) {
          isValid = false;
          input.classList.add("input-error");
        } else {
          input.classList.remove("input-error");
        }
      });
    }
    if (errorMessage) {
      if (!isValid) {
        errorMessage.classList.add("quiz__slide-error--active");
      } else {
        errorMessage.classList.remove("quiz__slide-error--active");
      }
    }
    return isValid;
  }

  nextBtn.addEventListener("click", () => {
    if (validateSlide()) {
      saveAnswers();
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    }
  });

  lastStepBtn.addEventListener("click", () => {
    if (validateSlide()) {
      saveAnswers();
      currentSlide++;
      showSlide(currentSlide);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });

  form.addEventListener("submit", (event) => {
    console.log(1);
  event.preventDefault();
  saveAnswers();
  console.log(2)
  let isValid = true;
  const emailInput = document.getElementById("emailInput");
  const nameInput = document.getElementById("nameInput");
  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");

  if (
    !emailInput.value.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())
  ) {
    emailInput.classList.add("quiz__slide-form-input--error");
    if (emailError) emailError.classList.add("quiz__slide-error--active");
    isValid = false;
  } else {
    emailInput.classList.remove("quiz__slide-form-input--error");
    if (emailError) emailError.classList.remove("quiz__slide-error--active");
  }
  
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    nameInput.classList.add("quiz__slide-form-input--error");
    if (nameError) nameError.classList.add("quiz__slide-error--active");
    isValid = false;
  } else {
    nameInput.classList.remove("quiz__slide-form-input--error");
    if (nameError) nameError.classList.remove("quiz__slide-error--active");
  }

  if (!isValid) return;

  let actionURL =
    form.getAttribute("data-form-action") || "/wp-admin/admin-ajax.php";
  let formData = new FormData(form);
  formData.append("quizData", JSON.stringify(quizData));
  formData.append("action", "send_custom_form");
  
  fetch(actionURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      console.log("Success:", result);
      emailInput.style.display = "none";
      nameInput.style.display = "none";
      submitBtn.style.display = "none";
      prevBtn.style.display = "none";

      const successContainer = document.createElement("div");
      successContainer.classList.add("quiz__success");

      const successText = document.createElement("p");
      successText.classList.add("quiz__success-text");
      successText.textContent = "Thanks for your answers";

      successContainer.appendChild(successText);
      document
        .querySelector(".quiz__slide.quiz__slide--active")
        .appendChild(successContainer);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

  showSlide(currentSlide);
});
