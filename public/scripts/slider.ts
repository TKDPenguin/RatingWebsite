let numSlider = document.querySelector('#slider_num') as HTMLElement;
let slider :HTMLInputElement= document.querySelector('#slider') as HTMLInputElement;

function changeNumber() {
    numSlider.textContent = `Rating: ${slider.valueAsNumber}/10`;
}

slider.oninput = changeNumber;