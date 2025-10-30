document.addEventListener("DOMContentLoaded", () => {
  const typedElement = document.querySelector(".typed-me");

  if (typedElement) {
    const strings = [];
    let i = 0;
    while (typedElement.dataset[`string${i}`]) {
      strings.push(typedElement.dataset[`string${i}`]);
      i++;
    }

    const typeSpeed = parseInt(typedElement.dataset.typeSpeed) || 50;
    const backSpeed = parseInt(typedElement.dataset.backSpeed) || 50;
    const backDelay = parseInt(typedElement.dataset.backDelay) || 1000;
    const loop = typedElement.dataset.loop === "1";

    let currentIndex = 0;
    let charIndex = 0;
    let typing = true;

    function typeEffect() {
      if (typing) {
        if (charIndex < strings[currentIndex].length) {
          typedElement.textContent += strings[currentIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeEffect, typeSpeed);
        } else {
          typing = false;
          setTimeout(typeEffect, backDelay);
        }
      } else {
        if (charIndex > 0) {
          typedElement.textContent = strings[currentIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeEffect, backSpeed);
        } else {
          typing = true;
          currentIndex = (currentIndex + 1) % strings.length;
          if (!loop && currentIndex === 0) return;
          setTimeout(typeEffect, typeSpeed);
        }
      }
    }

    typeEffect();
  }
});