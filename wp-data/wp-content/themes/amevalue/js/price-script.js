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

  // Объект для хранения данных квиза
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
      // Проверяем, если это последний слайд
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

    prevBtn.style.display = index > 0 ? "inline-block" : "none";
    nextBtn.style.display = index < slides.length - 2 ? "inline-block" : "none";
    lastStepBtn.style.display =
      index === slides.length - 2 ? "inline-block" : "none";
    submitBtn.style.display =
      index === slides.length - 1 ? "inline-block" : "none";

    updateCounter();
    toggleLastSlideText(); // <-- Вызов функции переключения текста
  }

  function saveAnswers() {
    const activeSlide = slides[currentSlide];

    // Радиокнопки
    const radioInputs = activeSlide.querySelectorAll(
      "input[type='radio']:checked"
    );
    radioInputs.forEach((radio) => {
      quizData[radio.name] =
        radio.nextElementSibling.nextElementSibling.textContent.trim();
    });

    // Чекбоксы
    const checkboxInputs = activeSlide.querySelectorAll(
      "input[type='checkbox']"
    );
    checkboxInputs.forEach((checkbox) => {
      if (!quizData[checkbox.name]) {
        quizData[checkbox.name] = [];
      }
      if (checkbox.checked) {
        quizData[checkbox.name].push(
          checkbox.nextElementSibling.nextElementSibling.textContent.trim()
        );
      }
    });

    // Текстовые поля
    const textInputs = document.querySelectorAll(".quiz__slide-form-input");
    textInputs.forEach((input) => {
      quizData[input.name] = input.value.trim();
    });

    // Рассчитать цену
    calculatePrice();

    console.log("Собранные данные:", quizData);
  }

  function calculatePrice() {
    let price = 1500; // Базовое значение

    if (
      quizData["number_of_tickets_per_month"] === "over 1000" &&
      quizData["number_of_calls_per_month"] === "over 200"
    ) {
      price = 1800;
    } else if (
      quizData["communication_languages"] &&
      quizData["communication_languages"].includes("German")
    ) {
      price = 1650;
    }

    // Сохранить цену в объект quizData
    quizData["estimated_price"] = `${price} €`;

    // Обновить текст на 7-м слайде
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

    // Валидация радио-кнопок: хотя бы один должен быть выбран
    if (radioInputs.length > 0) {
      const checkedRadio = activeSlide.querySelector(
        "input[type='radio']:checked"
      );
      if (!checkedRadio) {
        isValid = false;
      }
    }

    // Валидация чекбоксов: хотя бы один должен быть выбран
    if (checkboxInputs.length > 0) {
      const checkedCheckbox = activeSlide.querySelector(
        "input[type='checkbox']:checked"
      );
      if (!checkedCheckbox) {
        isValid = false;
      }
    }

    // Валидация текстовых полей (только на последнем слайде)
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

    // Добавление/удаление ошибки валидации
    if (!isValid) {
      errorMessage.classList.add("quiz__slide-error--active");
    } else {
      errorMessage.classList.remove("quiz__slide-error--active");
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
    } else {
      // alert("Please select an option before proceeding.");
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

  // Инициализация первого слайда

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAnswers(); // Перед отправкой сохраняем все ответы
  
    let isValid = true;
  
    // Получаем инпуты email и name
    const emailInput = document.querySelector("input[name='Email']");
    const nameInput = document.querySelector("input[name='Name']");
    const emailError = emailInput.nextElementSibling;
    const nameError = nameInput.nextElementSibling;
  
    // Валидация email
    if (
      !emailInput.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())
    ) {
      emailInput.classList.add("quiz__slide-form-input--error");
      emailError.classList.add("quiz__slide-error--active");
      isValid = false;
    } else {
      emailInput.classList.remove("quiz__slide-form-input--error");
      emailError.classList.remove("quiz__slide-error--active");
    }
  
    // Валидация name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add("quiz__slide-form-input--error");
      nameError.classList.add("quiz__slide-error--active");
      isValid = false;
    } else {
      nameInput.classList.remove("quiz__slide-form-input--error");
      nameError.classList.remove("quiz__slide-error--active");
    }
  
    // Если не проходит валидацию, прекращаем отправку формы
    if (!isValid) {
      return;
    }
  
    fetch("http://your-server.com/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Данные успешно отправлены!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ошибка отправки данных!");
      });
  });

  showSlide(currentSlide);
});
