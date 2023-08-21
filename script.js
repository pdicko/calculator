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


calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {

    if (e.target.classList.contains('number')) {
      currentNum += e.target.textContent
      display.textContent = currentNum;
    }

    if (e.target.classList.contains('operator')) {
      operator = e.target.id;
      num1 = currentNum;
      currentNum = '';
    }

    if (e.target.classList.contains('equals')) {
      num2 = currentNum;
      operate(num1, num2, operator)
    }

    if (e.target.id === 'clear') {
      num1 = '';
      num2 = '';
      operator = '';
      currentNum = '';
      display.textContent = 0;
    }

    if (e.target.id === 'delete') {
      currentNum = currentNum.slice(0, -1);
      display.textContent = currentNum;
    }
  }
});

function operate(num1, num2, operator) {

  switch (operator) {
    case 'add':
      currentNum = sumOf(num1, num2);      
      break;
    case 'subtract':
      currentNum = differenceOf(num1, num2);
      break;
    case 'multiply':
      currentNum = productOf(num1, num2);
      break;
    case 'divide':
      currentNum = quotientOf(num1, num2);
      break;
    default:
      break;
  }

  display.textContent = currentNum;
  num1 = currentNum;
}