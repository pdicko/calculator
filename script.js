// DOM Elements
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

// Math functions
const sumOf = (num1, num2) => num1 + num2;
const differenceOf = (num1, num2) => num1 - num2;
const productOf = (num1, num2) => num1 * num2;
const quotientOf = (num1, num2) => num1 / num2;

//Equation class definition
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

//Global variables to track equation info
let currentEquation = new Equation();
let previousEquation = new Equation();
let currentDisplay;
let equalsClicks = 0;

//Update functions for display and current equation data bucket
function updateDisplay(currentNum, toAdd) {
    let CurrentNumAsString = currentNum.toString()
    CurrentNumAsString += toAdd;
    display.textContent = CurrentNumAsString;
}

function updateCurrentEquation(whichNumber) {
  //Don't update if decimal is input since converting
  //to number will drop the decimal. When the next number
  //is input, the decimal will be included on update.
  if (display.textContent.slice(-1) === '.') {return}
  currentEquation[whichNumber] = Number(display.textContent); 
}

//Delegation function for mouse input.
function handleMouseInput(eventTarget) {

  if (eventTarget.classList.contains('number')) {
    handleNumberInput(eventTarget.textContent);
  }

  if (eventTarget.classList.contains('operator')) {
    handleOperatorInput(eventTarget.textContent);
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

  if (eventTarget.id === 'negative') {
    handleNegative();
  }
}

//Delegation function for keyboard input.
function handleKeyboardInput(event) {
  if (event.key.match(/[0-9]/)) {
    handleNumberInput(event.key);
  }

  if (event.key.match(/[\/\*\-\+]/)) {
    console.log('yes hello');
    handleOperatorInput(event.key);
  }

  if (event.key === '=' || event.key === 'Enter') {
    equalsClicks++;
    handleEquals();
  }   

  if (event.key === 'Escape' || event.key.match(/c/i)) {
    currentEquation.reset();
    previousEquation.reset();
    equalsClicks = 0;
    updateDisplay('', 0);
  }

  if (event.key === 'Backspace') {
    handleDelete();
  }

  if (event.key.match(/\./)) {
    handleDecimal();
  }
}

//Handler for number input.
function handleNumberInput(number) {
  currentEquation.isEditable = true;

  const toAdd = (display.textContent.slice(-1) === '.') ? `.${number}` : number; //is a String
  let key;
  if (currentEquation.operator === '') {
    key = 'num1';
  } else {
    key = 'num2';
  }

  const currentNum = currentEquation[key];

  updateDisplay(currentNum, toAdd);
  updateCurrentEquation(key);
}

//Handler for operator input.
function handleOperatorInput(operator) {
  currentEquation.isEditable = false;

  if (currentEquation.operator != '' && currentEquation.num1 != '') {
    operate(currentEquation);
    updateCurrentEquation('num1');
  }

  if (equalsClicks > 0) {
    updateCurrentEquation('num1');
  }
  const operatorSymbol = operator;
  currentEquation.operator = operatorSymbol;
}

//Function for equals. Passes equation info into appropraite math function.
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

//Handles deleting numbers input.
function handleDelete () {
  if (currentEquation.isEditable) {
    const number = !currentEquation.operator ? 'num1' : 'num2';

    const edit = display.textContent.slice(0, -1);
    updateDisplay(edit, '');
    updateCurrentEquation(number);
  }
}

//Handles adding decimal point.
function handleDecimal() {
  const number = !currentEquation.operator ? 'num1' : 'num2';
  if (currentEquation[number] % 1 != 0) {return}

  updateDisplay(currentEquation[number], '.');
}

//Handles negative/positive button (Mouse eveny only)
function handleNegative() {
  if (display.textContent == currentEquation.num1) {
      currentEquation.num1 = currentEquation.num1 * -1;
      updateDisplay(currentEquation.num1, '');
  }

  if (display.textContent == currentEquation.num2){
    currentEquation.num2 = currentEquation.num2 * -1;
    updateDisplay(currentEquation.num2, '');
  }

  if (display.textContent == previousEquation.solution){
    previousEquation.solution = previousEquation.solution * -1;
    updateDisplay(previousEquation.solution, '');
   } 
}

//Main operation function. Receives equation data, solves
//using appropiate math function, and prepares for further input.
function operate(equation) {
  //If user attempts to solve without inputting two numbers.
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

  //Limit display to decimal length of 5
  if (typeof(solution) === 'number') {
    solution = Number(solution.toFixed(5));
  }
  currentEquation.solution = solution;
  previousEquation = Object.assign(Object.create(currentEquation), currentEquation);
  updateDisplay('', solution);
  currentEquation.reset();

  currentEquation.isEditable = false;
}


//Event listener on calculator div for mouse clicks.
calculator.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    handleMouseInput(e.target);
    }
});

//Event listener for key presses.
document.addEventListener('keydown', (e) => {
  handleKeyboardInput(e);
})