const placeholderText = "0";
const allowedValues = /^[0-9+\-*/^().]+$/;
const screen = document.querySelector(".screen");
screen.value = "";

const classToFunction = {
  clear: clear,
  backSpace: removeLast,
  // remainder: modulo,
  // divide: division,
  // multiply: multiplication,
  // subtract: subtraction,
  // add: addition,
  calculate: operate,
};

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

const value = document.querySelectorAll(".number");
value.forEach((num) => {
  num.addEventListener("click", (e) => {
    const className = num.classList[1];
    if (className in classToFunction) {
      classToFunction[className]();
    } else {
      screen.value += num.value;
    }
  });
});

screen.addEventListener("input", validateInput);
screen.focus();

function validateInput(e) {
  const input = e.target.value;
  if (!allowedValues.test(input)) {
    e.target.value = input.replace(/[^0-9+\-*/^().%]/g, "");
  }
}

function clear() {
  screen.value = "";
}

function removeLast() {
  let currentText = screen.value;
  if (currentText !== "") {
    screen.value = currentText.slice(0, -1);
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const code = e.code;
  const button = document.querySelector(
    `button[data-key="${key}"][data-code="${code}"]`
  );
  if (button) {
    button.classList.add("highlight");
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.key;
  const code = e.code;
  const button = document.querySelector(
    `button[data-key="${key}"][data-code="${code}"]`
  );
  if (button) {
    button.classList.remove("highlight");
  }
});

document.addEventListener("click", () => {
  screen.focus();
});

screen.focus();
