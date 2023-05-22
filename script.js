//  rewriting js
"use strict";
const allowedValues = /^[0-9+\-*/^().%]+$/;
const screen = document.querySelector(".screen");
const numberBtn = document.querySelectorAll(".number");
screen.value = "";
let currentOperator = null;
const classToFunction = {
  clear: clear,
  backSpace: removeLast,
  calculate: operate,
};

function checkExpression(input) {
  return input.replace(/[^0-9+\-*/^().%]/g, "");
}

// operator handling
function handleOperator(e) {
  currentOperator = e.target.value;
  screen.value += currentOperator;
  console.log(currentOperator);
}

// inputHandler
function validateInput(e) {
  const input = e.target.value;
  if (!allowedValues.test(input)) {
    e.target.value = checkExpression(input);
  }
}

//backSpace handler
function removeLast(string) {
  let currentText = screen.value;
  if (currentText !== "") {
    screen.value = currentText.slice(0, -1);
  }
}
// for screen input by keyboard
screen.addEventListener("input", validateInput);

//basic math functions
function add(...args) {
  return args.reduce((a, b) => {
    return a + b;
  });
}

function subtract(...args) {
  return args.reduce((a, b) => {
    return a - b;
  });
}

function multiply(...args) {
  return args.reduce((a, b) => {
    return a * b;
  });
}

function divide(...args) {
  if (args[0] === 0) {
    return 0;
  }
  return args.reduce((a, b) => {
    if (b === 0) {
      return "Kono Baka!!!";
    }
    return a / b;
  });
}

// for calculation
function operate(left, op, right) {
  left = +left;
  right = +right;
  switch (op) {
    case "+":
      return add(left, right);
    case "-":
      return subtract(left, right);
    case "*":
      return multiply(left, right);
    case "/":
      return divide(left, right);
    default:
      return;
  }
}

numberBtn.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (
      !num.classList.contains("function") &&
      !num.classList.contains("operator")
    ) {
      let input = e.target.value;
      screen.value += checkExpression(input);
    } else if (num.classList.contains("operator")) {
      const newOperator = e.target.value;
      if (currentOperator !== null) {
        const expression = screen.value.split(currentOperator);
        const left = expression[0].trim();
        const right = expression[1].trim() || expression[0].trim();
        const result = operate(left, currentOperator, right);
        screen.value = result;
      }
      currentOperator = newOperator;
      screen.value += currentOperator;
    } else if (num.classList.contains("calculate")) {
      const expression = screen.value.split(currentOperator);
      if (expression.length === 2) {
        const left = expression[0].trim();
        const right = expression[1].trim();
        const result = operate(left, currentOperator, right);
        screen.value = result;
      }
      currentOperator = null;
    } else {
      const className = num.classList[1];
      if (className in classToFunction) {
        classToFunction[className]();
      }
    }
  });
});

// clear function
function clear() {
  screen.value = "";
  currentOperator = null;
}

//keep the screen in focus
document.addEventListener("click", () => {
  screen.focus();
});
screen.focus();
