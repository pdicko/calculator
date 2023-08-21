const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

const sumOf = (num1, num2) => +num1 + +num2;
const differenceOf = (num1, num2) => +num1 - +num2;
const productOf = (num1, num2) => +num1 * +num2;
const quotientOf = (num1, num2) => +num1 / +num2;

let num1;
let num2;
let operator;
let currentNum = '';
let lastButton;


calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {

    if (e.target.classList.contains('number')) {
        if (lastButton === 'equals') {
          return
        }
      currentNum += e.target.textContent
      display.textContent = currentNum;
      lastButton = 'number';
    }

    if (e.target.classList.contains('operator')) {
      operator = e.target.id;
      num1 = currentNum;
      currentNum = '';
      lastButton = 'operator'
    }

    if (e.target.classList.contains('equals')) {
      num2 = currentNum;
      operate(num1, num2, operator)
      lastButton = 'equals'
    }

    if (e.target.id === 'clear') {
      num1 = '';
      num2 = '';
      operator = '';
      currentNum = '';
      display.textContent = 0;
      lastButton = 'clear'
    }

    if (e.target.id === 'delete') {
      if (lastButton === 'equals') {return}
      currentNum = currentNum.slice(0, -1);
      display.textContent = currentNum;
      lastButton = 'delete'
    }

    if (e.target.id === 'decimal') {
      if (currentNum % 1 != 0) {return}
      currentNum += '.';
      display.textContent = currentNum;
      lastButton = decimal
    }
  }
});

function operate(number1, number2, operator) {

  switch (operator) {
    case 'add':
      currentNum = sumOf(number1, number2);      
      break;
    case 'subtract':
      currentNum = differenceOf(number1, number2);
      break;
    case 'multiply':
      currentNum = productOf(number1, number2);
      break;
    case 'divide':
      currentNum = quotientOf(number1, number2);
      break;
    default:
      break;
  }

  display.textContent = Number(currentNum.toFixed(5));
  num1 = currentNum;
}