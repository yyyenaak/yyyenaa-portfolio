document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile_menu");
  const cards = document.querySelectorAll(".card");
  const skillBacks = document.querySelectorAll(".skill_back");

  // 햄버거 버튼 클릭 시 네비 열기/닫기
  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 네비 열기
  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.remove("closing");
    mobileMenu.classList.add("active");
  }

  // 네비 닫기
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
          d.style.maxHeight = "0px"; // 닫을 때 높이 0으로 설정
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
});

// Modal 열기
function openPopup(modalId) {
  let modal = document.getElementById(modalId);
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

// Modal 닫기
function closePopup(modalId) {
  let modal = document.getElementById(modalId);
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// 배경 클릭 시 해당 모달 닫기
window.onclick = function (event) {
  let modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      closePopup(modal.id);
    }
  });
};
