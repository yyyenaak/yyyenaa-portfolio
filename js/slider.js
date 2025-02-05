document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const slider = document.querySelector(".slider");

  function showSlide(index) {
    // 마지막 슬라이드 이후에는 더 이상 안 넘어가도록 설정
    if (index >= totalSlides) {
      return;
    }
    // 첫 번째 슬라이드에서 이전 버튼 클릭 시 더 이상 뒤로 가지 않도록 설정
    if (index < 0) {
      return;
    }

    currentSlide = index;
    const translateX = -currentSlide * 100 + "%";
    slider.style.transform = `translateX(${translateX})`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // 초기 슬라이드 표시
  showSlide(currentSlide);

  // 버튼 이벤트 리스너 추가
  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);
});
