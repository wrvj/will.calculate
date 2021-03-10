class Calculator {

    constructor() {
      this.resetCalculator();
    }
    
    static VALID_KEYS = /\*|\/|\+|\-|\>|\=|\.|[(0-9)]/;
    static OPERATOR_KEYS = /(\+|\-|\/|\*|\>)/;

    static INITIAL_EXPRESSION = '0';
    static INITIAL_RAWINPUT = '0';
    static INITIAL_INPUT = '0';
    static INITIAL_HISTORY = '0';
    
    static OPERATIONS = {
        '+': (a, b) => { return (parseFloat(a) + parseFloat(b)) },
        '-': (a, b) => { return (parseFloat(a) - parseFloat(b)) },
        '*': (a, b) => { return (parseFloat(a) * parseFloat(b)) },
        '/': (a, b) => { return (parseFloat(a) / parseFloat(b)) },
        '>': (a, b) => { return parseFloat(b) }
    }

    enterKey(rawKey){
      if (this.isResetKey(rawKey)) { this.resetCalculator() }
      else if (this.isValidKey(rawKey)) { this.handleKey(rawKey) }
    }
    handleKey(key){

      this.state.rawInput = this.addToRawInput(key);
      this.state.expression = this.processRawInput(this.state.rawInput);
      
      if (this.isNumber(key))this.display.mainDisplay = this.state.expression[this.state.expression.length-1];
      if (this.isOperator(key) || this.isEqualKey(key) || this.isResetKey(key)){this.display.mainDisplay = this.solveExpression(this.state.expression)}
      if (this.isEqualKey(key)) {
        this.state.rawInput += '>' + this.solveExpression(this.state.expression).toString() + '>';
      } 
      this.display.secondaryDisplay = this.state.expression.join(' ').toString() + ` = ${this.solveExpression(this.state.expression)}`;
    }
    addToRawInput(key){
        if(!/\./.test(this.state.expression[this.state.expression.length-1]) || key != '.')
        return this.removeOperatorDuplicates(this.state.rawInput + key).replace('=', '');
        else return this.state.rawInput;
    }
    removeOperatorDuplicates(rawInput){
      let newRawInput = '';
      for (let i = 0;i<rawInput.length;i++){
        if(this.isNumber(rawInput[i]) || !this.isOperator(rawInput[i+1])){
          newRawInput = newRawInput + rawInput[i];
        }
      }
      return newRawInput;
    }
    processRawInput(rawInput){
      return rawInput.split(Calculator.OPERATOR_KEYS).map(x => this.customParseFloat(x));
    }
    customParseFloat(element){
      return (this.isNumber(element)) ? this.removeLeftZeros(element) : element;
    }
    removeLeftZeros(number) {
      if (number.charAt(0) == '0' && number.charAt(1) != '.' && number.length > 1) return this.removeLeftZeros(number.slice(1))
      else return number;
  }
    resetCalculator(){
    this.state = {expression: [Calculator.INITIAL_EXPRESSION], rawInput: Calculator.INITIAL_RAWINPUT};
    this.display = {mainDisplay: Calculator.INITIAL_INPUT, secondaryDisplay : Calculator.INITIAL_HISTORY};
  }
    solveExpression(expression){
      let accumulator = expression[0];
      for (const [i,x] of expression.entries()){
        if(this.isOperator(x) && this.isNumber(expression[i+1])){
          accumulator = Calculator.OPERATIONS[x](accumulator, expression[i+1]);
        } 
      }
      return accumulator;
    }
    isNumber(element){
      return (parseFloat(element) || parseFloat(element) === 0 || element==='.') ? true : false;
    }
    isOperator(element){
      return Calculator.OPERATOR_KEYS.test(element);
    }
    isEqualKey(key){
      return /=/.test(key);
    }
    isResetKey(key){
      return /c|C/.test(key);
    }
    isValidKey(key){
      return Calculator.VALID_KEYS.test(key);
    }
}

