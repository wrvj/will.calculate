const calculatorElement = document.querySelector('.calculator');
const calculator = new Calculator();
const keyboard = calculatorElement.querySelector('.keyboard');
const display = calculatorElement.querySelector('.display');

keyboard.addEventListener('click', event => {
    calculator.enterKey(event.target.value);
    display.textContent = calculator.display.mainDisplay;
    display.dataset.secondaryDisplay = calculator.display.secondaryDisplay;
});
document.addEventListener('keydown', event => {
    calculator.enterKey(event.key);
    display.textContent = calculator.display.mainDisplay;
    display.dataset.secondaryDisplay = calculator.display.secondaryDisplay;
})