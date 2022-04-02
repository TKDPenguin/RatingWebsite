let sliderNum = document.querySelector('#slider_num') as HTMLElement;
let slider = document.querySelector('#slider') as HTMLInputElement;

function changeNum() {
    sliderNum.textContent = `Rating: ${slider.valueAsNumber}/10`;
}

slider.oninput = changeNum;