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
        return "ERROR: Can't divide by 0!";
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
        return Number.parseFloat(answer).toFixed(2);
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

