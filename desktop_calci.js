let currentDisplay = '';

function appendToDisplay(value) {
    const display = document.getElementById('display');
    currentDisplay += value;
    display.value = currentDisplay;
}

function clearDisplay() {
    const display = document.getElementById('display');
    currentDisplay = '';
    display.value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    currentDisplay = display.value.slice(0, -1);
    display.value = currentDisplay;
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        const sanitizedDisplay = currentDisplay.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedDisplay);
        if (result >= 0) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
        currentDisplay = result.toString();
    } catch (error) {
        display.value = 'Error';
        currentDisplay = '';
    }
}
