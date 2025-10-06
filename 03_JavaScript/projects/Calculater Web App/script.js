let currentNumber = '0';
let previousNumber = '';
let operation = '';
let shouldResetScreen = false;

const display = document.getElementById('current');

function updateDisplay() {
    display.textContent = currentNumber;
    
    if (currentNumber.length > 10) {
        display.style.fontSize = '1.3em';
    } else {
        display.style.fontSize = '2em';
    }
}

function addNumber(number) {
    if (shouldResetScreen) {
        currentNumber = '';
        shouldResetScreen = false;
    }
    
    if (number === '.' && currentNumber.includes('.')) {
        return;
    }
    
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (operation !== '' && !shouldResetScreen) {
        calculate();
    }
    
    previousNumber = currentNumber;
    operation = selectedOperation;
    shouldResetScreen = true;
}

function calculate() {
    if (previousNumber === '' || operation === '' || shouldResetScreen) {
        return;
    }
    
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Can't divide by zero!");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentNumber = result.toString();
    
    if (currentNumber.length > 12) {
        currentNumber = result.toExponential(6);
    }
    
    operation = '';
    previousNumber = '';
    shouldResetScreen = true;
    
    updateDisplay();
}

function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operation = '';
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (currentNumber.length === 1) {
        currentNumber = '0';
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }
    
    updateDisplay();
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        addNumber(event.key);
    }
    
    if (event.key === '.') {
        addNumber('.');
    }
    
    if (event.key === '+') {
        chooseOperation('+');
    }
    if (event.key === '-') {
        chooseOperation('-');
    }
    if (event.key === '*') {
        chooseOperation('×');
    }
    if (event.key === '/') {
        event.preventDefault();
        chooseOperation('÷');
    }
    
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        clearAll();
    }
    
    if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        deleteLast();
    }
});

updateDisplay();