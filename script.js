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
      operator = e.target.textContent;
      num1 = currentNum;
      currentNum = '';
    }

    if (e.target.classList.contains('equals')) {
      num2 = currentNum;
      operate(num1, num2, operator)
    }
  }
});

function operate(num1, num2, operator) {

  switch (operator) {
    case '+':
      currentNum = sumOf(num1, num2);      
      break;
    case '-':
      currentNum = differenceOf(num1, num2);
      break;
    case '*':
      currentNum = productOf(num1, num2);
      break;
    case '/':
      currentNum = quotientOf(num1, num2);
      break;
    default:
      break;
  }

  display.textContent = currentNum;
  num1 = currentNum;
}