let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');



function updateDisplay() {
    const display = document.querySelector("#display");
    display.textContent = displayValue;
    if (displayValue.length > 8) {
        display.textContent = displayValue.substring(0, 8);
    }
    console.log("updated");
}

updateDisplay();

function buttonClick() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
                console.log("you pressed an operator");
            } else if (buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if (buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains('clear')) {
                clear();
                updateDisplay();
            }
        })
    }
}

buttonClick();

function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue == "0") {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand; 
        }
    } else {
        if (displayValue == firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = round(result, 15).toString();
        firstOperand = displayValue;
        updateDisplay();
        console.log("hey1");
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = round(result, 15).toString();
        firstOperand = displayValue;
        updateDisplay();
        result = null;
        console.log("hey2");
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
        console.log("hey3");
    }
}

function inputEquals() {
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator)
        if (result == "Undefined") {
            displayValue = "Undefined"
        } else {
            displayValue = round(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator)
        if (result == "Undefined") {
            displayValue = "Undefined"
        } else {
            displayValue = round(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = "0";
        displayValue += dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputPercent(value) {
    displayValue = (value / 100).toString();
}

function inputSign(value) {
    displayValue = (value * -1).toString();
}

function clear() {
    displayValue = 0;
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function operate(fo, so, op) {
    if (op === "*") {
        return fo * so;
    } else if (op === "+") {
        return fo + so;
    } else if (op === "-") {
        return fo - so;
    } else if (op === "/") {
        if (so == "0") {
            return "Error"
        } else {
            return fo / so;
        }
    }
}

function round(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}