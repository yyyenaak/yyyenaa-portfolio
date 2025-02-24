"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile_menu");
  var cards = document.querySelectorAll(".card");
  var skillBacks = document.querySelectorAll(".skill_back");

  function revealText(element, delay) {
    var showElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var letters = element.textContent.split("");
    element.textContent = ""; // 기존 텍스트 비우기

    if (showElement) {
      element.style.opacity = "1"; // "조예나" 나타나도록 설정
    }

    letters.forEach(function (letter, index) {
      var span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = "".concat(delay + index * 0.2, "s"); // 0.2초 간격으로 등장

      element.appendChild(span);
    });
  } // "Yena, Jo" 먼저 등장


  revealText(document.querySelector(".sub_text2"), 1); // 1초 후 등장

  setTimeout(function () {
    revealText(document.querySelector(".main_text"), 1, true);
  }, 2000); // 햄버거 버튼 클릭 시 네비 열기/닫기

  hamburger.addEventListener("click", function () {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.remove("closing");
    mobileMenu.classList.add("active");
  }

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
          d.style.maxHeight = "0px";
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
  }); // Modal 열기

  function openPopup(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "flex";
    setTimeout(function () {
      modal.classList.add("active");
    }, 10);
  } // Modal 닫기 (X 버튼 클릭 시)


  document.querySelectorAll(".close-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = this.closest(".modal");

      if (modal) {
        closePopup(modal.id);
      }
    });
  }); // Modal 닫기 함수

  function closePopup(modalId) {
    var modal = document.getElementById(modalId);

    if (modal) {
      modal.classList.remove("active");
      setTimeout(function () {
        modal.style.display = "none";
      }, 300);
    }
  }
});