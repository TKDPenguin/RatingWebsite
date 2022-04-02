var sliderNum = document.querySelector('#slider_num');
var slider = document.querySelector('#slider');
function changeNum() {
    sliderNum.textContent = "Rating: ".concat(slider.valueAsNumber, "/10");
}
slider.oninput = changeNum;
