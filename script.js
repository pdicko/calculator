const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

const sumOf = (num1, num2) => num1 + num2;
const differenceOf = (num1, num2) => num1 - num2;
const productOf = (num1, num2) => num1 * num2;
const quotientOf = (num1, num2) => num1 / num2;

// let num1 = 0;
// let num2 = 0;
// let operator = '';
// let currentNum;
// let lastButton;
// let previousNum2;

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

function handleInput (input) {

  const inputTarget = input;
  if (inputTarget.classList.contains('number')) {
    handleNumberInput(input);
  }
}

function handleNumberInput(input) {
  const inputTarget = input.textContent;
  let inputValue = Number(inputTarget);


  if (currentEquation.operator === '') {
    number = 'num1';
  } else {
    number = 'num2';
  }

  let asString = currentEquation[number].toString();
  asString += inputValue;
  currentEquation[number] = Number(asString);
  display.textContent = currentEquation[number];
}

calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {

      handleInput(e.target);
    // if (e.target.classList.contains('number')) {
    //     if (lastButton === 'equals') {
    //       return
    //     }

    //   currentNum += e.target.textContent;
    //   display.textContent = currentNum;
    //   lastButton = 'number';


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