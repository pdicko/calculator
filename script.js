

const sumOf = (num1, num2) => num1 + num2;
const differenceOf = (num1, num2) => num1 - num2;
const productOf = (num1, num2) => num1 * num2;
const quotientOf = (num1, num2) => num1 / num2;

let num1;
let num2;
let operator;

function operate(num1, num2, operator) {

  return operator(num1, num2);
}