const sliderWrap = document.querySelector(".slider_wrap");
const sliderImg = sliderWrap.querySelector(".slider_img");
const sliderInner = sliderWrap.querySelector(".slider_inner");
const slider = sliderWrap.querySelectorAll(".slider");
const sliderDot = sliderWrap.querySelector(".slider_dot");
const sliderBtn = sliderWrap.querySelectorAll(".slider_btn a");

let currentIndex = 0;
let sliderCount = slider.length;
let sliderWidth = slider[0].offsetWidth;

// 슬라이드 크기 조정
function updateSliderWidth() {
  sliderWidth = slider[0].offsetWidth;
  sliderInner.style.width = `${sliderWidth * sliderCount}px`;
}
updateSliderWidth();

// 초기화 함수
function init() {
  let dotIndex = "";
  slider.forEach((_, index) => {
    dotIndex += `<a href="#" class="dot" data-index="${index}"></a>`;
  });
  sliderDot.innerHTML = dotIndex;
  sliderDot.children[0].classList.add("active");
}
init();

// 이미지 이동시키기
function gotoSlider(num) {
  gsap.to(sliderInner, { duration: 0.4, x: -sliderWidth * num });
  currentIndex = num;

  let dotActive = document.querySelectorAll(".slider_dot .dot");
  dotActive.forEach((dot) => dot.classList.remove("active"));
  dotActive[num].classList.add("active");
}

// 버튼 클릭 이벤트
sliderBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let prevIndex = (currentIndex - 1 + sliderCount) % sliderCount;
    let nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      gotoSlider(prevIndex);
    } else {
      gotoSlider(nextIndex);
    }
  });
});

// 닷 클릭 이벤트
document.querySelectorAll(".slider_dot .dot").forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    let index = parseInt(dot.getAttribute("data-index"));
    gotoSlider(index);
  });
});

// 창 크기 변경 시 슬라이드 크기 다시 계산
window.addEventListener("resize", updateSliderWidth);
