"use strict";

var sliderWrap = document.querySelector(".slider_wrap");
var sliderImg = sliderWrap.querySelector(".slider_img");
var sliderInner = sliderWrap.querySelector(".slider_inner");
var slider = sliderWrap.querySelectorAll(".slider");
var sliderDot = sliderWrap.querySelector(".slider_dot");
var sliderBtn = sliderWrap.querySelectorAll(".slider_btn a");
var currentIndex = 0;
var sliderCount = slider.length;
var sliderWidth = slider[0].offsetWidth; // 슬라이드 크기 조정

function updateSliderWidth() {
  sliderWidth = slider[0].offsetWidth;
  sliderInner.style.width = "".concat(sliderWidth * sliderCount, "px");
}

updateSliderWidth(); // 초기화 함수

function init() {
  var dotIndex = "";
  slider.forEach(function (_, index) {
    dotIndex += "<a href=\"#\" class=\"dot\" data-index=\"".concat(index, "\"></a>");
  });
  sliderDot.innerHTML = dotIndex;
  sliderDot.children[0].classList.add("active");
}

init(); // 이미지 이동시키기

function gotoSlider(num) {
  gsap.to(sliderInner, {
    duration: 0.4,
    x: -sliderWidth * num
  });
  currentIndex = num;
  var dotActive = document.querySelectorAll(".slider_dot .dot");
  dotActive.forEach(function (dot) {
    return dot.classList.remove("active");
  });
  dotActive[num].classList.add("active");
} // 버튼 클릭 이벤트


sliderBtn.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    var prevIndex = (currentIndex - 1 + sliderCount) % sliderCount;
    var nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      gotoSlider(prevIndex);
    } else {
      gotoSlider(nextIndex);
    }
  });
}); // 닷 클릭 이벤트

document.querySelectorAll(".slider_dot .dot").forEach(function (dot) {
  dot.addEventListener("click", function (e) {
    e.preventDefault();
    var index = parseInt(dot.getAttribute("data-index"));
    gotoSlider(index);
  });
}); // 창 크기 변경 시 슬라이드 크기 다시 계산

window.addEventListener("resize", updateSliderWidth);