class Calculator {
  constructor() {

    this.state = Calculator.initialState;
    this.display = { mainDisplay: "0", secondaryDisplay: "0" };
  }
  static validKeys = /cC|[\*\+\x2D-\/=(0-9)]/;

  static initialState = {current_value: 0, previous_value: '', display_Value: '0', operator: ''};
  
  static operations = {
    'plus' : (a, b) => {return (parseFloat(a) + parseFloat(b))},
    'minus' : (a, b) => {return (parseFloat(a) - parseFloat(b))},
    'times' : (a, b) => {return (parseFloat(a) * parseFloat(b))},
    'divide' : (a, b) => {return (parseFloat(a) / parseFloat(b))}
  }
  static operatorByKey = {
    '+' : 'plus',
    '-' : 'minus',
    '*' : 'times',
    '/' : 'divide'
  }

  enterKey(key) {
    if (!this.isValidKey(key)) {
      console.log('invalid operation');
      return;
    }
    if (this.isNumberKey(key)) this.state = this.numberInputHandler(key);
    if (this.isOperatorKey(key)) this.state = this.operatorInputHandler(key);
    if (this.isResetKey(key)) this.state = Calculator.initialState;
    if (this.isEqualKey(key)) this.state = this.equalInputHandler();


    console.clear();
    console.log(this.state)

    this.display = { mainDisplay: this.state.display_Value, secondaryDisplay: "0" };

    return this.display;    
  }
  isValidKey(key) {
    if(key.length != 1) return false;
    return Calculator.validKeys.test(key);
  }
  isNumberKey(key){
    return /[(0-9)|\.]/.test(key);
  }
  isOperatorKey(key){
    return /[\*\+\x2D\/]/.test(key);
  }
  isResetKey(key){
    return /[cC]/.test(key);
  }
  isEqualKey(key){
    return /[=]/.test(key);
  }
  static calculate(a, operation, b){
    try{
      return Calculator.operations[operation](a, b);
    }catch (e){
      return NaN
    }
    
  }
  numberInputHandler(key){

    let  newDisplayValue = this.state.current_value.toString();

    newDisplayValue = (this.isDecimal(key) && this.isDecimal(newDisplayValue)) ? 
                      this.removeLeftZeros(this.state.display_Value) : this.removeLeftZeros(newDisplayValue + key);

    return {current_value: newDisplayValue,
            previous_value: this.state.previous_value,
            display_Value: newDisplayValue,
            operator: this.state.operator};
  }
  operatorInputHandler(key){
    if (!this.state.previous_value){
      return {current_value: 0,
              previous_value: parseFloat(this.state.display_Value),
              display_Value: this.state.current_value.toString(),
              operator: key};
    }else{
      const result = Calculator.calculate(this.state.previous_value, Calculator.operatorByKey[this.state.operator], this.state.current_value);
      return {current_value: 0,
              previous_value: result,
              display_Value: result.toString(),
              operator: key};
    }
  }
  equalInputHandler(){
    const result = Calculator.calculate(this.state.previous_value, Calculator.operatorByKey[this.state.operator], this.state.current_value);
    return {current_value: 0,
      previous_value: result,
      display_Value: result.toString(),
      operator: this.state.key};
  }


  updateDisplay(mainDisplay, secondaryDisplay){
    return {mainDisplay: mainDisplay, secondaryDisplay: secondaryDisplay};
  }
  removeLeftZeros(number){
    if(number.charAt(0) == '0' && number.charAt(1) != '.' && number.length>1)return this.removeLeftZeros(number.slice(1))
    else return number; 
  }
  isDecimal(number){
    return number.indexOf('.') === -1 ? false : true;
  }

    
}

const calc = new Calculator();
