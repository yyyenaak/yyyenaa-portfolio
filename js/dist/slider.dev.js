"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // 모든 모달을 순회하며 슬라이드 이벤트 적용
  document.querySelectorAll(".modal").forEach(function (modal) {
    var currentSlide = 0; // 현재 슬라이드 위치

    var slider = modal.querySelector(".slider"); // 현재 모달 내 슬라이드 컨테이너

    var slides = modal.querySelectorAll(".slide"); // 현재 모달 내 모든 슬라이드 요소

    var totalSlides = slides.length; // 해당 모달 내 슬라이드 개수

    var startX = 0;
    var isDragging = false;
    var moveX = 0;

    function showSlide(index) {
      if (index < 0) index = 0; // 첫 번째 슬라이드 back 금지

      if (index >= totalSlides) index = totalSlides - 1; // 마지막 슬라이드 next 금지

      currentSlide = index;
      var translateX = -currentSlide * 100 + "%";
      slider.style.transition = "transform 0.3s ease-in-out";
      slider.style.transform = "translateX(".concat(translateX, ")");
    }

    function nextSlide() {
      if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
    }

    function prevSlide() {
      if (currentSlide > 0) showSlide(currentSlide - 1);
    }

    showSlide(currentSlide); // 초기 슬라이드 설정
    // Optional Chaining 제거

    var nextButton = modal.querySelector(".next");

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    var prevButton = modal.querySelector(".prev");

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    } // PC 드래그


    slider.addEventListener("mousedown", function (e) {
      isDragging = true;
      startX = e.clientX;
      slider.style.transition = "none";
    });
    slider.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      moveX = e.clientX - startX;
      slider.style.transform = "translateX(".concat(-currentSlide * 100 + moveX / 5, "%)");
    });
    slider.addEventListener("mouseup", function () {
      isDragging = false;
      if (moveX < -40) nextSlide();else if (moveX > 40) prevSlide();else showSlide(currentSlide);
    });
    slider.addEventListener("mouseleave", function () {
      if (isDragging) {
        isDragging = false;
        showSlide(currentSlide);
      }
    }); // 모바일 touch swipe

    slider.addEventListener("touchstart", function (e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      slider.style.transition = "none";
    });
    slider.addEventListener("touchmove", function (e) {
      if (!isDragging) return;
      moveX = e.touches[0].clientX - startX;
      slider.style.transform = "translateX(".concat(-currentSlide * 100 + moveX / 5, "%)");
    });
    slider.addEventListener("touchend", function () {
      isDragging = false;
      if (moveX < -40) nextSlide();else if (moveX > 40) prevSlide();else showSlide(currentSlide);
    }); // 이미지 개수를 콘솔에 출력

    console.log("\uBAA8\uB2EC ID: ".concat(modal.id, ", \uC2AC\uB77C\uC774\uB4DC \uAC1C\uC218: ").concat(totalSlides));
  });
});