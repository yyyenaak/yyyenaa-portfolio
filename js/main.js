document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile_menu");
  const cards = document.querySelectorAll(".card");
  const skillBacks = document.querySelectorAll(".skill_back");

  function revealText(element, delay) {
    const letters = element.textContent.split("");
    element.textContent = "";

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${delay + index * 0.2}s`; // 0.2초 간격으로 등장
      element.appendChild(span);
    });
  }

  // "Yena, Jo" 먼저 타이핑
  revealText(document.querySelector(".sub_text2"), 0);

  // "조예나"는 0.8초 후 타이핑
  setTimeout(() => {
    const mainText = document.querySelector(".main_text");
    mainText.style.opacity = "1"; // "조예나" 보이도록 설정
    revealText(mainText, 0.8);
  }, 2000);

  // 설명 & 버튼을 타이핑 효과가 끝난 후 한 번에 나타나게 설정
  setTimeout(() => {
    document.querySelector(".sub_text").classList.add("show");
    document.querySelector(".click_me").classList.add("show");
  }, 4000); // "조예나" 타이핑 끝나는 시점에서 실행

  // 햄버거 버튼 클릭 시 네비 열기/닫기
  hamburger.addEventListener("click", () => {
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
    setTimeout(() => {
      mobileMenu.classList.remove("closing");
    }, 300);
  }

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", (event) => {
    const isClickInside =
      hamburger.contains(event.target) || mobileMenu.contains(event.target);
    if (!isClickInside) {
      closeMenu();
    }
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  const menuItems = mobileMenu.querySelectorAll(".navi_font");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeMenu();
    });
  });

  // skill 모바일 여닫기(클릭 시 아래로 펼쳐지게)
  skillBacks.forEach((skillBack) => {
    skillBack.addEventListener("click", () => {
      const detail = skillBack.querySelector(".sk_detail");
      const isOpen = detail.classList.contains("show");

      document.querySelectorAll(".sk_detail").forEach((d) => {
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
        setTimeout(() => {
          detail.classList.remove("show");
        }, 300);
      }
    });
  });

  // Project 스크롤 시 카드뷰 보이게
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px 0px",
    }
  );

  cards.forEach((card) => observer.observe(card));

  // Modal 열기
  function openPopup(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);
  }

  // Modal 닫기 (X 버튼 클릭 시)
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let modal = this.closest(".modal");
      if (modal) {
        closePopup(modal.id);
      }
    });
  });

  // Modal 닫기 함수
  function closePopup(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  }
});
