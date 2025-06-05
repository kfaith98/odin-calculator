let firstNumber = ''; 
let operator = ''; 
let result = '';
let shouldResetDisplay = false;
let hasError = false;
let lastInputWasOperator = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    }
    return a / b;
}

function operate(firstNumber, operand, secondNumber) {
    let answer;
    let a  = Number(firstNumber);
    let b = Number(secondNumber);
    if (operand === '+') {
        answer = add(a, b);
    }
    else if (operand === '-') {
        answer = subtract(a, b);
    }
    else if (operand === '*') {
        answer = multiply(a, b);
    }
    else if (operand === '/') {
        answer = divide(a,b);
    }

    if (typeof answer === "number") {
        return Number.parseFloat(answer).toFixed(5); // update later
    }
    else {
        return answer;
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 100);
    });
});

function numberInput() {
    const numericKeys = document.querySelectorAll('.numeric');
    const decimal = document.querySelector('#decimal');
    numericKeys.forEach(button => {
        button.addEventListener('click', () => {
        lastInputWasOperator = false;
        const display = document.querySelector(".display");

        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }

        if (hasError) {
            display.textContent = '';
            hasError = false;
        }

        display.append(button.textContent);
        });
    });

    decimal.addEventListener('click', () => {
        const display = document.querySelector(".display");

        if (display.textContent.includes('.')) {
            return;
        }
        else {
            display.append(decimal.textContent);
        }
    }); 
}
numberInput();

function operatorInput() {
    const operatorKeys = document.querySelectorAll('.operator');
    operatorKeys.forEach(button => {     
        button.addEventListener('click', () => {
            const display = document.querySelector(".display");

            if (lastInputWasOperator) {
                display.textContent = "INVALID";
                hasError = true;
                shouldResetDisplay = true;
                lastInputWasOperator = false; 
                return;
            }

            if (firstNumber !== '' && operator !== '' && !shouldResetDisplay) {
                secondNumber = display.textContent;
                let result = operate(firstNumber, operator, secondNumber);
                display.textContent = result;
                firstNumber = result;
            } else {
                firstNumber = display.textContent;
            }

            operator = button.textContent;
            shouldResetDisplay = true;
            lastInputWasOperator = true;
        });
    });
}
operatorInput();

function calculateOperation() {
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => {
        const display = document.querySelector(".display");
        const current = display.textContent;

        if (hasError || firstNumber === '' || operator === '' || current === firstNumber) {
            display.textContent = "INVALID";
            hasError = true;
            shouldResetDisplay = true;
            return;
        }

        if (isNaN(Number(current))) {
            display.textContent = "INVALID";
            hasError = true;
            shouldResetDisplay = true;
            return;
        }

        secondNumber = current;

        result = operate(firstNumber, operator, secondNumber);
        display.textContent = result;

        if (result === "ERROR") {
            hasError = true;
        }

        shouldResetDisplay = true;
    });
}
calculateOperation();

function clearDisplay() {
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', () => {
        const display = document.querySelector(".display");

        firstNumber = ''; 
        operator = ''; 
        result = '';
        shouldResetDisplay = false;
        hasError = false;

        display.textContent = '';
    }); 
}
clearDisplay();

function deleteDisplay() {
    const del = document.querySelector('#delete');
    del.addEventListener('click', () => {
        const display = document.querySelector(".display");

        if (display.textContent.length > 0) {
            display.textContent = display.textContent.slice(0, -1);
        }
    }); 
}
deleteDisplay();

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const display = document.querySelector(".display");

    if (hasError && key !== 'Escape') return;

    if (!isNaN(key)) {
        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        display.append(key);
        lastInputWasOperator = false;
    }

    if (key === '.' && !display.textContent.includes('.')) {
        display.append('.');
    }

    if (['+', '-', '*', '/'].includes(key)) {
        const button = document.querySelector(`.operator[data-key="${key}"]`);
        if (operator !== '' && shouldResetDisplay) {
            operator = key;
        } else if (firstNumber !== '' && operator !== '') {
            secondNumber = display.textContent;
            let result = operate(firstNumber, operator, secondNumber);
            display.textContent = result;
            firstNumber = result;
        } else {
            firstNumber = display.textContent;
        }

        if (lastInputWasOperator) {
            display.textContent = "INVALID";
            hasError = true;
            shouldResetDisplay = true;
            lastInputWasOperator = false;
            return;
        }

        operator = key;
        shouldResetDisplay = true;
        lastInputWasOperator = true;
    }

    if (key === 'Enter' || key === '=') {
        if (firstNumber === '' || operator === '' || lastInputWasOperator) {
            display.textContent = "INVALID";
            hasError = true;
            shouldResetDisplay = true;
            return;
        }
        secondNumber = display.textContent;
        result = operate(firstNumber, operator, secondNumber);
        display.textContent = result;

        if (result === "ERROR") {
            hasError = true;
        }

        shouldResetDisplay = true;
        lastInputWasOperator = false;
    }

    if (key === 'Escape') {
        firstNumber = ''; 
        operator = ''; 
        result = '';
        shouldResetDisplay = false;
        hasError = false;
        display.textContent = '';
    }

    if (key === 'Backspace') {
        if (display.textContent.length > 0) {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
});
