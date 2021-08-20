function toneButtonClicked(e) {

    const key = e.target.parentElement.getAttribute("data-id");
    toggleToneButtons(key);    

}

function keyPressed(e) {

    let tone = "null";
    switch (e.keyCode) {
        case 65:
            tone = "A";
            break;
        case 71:
            tone = "G";
            break;
        case 220:
            tone = "Fis";
            break;
        case 70:
            tone = "F";
            break;
        case 69:
            tone = "E";
            break;
        case 68:
            tone = "D";
            break;
        case 67:
            tone = "C";
            break;
        case 72: // H
        case 66: // B
            tone = "B";
            break;
        case 27: // ESC
            resetToneButtons();
        default:
            break;
    }

    toggleToneButtons(tone);
}

function resetToneButtons() {

    const activeElements = document.querySelectorAll('div[class*="active-"]');
    activeElements.forEach(element => {
        element.classList.forEach(className => {
            if (className.startsWith('active-')) {
                element.classList.remove(className);
            }
        });
    });

}

function toggleToneButtons(key) {

    if (key === "null") {
        return;
    }

    const buttons = document.querySelectorAll(`.button[data-key="${key}"]`);
    buttons.forEach(button => button.classList.toggle(`active-${key}`));

    const selectedToneButtons = document.querySelectorAll(`.tone[data-id="${key}"]`);
    selectedToneButtons.forEach(button => button.classList.toggle(`active-${key}`));

}

function dragElement(element) {
    
    let newPosition = 0, lastPosition = 0;
    document.getElementById("root").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        
        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup:
        lastPosition = e.clientX;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

    }

    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();

        // calculate the new position:
        newPosition = element.offsetLeft - (lastPosition - e.clientX);
        lastPosition = e.clientX;

        // set the element's new position:
        element.style.left = newPosition + "px";

    }

    function closeDragElement() {

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

    }

}

const tones = Array.from(document.querySelectorAll('.tone'));
tones.forEach(tone => tone.addEventListener('click', toneButtonClicked));
window.addEventListener('keydown', keyPressed);

// Make the chord container draggable:
dragElement(document.getElementById("chord"));
