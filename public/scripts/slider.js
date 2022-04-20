var numSlider = document.querySelector('#slider_num');
var slider = document.querySelector('#slider');
function changeNumber() {
    numSlider.textContent = "Rating: ".concat(slider.valueAsNumber, "/10");
}
slider.oninput = changeNumber;
