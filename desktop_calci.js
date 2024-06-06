let currentDisplay = '';

function appendToDisplay(value) {
    currentDisplay += value;
    document.getElementById('display').value = currentDisplay;
}

function clearDisplay() {
    currentDisplay = '';
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const result = eval(currentDisplay);
        document.getElementById('display').value = result;
        currentDisplay = '';
    } catch (error) {
        document.getElementById('display').value = 'Error';
        currentDisplay = '';
    }
}
