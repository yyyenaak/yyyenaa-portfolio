"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile_menu");
  var cards = document.querySelectorAll(".card"); // 햄버거 버튼 클릭 시 메뉴 열기/닫기

  hamburger.addEventListener("click", function (event) {
    event.stopPropagation();
    mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
  }); // 메뉴 열기 함수

  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.add("active");
  } // 메뉴 닫기 함수


  function closeMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.add("closing"); // transition이 끝난 후 `closing` 클래스 제거

    mobileMenu.addEventListener("transitionend", function () {
      mobileMenu.classList.remove("closing", "active");
    }, {
      once: true
    });
  } // 메뉴 외부 클릭 시 닫기


  document.addEventListener("click", function (event) {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  }); // 메뉴 항목 클릭 시 닫기

  mobileMenu.querySelectorAll(".navi_font").forEach(function (item) {
    item.addEventListener("click", closeMenu);
  }); // Intersection Observer

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "50px 0px"
  });
  cards.forEach(function (card) {
    return observer.observe(card);
  });
});