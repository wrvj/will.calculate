const calculator = document.querySelector('.calculator');
const keyboard = calculator.querySelector('.keyboard');
const display = calculator.querySelector('.display');


keyboard.addEventListener('click', event => {

    if (!event.target.closest('button')) return

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    //if key is number
    if (type === 'number') {
        if (displayValue === '0') {
            display.textContent = keyValue;
        } else if (previousKeyType === 'operator') {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    //if key is operator
    if (type === 'operator') {
        const operatorKeys = keyboard.querySelectorAll('[data-type = "operator"]');
        operatorKeys.forEach(element => {
            element.dataset.state = '';
        });
        key.dataset.state = 'selected';

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.operatorType;
    }
    if (type === 'equal') {
        // Performa a calculation
        const firstNumber = calculator.dataset.firstNumber;
        const secondNumber = displayValue;
        const operator = calculator.dataset.operator;

        display.innerText = calculate(firstNumber, secondNumber, operator);
    }
    if (type === 'clear') {
        display.innerText = '0';
        calculator.dataset.firstNumber = '0';
        calculator.dataset.operator = 'plus';
    }

    calculator.dataset.previousKeyType = type

});

function calculate(firstNumber, secondNumber, operator) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber;

    return '0';

}