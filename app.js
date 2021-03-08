const calculator = document.querySelector('.calculator');
const keyboard = calculator.querySelector('.keyboard');
const display = calculator.querySelector('.display');
const debugDataContainer = document.querySelector('.debug-data');

debugDataContainer.innerText = `Last Number: ${calculator.dataset.firstNumber} Display Number: ${display.innerText} Operator:`;


keyboard.addEventListener('click', event => {
    debugDataContainer.innerText = `Last Number: ${calculator.dataset.firstNumber} Display Number: ${display.innerText} Operator: ${calculator.dataset.operator}`;




    if (!event.target.closest('button')) return

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    let { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    //if key is number
    if (type === 'number') {
        //zero to the left case
        if ((displayValue === '0' && keyValue != '.') || previousKeyType === 'equal') {
            display.textContent = '';
            // display.textContent = keyValue;
            // display.dataset.secondaryDisplay = keyValue;
        }
        //number after an operator
        if (previousKeyType === 'operator') {
            display.textContent = keyValue;

            if (keyValue != '0') updateSecondaryDisplayText(keyValue, 'append');
        }
        //add new digits to the current number
        else {

            if (keyValue != '.' || !displayValue.includes('.')) {

                display.textContent = display.textContent + keyValue;

                if (display.innerText != '0') updateSecondaryDisplayText(keyValue, 'append');
            }

        }
    }

    //if key is operator
    if (type === 'operator') {
        console.log('aqui nao')

        const operatorKeys = keyboard.querySelectorAll('[data-type = "operator"]');
        operatorKeys.forEach(element => {
            element.dataset.state = '';
        });
        key.dataset.state = 'selected';

        if (previousKeyType === 'equal' || previousKeyType === 'operator') {
            display.dataset.secondaryDisplay = display.dataset.secondaryDisplay.slice(0, -1);
        }
        if (previousKeyType === 'number' && calculator.dataset.firstNumber) {
            console.log('computar operação');
            display.innerText = calculate(calculator.dataset.firstNumber, displayValue, calculator.dataset.operator);
            calculator.dataset.firstNumber = display.innerText;
        } else {
            calculator.dataset.firstNumber = displayValue;
        }

        updateSecondaryDisplayText(keyValue, 'append');
        calculator.dataset.operator = key.dataset.operatorType;
    }
    if (type === 'equal' && previousKeyType == 'number' && calculator.dataset.operator != 'none') {

        // Performa a calculation
        const firstNumber = calculator.dataset.firstNumber;
        const secondNumber = displayValue;
        const operator = calculator.dataset.operator;

        console.log(firstNumber, secondNumber, operator);


        display.innerText = calculate(firstNumber, secondNumber, operator);
        calculator.dataset.firstNumber = display.innerText;
        updateSecondaryDisplayText('=', 'append');
        calculator.dataset.operator = 'none';


    } else if (type === 'equal') {
        type = previousKeyType;
        console.log("operaçao invalida");
    }
    if (type === 'clear') {
        display.innerText = '0';
        display.dataset.secondaryDisplay = '0';
        calculator.dataset.firstNumber = '0';
        calculator.dataset.operator = 'none';
    }

    calculator.dataset.previousKeyType = type;


});

function calculate(firstNumber, secondNumber, operator) {
    console.log("performing a calculation: ", firstNumber, operator, secondNumber);
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber;

    return secondNumber;

}

function updateSecondaryDisplayText(newText, method) {
    if (display.dataset.secondaryDisplay === '0' && newText != '.') {
        method = 'clear';
    }
    if (method === 'clear') display.dataset.secondaryDisplay = newText;
    if (method === 'append') display.dataset.secondaryDisplay = display.dataset.secondaryDisplay + newText;
}