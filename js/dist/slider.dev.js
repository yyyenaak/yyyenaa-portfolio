"use strict";

var sliderWrap = document.querySelector(".slider_wrap");
var sliderImg = sliderWrap.querySelector(".slider_img"); // 보여지는 영역

var sliderInner = sliderWrap.querySelector(".slider_inner"); // 움직이는 영역

var slider = sliderWrap.querySelectorAll(".slider"); // 개별 영역

var sliderDot = sliderWrap.querySelector(".slider_dot");
var sliderBtn = sliderWrap.querySelectorAll(".slider_btn a");
var currentIndex = 0; // 현재 보이는 이미지

var sliderCount = slider.length; // 이미지 갯수

var sliderWidth = slider[0].offsetWidth; // 이미지 가로값

var sliderInterval = 1000; // 이미지 변경 시간

var dotIndex = ""; // 초기화 함수

function init() {
  // 이미지 갯수만큼 닷 메뉴 생성
  slider.forEach(function () {
    return dotIndex += "<a href='#' class='dot'>이미지</a>";
  });
  sliderDot.innerHTML = dotIndex; // 첫번째 닷 메뉴에 활성화 표시

  sliderDot.firstChild.classList.add("active");
}

init(); // 이미지 이동시키기 (GSAP 적용)

function gotoSlider(num) {
  gsap.to(sliderInner, {
    duration: 0.4,
    x: -sliderWidth * num
  });
  currentIndex = num;
  var dotActive = document.querySelectorAll(".slider_dot .dot");
  dotActive.forEach(function (active) {
    return active.classList.remove("active");
  });
  dotActive[num].classList.add("active");
} // 버튼을 클릭했을 때 동작


sliderBtn.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    var prevIndex = (currentIndex + sliderCount - 1) % sliderCount;
    var nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      gotoSlider(prevIndex);
    } else {
      gotoSlider(nextIndex);
    }
  });
});