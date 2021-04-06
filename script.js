const displayContainer = document.querySelector('.display');
const display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const backspaceBtn = document.querySelector('.backspace');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current value if first value is entered
    if (awaitingNextValue) {
        display.textContent = number;
        awaitingNextValue = false;
    }
    else {
        // If current display value is 0, replace it, if not add number
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Add Decimal
function addDecimal() {
    // If Operator pressed, don't add deciaml
    if (awaitingNextValue) return;

    // If no decimal then, add one
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

// Calculate First and Second Values depending upon the operator
const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,

    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,

    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,

    '=' : (firstNumber, secondNumber) => secondNumber,
}

// Use Operator
function useOperator(operator) {
    const currentValue = Number(display.textContent);
    // Prevent Multiple Operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // If there is no First Value
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// Adding Event Listeners for Numbers, Decimal, Operators
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset All
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    displayContainer.classList.add('flash');
    setTimeout(() => {
        displayContainer.classList.remove('flash');
        display.textContent = '0';
    },200);
}

// Backspace Function
function backspace() {
    if (display.textContent !== '0') {
        display.textContent = display.textContent.slice(0,-1);
        if (!display.textContent) {
            display.textContent = '0';
        }
        if (awaitingNextValue) {
            firstValue = Number(display.textContent);
        }
    }
}

// Event Listeners
clearBtn.addEventListener('click', resetAll);
backspaceBtn.addEventListener('click', backspace);