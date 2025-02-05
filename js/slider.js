const sliderWrap = document.querySelector(".slider_wrap");
const sliderImg = sliderWrap.querySelector(".slider_img"); // 보여지는 영역
const sliderInner = sliderWrap.querySelector(".slider_inner"); // 움직이는 영역
const slider = sliderWrap.querySelectorAll(".slider"); // 개별 영역
const sliderDot = sliderWrap.querySelector(".slider_dot");
const sliderBtn = sliderWrap.querySelectorAll(".slider_btn a");

let currentIndex = 0; // 현재 보이는 이미지
let sliderCount = slider.length; // 이미지 갯수
let sliderWidth = slider[0].offsetWidth; // 이미지 가로값
let sliderInterval = 1000; // 이미지 변경 시간
let dotIndex = "";

// 초기화 함수
function init() {
  // 이미지 갯수만큼 닷 메뉴 생성
  slider.forEach(() => (dotIndex += "<a href='#' class='dot'>이미지</a>"));
  sliderDot.innerHTML = dotIndex;

  // 첫번째 닷 메뉴에 활성화 표시
  sliderDot.firstChild.classList.add("active");
}
init();

// 이미지 이동시키기 (GSAP 적용)
function gotoSlider(num) {
  gsap.to(sliderInner, { duration: 0.4, x: -sliderWidth * num });
  currentIndex = num;

  let dotActive = document.querySelectorAll(".slider_dot .dot");
  dotActive.forEach((active) => active.classList.remove("active"));
  dotActive[num].classList.add("active");
}

// 버튼을 클릭했을 때 동작
sliderBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let prevIndex = (currentIndex + sliderCount - 1) % sliderCount;
    let nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      gotoSlider(prevIndex);
    } else {
      gotoSlider(nextIndex);
    }
  });
});
