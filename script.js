const placeholderText = "0";
const allowedValues = /^[0-9+\-*/^().]+$/;
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
  return args.reduce((a, b) => {
    if (b == 0) {
      console.log("Kono Baka!!!");
      return;
    }
    return a / b;
  });
}

function operate(left, operator, right) {
  left = +left;
  right = +right;
  switch (operator) {
    case "+":
      return add(left, right);
      break;
    case "-":
      return subtract(left, right);
      break;
    case "*":
      return multiply(left, right);
      break;
    case "/":
      return divide(left, right);
      break;
    default:
      return;
  }
}

const value = document.querySelectorAll(".number");
value.forEach((num) => {
  num.addEventListener("click", (e) => {
    console.log(e.target.value);
  });
});

const screen = document.querySelector(".screen");
screen.addEventListener("input", validateInput);
screen.focus();

function validateInput(e) {
  const input = e.target.value;
  if (!allowedValues.test(input)) {
    e.target.value = input.replace(/[^0-9+\-*/^().]/g, "");
  }
}

document.addEventListener("keydown", (e) => {
  let name = e.key;
  let code = e.code;
  console.log(`pressed ${name} code: ${code}`);
});

// screen is always in focus
document.addEventListener("click", () => {
  screen.focus();
});
screen.focus();
