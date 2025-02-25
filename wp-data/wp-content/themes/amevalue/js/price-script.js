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

  // Object to store quiz answers
  let quizData = {};

  function updateCounter() {
    counter.textContent = `${currentSlide + 1}/${slides.length}`;
    const progress = (currentSlide / (slides.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function toggleLastSlideText() {
    const infoContainer = document.querySelector(".quiz__info-container");
    const lastSlideText = document.querySelector(".quiz__info-container--last-slide-text");

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
    lastStepBtn.style.display = index === slides.length - 2 ? "inline-block" : "none";
    submitBtn.style.display = index === slides.length - 1 ? "inline-block" : "none";

    updateCounter();
    toggleLastSlideText();
  }

function saveAnswers() {
  const activeSlide = slides[currentSlide];

  // Save radio inputs
  const radioInputs = activeSlide.querySelectorAll("input[type='radio']:checked");
  radioInputs.forEach((radio) => {
    const labelSpan = radio.closest("label").querySelector(".quiz__radio-label");
    quizData[radio.name] = labelSpan ? labelSpan.textContent.trim() : radio.value;
  });

  // Save checkbox inputs
  const checkboxInputs = activeSlide.querySelectorAll("input[type='checkbox']");
  checkboxInputs.forEach((checkbox) => {
    if (!quizData[checkbox.name]) {
      quizData[checkbox.name] = [];
    }
    if (checkbox.checked) {
      const labelSpan = checkbox.closest("label").querySelector(".quiz__checkbox-label");
      quizData[checkbox.name].push(labelSpan ? labelSpan.textContent.trim() : checkbox.value);
    }
  });

  // Capture text and email inputs (including name and email fields)
  const textAndEmailInputs = activeSlide.querySelectorAll("input[type='text'], input[type='email']");
  textAndEmailInputs.forEach((input) => {
    quizData[input.name] = input.value.trim();
  });

  // Calculate the estimated price based on the current quizData
  calculatePrice();

  console.log("Collected data:", quizData);
}


  function calculatePrice() {
    let price = 1500; // Base price
    // Adjust these conditions to match your quiz data structure
    if (
      quizData["number-of-tickets-per-month"] === "over 1000" &&
      quizData["number-of-calls-per-month"] === "over 200"
    ) {
      price = 1800;
    } else if (
      quizData["communication-languages"] &&
      quizData["communication-languages"].includes("German")
    ) {
      price = 1650;
    }

    quizData["estimated_price"] = `${price} €`;

    // Update the slide that displays the estimated price (if applicable)
    const priceElement = document.querySelector(".quiz__slide-info");
    if (priceElement) {
      priceElement.textContent = `${price} €`;
    }
  }

  function validateSlide() {
    const activeSlide = slides[currentSlide];
    const radioInputs = activeSlide.querySelectorAll("input[type='radio']");
    const checkboxInputs = activeSlide.querySelectorAll("input[type='checkbox']");
    const textInputs = activeSlide.querySelectorAll("input[type='text']");
    const errorMessage = activeSlide.querySelector(".quiz__slide-error");

    let isValid = true;

    // If radio buttons exist, ensure one is selected
    if (radioInputs.length > 0) {
      const checkedRadio = activeSlide.querySelector("input[type='radio']:checked");
      if (!checkedRadio) {
        isValid = false;
      }
    }

    // If checkboxes exist, ensure at least one is checked
    if (checkboxInputs.length > 0) {
      const checkedCheckbox = activeSlide.querySelector("input[type='checkbox']:checked");
      if (!checkedCheckbox) {
        isValid = false;
      }
    }

    // Validate text inputs (for example, on the final slide for email and name)
    if (textInputs.length > 0) {
      textInputs.forEach((input) => {
        if (input.name === "Name" && input.value.trim().length < 2) {
          isValid = false;
          input.classList.add("input-error");
        } else if (
          input.name === "Email" &&
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
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect any remaining answers
    saveAnswers();

    let isValid = true;
    const emailInput = document.querySelector("input[name='email']");
    const nameInput = document.querySelector("input[name='name']");
    const emailError = emailInput ? emailInput.nextElementSibling : null;
    const nameError = nameInput ? nameInput.nextElementSibling : null;

    // Validate email field
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

    // Validate name field
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add("quiz__slide-form-input--error");
      if (nameError) nameError.classList.add("quiz__slide-error--active");
      isValid = false;
    } else {
      nameInput.classList.remove("quiz__slide-form-input--error");
      if (nameError) nameError.classList.remove("quiz__slide-error--active");
    }

    if (!isValid) {
      return;
    }

    // Build the AJAX request using FormData
    let actionURL = form.getAttribute("data-form-action") || "/wp-admin/admin-ajax.php";
    let formData = new FormData(form);

    // Append the quiz data as a JSON string
    formData.append("quizData", JSON.stringify(quizData));

    // IMPORTANT: Append the 'action' parameter so WordPress knows which handler to use
    formData.append("action", "send_custom_form");

    // Send the AJAX request
    fetch(actionURL, {
      method: "POST",
      body: formData
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("Success:", result);
        // Example UI updates after a successful submission
        emailInput.style.display = "none";
        nameInput.style.display = "none";
        document.getElementById("submit").style.display = "none";
        alert("Thank you! Your data was submitted successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting your data. Please try again.");
      });
  });

  // Initialize the first slide on load
  showSlide(currentSlide);
});
