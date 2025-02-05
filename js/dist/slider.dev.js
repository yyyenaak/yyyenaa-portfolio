"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var currentSlide = 0;
  var slides = document.querySelectorAll(".slide");
  var totalSlides = slides.length;
  var slider = document.querySelector(".slider");

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) {
      return;
    }

    currentSlide = index;
    var translateX = -currentSlide * 100 + "%";
    slider.style.transform = "translateX(".concat(translateX, ")");
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }

  showSlide(currentSlide);
  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);
});