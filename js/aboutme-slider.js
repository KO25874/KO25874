document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-wrapper");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const items = slider.querySelectorAll(".slider-item");
    const totalSlides = items.length;

    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalSlides - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    const updatedItems = slider.querySelectorAll(".slider-item");
    let trueIndex = 1;

    const slideWidth = updatedItems[0].getBoundingClientRect().width;

    const prevBtn = slider.querySelector(".prevBtn");
    const nextBtn = slider.querySelector(".nextBtn");

    function updateSliderPosition() {
      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${slideWidth * trueIndex}px)`;
    }

    function jumpToIndex(index) {
      requestAnimationFrame(() => {
        track.style.transition = "none";
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        requestAnimationFrame(() => {
          track.style.transition = "transform 0.5s ease";
        });
      });
    }

    // 初期位置セット
    track.style.transform = `translateX(-${slideWidth * trueIndex}px)`;

    nextBtn.addEventListener("click", () => {
      if (trueIndex >= updatedItems.length - 1) return;
      trueIndex++;
      updateSliderPosition();

      track.addEventListener("transitionend", () => {
        if (trueIndex === updatedItems.length - 1) {
          trueIndex = 1;
          jumpToIndex(trueIndex);
        }
      }, { once: true });
    });

    prevBtn.addEventListener("click", () => {
      if (trueIndex <= 0) return;
      trueIndex--;
      updateSliderPosition();

      track.addEventListener("transitionend", () => {
        if (trueIndex === 0) {
          trueIndex = updatedItems.length - 2;
          jumpToIndex(trueIndex);
        }
      }, { once: true });
    });
  });
});
s