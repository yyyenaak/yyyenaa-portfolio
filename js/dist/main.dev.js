"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile_menu");
  var cards = document.querySelectorAll(".card");
  var titles = document.querySelectorAll(".sk_title");
  var details = document.querySelectorAll(".sk_detail"); // 햄버거 버튼 클릭 시 메뉴 열기/닫기

  hamburger.addEventListener("click", function () {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }); // 메뉴 열기 함수

  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.remove("closing");
    mobileMenu.classList.add("active");
  } // 메뉴 닫기 함수


  function closeMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenu.classList.add("closing");
    setTimeout(function () {
      mobileMenu.classList.remove("closing");
    }, 300);
  } // 메뉴 외부 클릭 시 메뉴 닫기


  document.addEventListener("click", function (event) {
    var isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);

    if (!isClickInside) {
      closeMenu(); // 메뉴 닫기
    }
  }); // 메뉴 항목 클릭 시 메뉴 닫기

  var menuItems = mobileMenu.querySelectorAll(".navi_font");
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      closeMenu(); // 메뉴 닫기
    });
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