"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var currentSlide = 0; // 현재 슬라이드 위치

  var slides = document.querySelectorAll(".slide"); // 모든 슬라이드 요소

  var totalSlides = slides.length; // 전체 슬라이드 개수

  var slider = document.querySelector(".slider"); // 슬라이드 컨테이너

  var startX = 0; // swipe 시작 위치

  var isDragging = false; // 드래그 여부 체크

  var moveX = 0; // 이동 거리 저장

  function showSlide(index) {
    if (index < 0) index = 0; // 첫 번째 슬라이드 back 금지

    if (index >= totalSlides) index = totalSlides - 1; // 마지막 슬라이드 next 금지

    currentSlide = index;
    var translateX = -currentSlide * 100 + "%";
    slider.style.transition = "transform 0.3s ease-in-out"; // smooth 애니메이션

    slider.style.transform = "translateX(".concat(translateX, ")"); // 슬라이드드 이동
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  }

  showSlide(currentSlide); // 초기 슬라이드 설정

  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide); // PC 드래그

  slider.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX; // 마우스 클릭한 위치 저장

    slider.style.transition = "none"; // 드래그 중 애니메이션 제거
  });
  slider.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    moveX = e.clientX - startX;
    slider.style.transform = "translateX(".concat(-currentSlide * 100 + moveX / 5, "%)"); // 드래그 효과 적용
  });
  slider.addEventListener("mouseup", function () {
    isDragging = false;
    if (moveX < -40) nextSlide(); // 왼쪽으로 40px 이상 이동 시 다음 슬라이드
    else if (moveX > 40) prevSlide(); // 오른쪽으로 40px 이상 이동 시 이전 슬라이드
      else showSlide(currentSlide); // 이동이 적으면 복귀
  });
  slider.addEventListener("mouseleave", function () {
    if (isDragging) {
      isDragging = false;
      showSlide(currentSlide); // 드래그 중 마우스가 나가면 현재 슬라이드 유지
    }
  }); // 모바일 touch swipe

  slider.addEventListener("touchstart", function (e) {
    isDragging = true;
    startX = e.touches[0].clientX; // 터치한 위치 저장

    slider.style.transition = "none";
  });
  slider.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    moveX = e.touches[0].clientX - startX;
    slider.style.transform = "translateX(".concat(-currentSlide * 100 + moveX / 5, "%)"); // 터치 이동 효과 적용
  });
  slider.addEventListener("touchend", function () {
    isDragging = false;
    if (moveX < -40) nextSlide(); // 왼쪽으로 40px 이상 이동 시시 다음 슬라이드
    else if (moveX > 40) prevSlide(); // 오른쪽으로 40px 이상 이동 시 이전 슬라이드
      else showSlide(currentSlide); // 이동이 적으면 복귀
  });
});