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
    }

    updateEquation(number) {
      // if ()
    }
}

let currentEquation = new Equation();
let currentDisplay;

function updateDisplay(toAdd) {
  if (display.textContent === '0') {
    display.textContent = toAdd;
  } else {
    display.textContent += toAdd;
  }

  return display.textContent;
}

function handleInput (eventTarget) {

  if (eventTarget.classList.contains('number')) {
    handleNumberInput(eventTarget);
  }
}

function handleNumberInput(eventTarget) {

  const toAdd = eventTarget.textContent; //is a String

  if (currentEquation.operator === '') {
    number = 'num1';
  } else {
    number = 'num2';
  }

  const newNumber = Number(updateDisplay(toAdd));
  currentEquation[number] = newNumber;
}

calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {
      handleInput(e.target);
    }

  if (e.target.classList.contains('operator')) {

    if (lastButton === 'operator') {
      operator = e.target.id
    };

    if (operator != '') {
      num2 = currentNum;
      operate(num1, num2, operator);
      lastButton = 'operator'
    }

    if (lastButton === 'equals') {
      operator = e.target.id;
      display.textContent = currentNum;
    }

    operator = e.target.id;
    num1 = currentNum;
    currentNum = '';
    lastButton = 'operator';
  }

  if (e.target.classList.contains('equals')) {
    if (num1 === 0) {return};

    if (lastButton === 'equals') {
      num2 = previousNum2;
      operate(num1, num2, operator);
      lastButton = 'equals';
      return;
    }

    num2 = currentNum;
    operate(num1, num2, operator)
    lastButton = 'equals'
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

function operate(number1, number2, operator) {

  let first = Number(number1);
  let second = Number(number2);

  if (operator === 'divide' && second === 0) {
    display.textContent = 'Err';
    return
  }

  switch (operator) {
    case 'add':
      currentNum = sumOf(first, second);      
      break;
    case 'subtract':
      currentNum = differenceOf(first, second);
      break;
    case 'multiply':
      currentNum = productOf(first, second);
      break;
    case 'divide':
      currentNum = quotientOf(first, second);
      break;
    default:
      break;
  }

  display.textContent = Number(currentNum.toFixed(5));
  num1 = currentNum;
  previousNum2 = second;
}