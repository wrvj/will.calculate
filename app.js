const calculatorElement = document.querySelector('#calculator');
const calculatorElement2 = document.querySelector('#calculator2');

const calculator = new Calculator();
const calculator2 = new Calculator();

const keyboard = calculatorElement.querySelector('.keyboard');
const display = calculatorElement.querySelector('.display');
const keyboard2 = calculatorElement2.querySelector('.keyboard');
const display2 = calculatorElement2.querySelector('.display');

keyboard.addEventListener('click', event => {
    calculator.enterKey(event.target.value);
    display.textContent = calculator.state.input;
    display.dataset.secondaryDisplay = calculator.state.history;
});
document.addEventListener('keydown', event => {
    calculator.enterKey(event.key);
    display.textContent = calculator.state.input;
    display.dataset.secondaryDisplay = calculator.state.history;
})
keyboard2.addEventListener('click', event => {
    calculator2.enterKey(event.target.value);
    display2.textContent = calculator2.state.input;
    display2.dataset.secondaryDisplay = calculator2.state.history;
});
document2.addEventListener('keydown', event => {
    calculator2.enterKey(event.key);
    display2.textContent = calculator2.state.input;
    display2.dataset.secondaryDisplay = calculator2.state.history;
})