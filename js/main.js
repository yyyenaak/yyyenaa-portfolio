document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile_menu");
  const cards = document.querySelectorAll(".card");

  // 햄버거 버튼 클릭 시 메뉴 열기/닫기
  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
  });

  // 메뉴 열기 함수
  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.add("active");
  }

  // 메뉴 닫기 함수
  function closeMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.add("closing");

    // transition이 끝난 후 `closing` 클래스 제거
    mobileMenu.addEventListener(
      "transitionend",
      () => {
        mobileMenu.classList.remove("closing", "active");
      },
      { once: true }
    );
  }

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener("click", (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // 메뉴 항목 클릭 시 닫기
  mobileMenu.querySelectorAll(".navi_font").forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  // Intersection Observer
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
