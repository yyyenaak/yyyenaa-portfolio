"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 햄버거 바
document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile_menu");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}); //flipbox

function flipCover(css, options) {
  var options = options || {};

  if (_typeof(css) === "object") {
    options = css;
  } else {
    options.css = css;
  }

  var css = options.css;
  var url = options.url;
  var text = options.text || css;
  var width = options.width;
  var height = options.height;
  var $section = $(".flip-cover-" + css).addClass(css + "-section");
  var $button = $("<div>").addClass(css + "-button");
  var $cover = $("<div>").addClass(css + "-cover");
  var $outer = $("<div>").addClass(css + "-outer");
  var $inner = $("<div>").addClass(css + "-inner");

  if (width) {
    $section.css("width", width);
  }

  if (height) {
    $section.css("height", height);
    var lineHeight = ':after{ line-height: ' + height + ';}';
    var $outerStyle = $('<style>').text('.' + css + '-outer' + lineHeight);
    $outerStyle.appendTo($outer);
    var $innerStyle = $('<style>').text('.' + css + '-inner' + lineHeight);
    $innerStyle.appendTo($inner);
  }

  $cover.html($outer);
  $inner.insertAfter($outer);
  $button.html($("<a>").text(text).attr("href", url));
  $section.html($button);
  $cover.insertAfter($button);
}

flipCover({
  css: "github",
  url: "https://github.com/yyyenaak",
  text: "Github Y",
  width: "80px"
});
flipCover("linkedin", {
  url: "linkedin.com/in/yyyenaa1",
  text: "LinkYena",
  width: "80px"
});
flipCover("email", {
  text: "dpsk185@gmail.com",
  width: "80px",
  height: "50px"
});