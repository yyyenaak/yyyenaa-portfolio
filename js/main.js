document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile_menu');

  // 햄버거 버튼 클릭 시 메뉴 열기/닫기
  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMenu(); // 닫기
    } else {
      openMenu(); // 열기
    }
  });

  // 메뉴 열기 함수
  function openMenu() {
    hamburger.classList.add('active'); // 햄버거 버튼 활성화
    mobileMenu.classList.remove('closing'); // 닫힘 애니메이션 제거
    mobileMenu.classList.add('active'); // 메뉴 열림 상태 추가
  }

  // 메뉴 닫기 함수
  function closeMenu() {
    hamburger.classList.remove('active'); // 햄버거 버튼 비활성화
    mobileMenu.classList.remove('active'); // 메뉴 열림 상태 제거
    mobileMenu.classList.add('closing'); // 닫힘 상태 추가
    setTimeout(() => {
      mobileMenu.classList.remove('closing'); // 닫힘 애니메이션 종료 후 초기화
    }, 300); // 애니메이션 지속 시간 (0.3초)와 동일하게 설정
  }

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener('click', (event) => {
    const isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);
    if (!isClickInside) {
      closeMenu(); // 메뉴 닫기
    }
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  const menuItems = mobileMenu.querySelectorAll('.navi_font');
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      closeMenu(); // 메뉴 닫기
    });
  });
});
