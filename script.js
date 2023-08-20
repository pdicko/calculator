const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

calculator.addEventListener('click', (e) => {

  if (e.target.classList.contains('button')) {

    getButton(e.target)

    // if (e.target.classList.contains('number')) {
    //   populateDisplay(e.target.textContent) 

    // } else if  (e.target.classList.contains('operator')) {
      
    // }

    // switch (e.target.id) {
    //   case 'clear':
    //     console.log(e.target.id)
    //     break;
    //   case 'delete':
    //     console.log(e.target.id)
    //     break;
    //   case 'decimal':
    //     console.log(e.target.id)
    //     break;
    //   case 'equals':
    //     console.log(e.target.id)
    //   default:
    //     break;
    // }

  }
});

const sumOf = (num1, num2) => num1 + num2;
const differenceOf = (num1, num2) => num1 - num2;
const productOf = (num1, num2) => num1 * num2;
const quotientOf = (num1, num2) => num1 / num2;

let num1;
let num2;
let operator;
let displayValue;

function operate(num1, num2, operator) {

  return operator(num1, num2);
}

function getButton(target) {
    switch (target.id) {
      case 'clear':
        console.log(target.id)
        break;
      case 'delete':
        console.log(target.id)
        break;
      case 'decimal':
        console.log(target.id)
        break;
      case 'equals':
        console.log(target.id)
      case 'zero':
      case 'one':
      case 'two':
      case 'three':
      case 'four':
      case 'five':
      case 'six':
      case 'seven':
      case 'eight':
      case 'nine':
        populateDisplay(target.textContent)
      default:
        break;
    }
}

function populateDisplay(number) {
  display.textContent += number;
}