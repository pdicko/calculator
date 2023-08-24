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
    this.isEditable = true;
  }

  reset() {
    this.num1 = '';
    this.num2 = '';
    this.operator = '';
    this.solution = ''
  }

  clone() {
    new Equation();
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

function updateCurrentEquation(whichNumber) {
  if (display.textContent.slice(-1) === '.') {return}
  currentEquation[whichNumber] = Number(display.textContent); 
}

function handleButtonInput(eventTarget) {

  if (eventTarget.classList.contains('number')) {
    handleNumberInput(eventTarget);
  }

  if (eventTarget.classList.contains('operator')) {
    handleOperatorInput(eventTarget);
  }

  if (eventTarget.classList.contains('equals')) {
    equalsClicks++;
    handleEquals();
  }

  if (eventTarget.id === 'clear') {
    currentEquation.reset();
    previousEquation.reset();
    equalsClicks = 0;
    updateDisplay('', 0);
  }

  if (eventTarget.id === 'delete') {
    handleDelete();
  }

  if (eventTarget.id === 'decimal') {
    handleDecimal();
  }
}

function handleNumberInput(eventTarget) {
  currentEquation.isEditable = true;

  const toAdd = (display.textContent.slice(-1) === '.') ? `.${eventTarget.textContent}` : eventTarget.textContent; //is a String
  let number;
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
  currentEquation.isEditable = false;

  if (currentEquation.operator != '' && currentEquation.num1 != '') {
    operate(currentEquation);
    updateCurrentEquation('num1');
  }

  if (equalsClicks > 0) {
    updateCurrentEquation('num1');
  }
  const operator = eventTarget.textContent;
  currentEquation.operator = operator;
}

function handleEquals() {
  if (equalsClicks > 1 && currentEquation.operator === '') {
    currentEquation.num1 = previousEquation.solution;
    currentEquation.num2 = previousEquation.num2;
    currentEquation.operator = previousEquation.operator;
   }

   if (currentEquation.num2 === '') {
    return
   }
  operate(currentEquation);
}

function handleDelete () {
  if (currentEquation.isEditable) {
    const number = !currentEquation.operator ? 'num1' : 'num2';

    const edit = display.textContent.slice(0, -1);
    updateDisplay(edit, '');
    updateCurrentEquation(number);
  }
}

function handleDecimal() {
  const number = !currentEquation.operator ? 'num1' : 'num2';
  if (currentEquation[number] % 1 != 0) {return}

  updateDisplay(currentEquation[number], '.');
}

function operate(equation) {
  if ((!equation.num1 && equation.num1 != 0) || (!equation.num2 && equation.num2 != 0)) {return};

  const num1 = equation.num1;
  const num2 = equation.num2;
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
  previousEquation = Object.assign(Object.create(currentEquation), currentEquation);
  updateDisplay('', solution);
  currentEquation.reset();

  currentEquation.isEditable = false;
}

calculator.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
      handleButtonInput(e.target);
    }
});