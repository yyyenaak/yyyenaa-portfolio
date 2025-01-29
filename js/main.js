document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile_menu");
  const cards = document.querySelectorAll(".card");
  const titles = document.querySelectorAll(".sk_title");
  const details = document.querySelectorAll(".sk_detail");

  // 햄버거 버튼 클릭 시 메뉴 열기/닫기
  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 메뉴 열기 함수
  function openMenu() {
    hamburger.classList.add("active");
    mobileMenu.classList.remove("closing");
    mobileMenu.classList.add("active");
  }

  // 메뉴 닫기 함수
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
      closeMenu(); // 메뉴 닫기
    }
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  const menuItems = mobileMenu.querySelectorAll(".navi_font");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeMenu(); // 메뉴 닫기
    });
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
