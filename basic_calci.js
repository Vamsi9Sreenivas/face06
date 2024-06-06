const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');
const operationRadios = document.querySelectorAll('.operationRadio');
const calculateButton = document.getElementById('calculateBtn');
const resultField = document.getElementById('result');

calculateButton.addEventListener('click', calculate);

function calculate() {
    const firstNumber = parseFloat(firstNumberInput.value);
    const secondNumber = parseFloat(secondNumberInput.value);
    let result = 0;

    let selectedOperation = null;
    operationRadios.forEach(radio => {
        if (radio.checked) {
            selectedOperation = radio.value;
        }
    });

    switch (selectedOperation) {
        case 'add':
            result = firstNumber + secondNumber;
            break;
        case 'subtract':
            result = firstNumber - secondNumber;
            break;
        case 'multiply':
            result = firstNumber * secondNumber;
            break;
        case 'divide':
            if (secondNumber !== 0) {
                result = firstNumber / secondNumber;
            } else {
                result = 'Error: Division by zero';
            }
            break;
        case 'modulus':
            if (secondNumber !== 0) {
                result = firstNumber % secondNumber;
            } else {
                result = 'Error: Modulus by zero';
            }
            break;
        default:
            result = 'Error: Please select an operation';
            break;
    }

    if (typeof result === 'number' && result < 0) {
        resultField.value = 'Error: Negative result';
    } else {
        resultField.value = result;
    }
}
