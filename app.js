import {getHistoryDisplay, toggleTheme, setMobileHeight} from './ui.js';
import {Calculator} from './calculator.js'

const calculatorElement = document.querySelector('#calculator');
const keyboard = calculatorElement.querySelector('.keyboard');
const display = calculatorElement.querySelector('.display');
const historyDisplay = calculatorElement.querySelector('.history-display p');

const themeButton = document.querySelector('#themeButton');
let theme = 'light';
const root = document.documentElement;
setMobileHeight();

const calculator = new Calculator();

themeButton.addEventListener('click', e => {
    theme = (theme == 'dark') ? 'light' : 'dark';
    console.log(theme);
    toggleTheme(root, theme);
});

keyboard.addEventListener('click', event => {
    calculator.enterKey(event.target.value);
    display.textContent = calculator.state.input;
    historyDisplay.innerHTML = getHistoryDisplay(calculator.state.history);
});
document.addEventListener('keydown', event => {
    calculator.enterKey(event.key);
    display.textContent = calculator.state.input;
})

