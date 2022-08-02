function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
} = {}) {
  // Sliders

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    currVal = document.querySelector(currentCounter),
    totalVal = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  if (slides.length < 10) {
    totalVal.textContent = `0${slides.length}`;
    currVal.textContent = `0${slideIndex}`;
  } else {
    totalVal.textContent = slides.length;
    currVal.textContent = slideIndex;
  }

  function setCurrentValue() {
    if (slides.length < 10) {
      currVal.textContent = `0${slideIndex}`;
    } else {
      currVal.textContent = slideIndex;
    }
  }

  function getDigitByString(str) {
    return str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset === +getDigitByString(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +getDigitByString(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    setCurrentValue();
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = +getDigitByString(width) * (slides.length - 1);
    } else {
      offset -= +getDigitByString(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    setCurrentValue();
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +getDigitByString(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      setCurrentValue();
      dots.forEach((dot) => {
        dot.style.opacity = ".5";
      });
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

export default slider;
