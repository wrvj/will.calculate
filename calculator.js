class Calculator {
    constructor() {

        this.state = Calculator.INITIAL_STATE;
        this.display = { mainDisplay: "0", secondaryDisplay: "0" };
    }
    static validKeys = /[\*\+\x2D-\/=(0-9)cC]/;
    static operatorKeys = /(\+|\-|\/|\*)/;

    static INITIAL_STATE = {expression : ['0'], rawInput : '0'};
    

    static operations = {
        '+': (a, b) => { return (parseFloat(a) + parseFloat(b)) },
        '-': (a, b) => { return (parseFloat(a) - parseFloat(b)) },
        '*': (a, b) => { return (parseFloat(a) * parseFloat(b)) },
        '/': (a, b) => { return (parseFloat(a) / parseFloat(b)) }
    }
    static calculate(a, operation, b) {
        try {
            return Calculator.operations[operation](a, b);
        } catch (e) {
            return undefined
        }

    }
    enterKey(key){
      if(!this.isValidKey(key)){
        return;
      }
      this.state.rawInput = this.addToRawInput(key);
      
      if(this.isEqualKey(key)) {
        this.state.rawInput = '0' +  this.solveExpression(this.state.expression).toString();
        // this.state.expression = [this.solveExpression(this.state.expression)];
      } 
      if (this.isResetKey(key)){
        this.state.rawInput = '0';
      }

      this.state.expression = this.processRawInput(this.state.rawInput);
      this.display.secondaryDisplay = this.state.expression.join(' ').toString() + ` = ${this.solveExpression(this.state.expression)}`;
      
      if (this.isNumber(key))this.display.mainDisplay = this.state.expression[this.state.expression.length-1];
      if(this.isOperator(key) || this.isEqualKey(key) || this.isResetKey(key)){this.display.mainDisplay = this.solveExpression(this.state.expression)}
      console.log(this.state.rawInput, this.state.expression, this.solveExpression(this.state.expression).toString());
    }
    isNumber(element){
      return (parseFloat(element) || parseFloat(element) === 0 || element==='.') ? true : false;
    }
    isOperator(element){
      return Calculator.operatorKeys.test(element);
    }
    isEqualKey(key){
      return /=/.test(key);
    }
    isResetKey(key){
      return /c|C/.test(key);
    }
    isValidKey(key){
      return Calculator.validKeys.test(key);
    }
    addToRawInput(char){
        return this.removeOperatorDuplicates(this.state.rawInput + char);
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
      return rawInput.split(Calculator.operatorKeys).map(x => this.customParseFloat(x));
    }
    customParseFloat(element){
      return (this.isNumber(element)) ? parseFloat(element) : element;
    }


    solveExpression(expression){
      let accumulator = expression[0];
      for (const [i,x] of expression.entries()){
        if(this.isOperator(x) && this.isNumber(expression[i+1])){
          accumulator = Calculator.operations[x](accumulator, expression[i+1]);
        } 
      }
      return accumulator;
    }
}

