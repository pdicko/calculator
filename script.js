const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

const sumOf = (num1, num2) => num1 + num2;
const differenceOf = (num1, num2) => num1 - num2;
const productOf = (num1, num2) => num1 * num2;
const quotientOf = (num1, num2) => num1 / num2;

class Equation {
  constructor () {
    this.num1 = '';
    this.num2 = '';
    this.operator = '';
    this.solution = ''
  }

  reset() {
    this.num1 = '';
    this.num2 = '';
    this.operator = '';
    this.solution = ''
  }
}

let currentEquation = new Equation();
let previousEquation = new Equation();
let currentDisplay;
let equalsClicks = 0;

function updateDisplay(currentNum, toAdd) {
    let CurrentNumAsString = currentNum.toString()
    CurrentNumAsString += toAdd;
    display.textContent = CurrentNumAsString;
}

function updateCurrentEquation (whichNumber) {
  currentEquation[whichNumber] = Number(display.textContent); 
}

function handleInput(eventTarget) {

  if (eventTarget.classList.contains('number')) {
    equalsClicks = 0;
    handleNumberInput(eventTarget);
  }

  if (eventTarget.classList.contains('operator')) {
    equalsClicks = 0;
    handleOperatorInput(eventTarget);
  }

  if (eventTarget.classList.contains('equals')) {
    equalsClicks++;
    operate(currentEquation);
  }
}

function handleNumberInput(eventTarget) {

  const toAdd = eventTarget.textContent; //is a String

  if (currentEquation.operator === '') {
    number = 'num1';
  } else {
    number = 'num2';
  }

  const currentNum = currentEquation[number];

  updateDisplay(currentNum, toAdd);
  updateCurrentEquation(number);
}

function handleOperatorInput(eventTarget) {

  const operator = eventTarget.textContent;
  currentEquation.operator = operator;
}

calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {
      handleInput(e.target);
    }

  if (e.target.classList.contains('operator')) {

    // if (lastButton === 'operator') {
    //   operator = e.target.id
    // };

    // if (operator != '') {
    //   num2 = currentNum;
    //   operate(num1, num2, operator);
    //   lastButton = 'operator'
    // }

    // if (lastButton === 'equals') {
    //   operator = e.target.id;
    //   display.textContent = currentNum;
    // }

    // operator = e.target.id;
    // num1 = currentNum;
    // currentNum = '';
    // lastButton = 'operator';
  }

  if (e.target.classList.contains('equals')) {

    // if (num1 === 0) {return};

    // if (lastButton === 'equals') {
    //   num2 = previousNum2;
    //   operate(num1, num2, operator);
    //   lastButton = 'equals';
    //   return;
    // }

    // num2 = currentNum;
    // operate(num1, num2, operator)
    // lastButton = 'equals'
  }

  if (e.target.id === 'clear') {
    num1 = 0;
    num2 = 0;
    operator = '';
    currentNum = '';
    display.textContent = 0;
    lastButton = 'clear'
  }

  if (e.target.id === 'delete') {
    if (lastButton === 'equals') {return}
    let asString = currentNum.toString();
    asString = asString.slice(0, -1);
    currentNum = Number(asString);
    if (currentNum === 0) {currentNum = ''}
    display.textContent = currentNum;
    lastButton = 'delete';
  }

  if (e.target.id === 'decimal') {
    if (currentNum % 1 != 0) {return}
    currentNum += '.';
    display.textContent = currentNum;
    lastButton = decimal;
  }
});

function operate(equation) {
  if ((!equation.num1 && equation.num1 != 0) || (!equation.num2 && equation.num2 != 0)) {return};

  const num1 = equation.num1;
  const num2 = equalsClicks > 1 ? previousEquation.num2 : equation.num2;
  const operator = equation.operator;
  let solution;

  switch (operator) {
    case '+':
      solution = sumOf(num1, num2);      
      break;
    case '-':
      solution = differenceOf(num1, num2);
      break;
    case '*':
      solution = productOf(num1, num2);
      break;
    case '/':
      if (num2 === 0) {
        solution = 'ERR'
      } else {
        solution = quotientOf(num1, num2);
      }
      break;
    default:
      break;
  }

  if (typeof(solution) === 'number') {
    solution = Number(solution.toFixed(5));
  }
  currentEquation.solution = solution;
  previousEquation = structuredClone(currentEquation);
  updateDisplay('', solution);

  currentEquation.num1 = solution;
  currentEquation.num2 = '';
}