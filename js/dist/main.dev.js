"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile_menu");
  var cards = document.querySelectorAll(".card");
  var skillBacks = document.querySelectorAll(".skill_back"); // 햄버거 버튼 클릭 시 네비 열기/닫기

  hamburger.addEventListener("click", function () {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }); // 네비 열기

  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.remove("closing");
    mobileMenu.classList.add("active");
  } // 네비 닫기


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
      closeMenu();
    }
  }); // 메뉴 항목 클릭 시 메뉴 닫기

  var menuItems = mobileMenu.querySelectorAll(".navi_font");
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      closeMenu();
    });
  }); // skill 모바일 여닫기(클릭 시 아래로 펼쳐지게)

  skillBacks.forEach(function (skillBack) {
    skillBack.addEventListener("click", function () {
      var detail = skillBack.querySelector(".sk_detail");
      var isOpen = detail.classList.contains("show");
      document.querySelectorAll(".sk_detail").forEach(function (d) {
        if (d !== detail) {
          d.style.maxHeight = "0px"; // 닫을 때 높이 0으로 설정

          d.classList.remove("show");
        }
      });

      if (!isOpen) {
        detail.classList.add("show");
        detail.style.maxHeight = detail.scrollHeight + "px";
      } else {
        detail.style.maxHeight = "0px";
        setTimeout(function () {
          detail.classList.remove("show");
        }, 300);
      }
    });
  }); // Project 스크롤 시 카드뷰 보이게

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

function openPopup() {
  var modal = document.getElementById("popupModal");
  modal.style.display = "flex";
  setTimeout(function () {
    modal.classList.add("active");
  }, 10);
}

function closePopup() {
  var modal = document.getElementById("popupModal");
  modal.classList.remove("active");
  setTimeout(function () {
    modal.style.display = "none";
  }, 300);
} // 배경 클릭 시 모달 닫기


window.onclick = function (event) {
  var modal = document.getElementById("popupModal");

  if (event.target === modal) {
    closePopup();
  }
};