export class Calculator {

    constructor() {
        this.resetCalculator();
    }

    static VALID_KEYS = /\*|\^|v|\/|\+|\-|\>|\=|\.|[(0-9)]/;
    static OPERATOR_KEYS = /(\+|\-|\/|\*|\>|\^|v)/;

    static INITIAL_EXPRESSION = '0';
    static INITIAL_RAWINPUT = '0';
    static INITIAL_INPUT = '0';
    static INITIAL_HISTORY = '0';

    static OPERATIONS = {
        '+': (a, b) => { return (parseFloat(a) + parseFloat(b)) },
        '-': (a, b) => { return (parseFloat(a) - parseFloat(b)) },
        '*': (a, b) => { return (parseFloat(a) * parseFloat(b)) },
        '/': (a, b) => { return (parseFloat(a) / parseFloat(b)) },
        'v': (a, b) => { return (Math.sqrt(parseFloat(a))) },
        '^': (a, b) => { return (Math.pow(parseFloat(a), 2)) },
        '>': (a, b) => { return parseFloat(b) }
    }

    enterKey(rawKey) {
        if (this.isResetKey(rawKey)) { this.resetCalculator() } else if (this.isValidKey(rawKey)) { this.handleKey(rawKey) }
    }
    handleKey(key) {

        this.state.rawInput = this.addToRawInput(key);
        this.state.expression = this.extractExpression(this.state.rawInput);

        if (this.isNumber(key)) this.state.input = this.state.expression[this.state.expression.length - 1];
        if (this.isOperator(key) || this.isEqualKey(key) || this.isResetKey(key)) { this.state.input = this.solveExpression(this.state.expression) }
        if (this.isEqualKey(key)) { this.state.rawInput += '>' + this.solveExpression(this.state.expression).toString() + '>' }

        this.state.history = this.state.expression.join(' ').toString() + ` = ${this.solveExpression(this.state.expression)}`;
    }
    addToRawInput(key) {
        if (!/\./.test(this.state.expression[this.state.expression.length - 1]) || key != '.')
            return this.removeOperatorDuplicates(this.state.rawInput + key).replace('=', '');
        else return this.state.rawInput;
    }
    removeOperatorDuplicates(rawInput) {
        let newRawInput = '';
        for (let i = 0; i < rawInput.length; i++) {
            if (this.isNumber(rawInput[i]) || !this.isOperator(rawInput[i + 1])) {
                newRawInput = newRawInput + rawInput[i];
            }
        }
        return newRawInput;
    }
    extractExpression(rawInput) {
        return rawInput.split(Calculator.OPERATOR_KEYS).map(x => this.customParseFloat(x));
    }
    customParseFloat(element) {
        return (this.isNumber(element)) ? this.removeLeftZeros(element) : element;
    }
    removeLeftZeros(number) {
        if (number.charAt(0) == '0' && number.charAt(1) != '.' && number.length > 1) return this.removeLeftZeros(number.slice(1))
        else return number;
    }
    solveExpression(expression) {
        let accumulator = expression[0];
        for (const [i, x] of expression.entries()) {
            if (this.isOperator(x) && this.isNumber(expression[i + 1])) {
                accumulator = Calculator.OPERATIONS[x](accumulator, expression[i + 1]);
            }
        }
        return accumulator;
    }
    resetCalculator() {
        this.state = {
            expression: [Calculator.INITIAL_EXPRESSION],
            rawInput: Calculator.INITIAL_RAWINPUT,
            input: Calculator.INITIAL_INPUT,
            history: Calculator.INITIAL_HISTORY
        };
    }
    isNumber(element) {
        return (parseFloat(element) || parseFloat(element) === 0 || element === '.') ? true : false;
    }
    isOperator(element) {
        return Calculator.OPERATOR_KEYS.test(element);
    }
    isEqualKey(key) {
        return /=/.test(key);
    }
    isResetKey(key) {
        return /c|C/.test(key);
    }
    isValidKey(key) {
        return Calculator.VALID_KEYS.test(key);
    }

}