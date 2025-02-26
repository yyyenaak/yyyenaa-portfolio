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
      span.style.animationDelay = `${delay + index * 0.2}s`;
      element.appendChild(span);
    });
  }

  revealText(document.querySelector(".sub_text2"), 0);

  setTimeout(() => {
    const mainText = document.querySelector(".main_text");
    mainText.style.opacity = "1";
    revealText(mainText, 0.8);
  }, 2000);

  setTimeout(() => {
    document.querySelector(".sub_text").classList.add("show");
    document.querySelector(".click_me").classList.add("show");
  }, 4000);

  // 햄버거 메뉴 토글
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });

  // skill 모바일 여닫기
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

  // Project 카드 애니메이션
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "50px 0px" }
  );

  cards.forEach((card) => observer.observe(card));

  /*** Modal 관련 코드 ***/

  function openPopup(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = "flex";
    requestAnimationFrame(() => {
      modal.classList.add("active");
    });

    // ESC 키 닫기 이벤트 추가
    document.addEventListener("keydown", escKeyClose);
  }

  function closePopup(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("active");
    modal.addEventListener(
      "transitionend",
      () => {
        if (!modal.classList.contains("active")) {
          modal.style.display = "none";
        }
      },
      { once: true }
    );

    // ESC 키 닫기 이벤트 제거
    document.removeEventListener("keydown", escKeyClose);
  }

  function escKeyClose(event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        closePopup(modal.id);
      });
    }
  }

  // "자세히" 버튼 클릭 이벤트
  document.querySelectorAll(".card-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      openPopup(modalId);
    });
  });

  // X 버튼으로 모달 닫기
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) closePopup(modal.id);
    });
  });

  // 모달 외부 클릭 시 닫기
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        closePopup(modal.id);
      }
    });
  });
});
