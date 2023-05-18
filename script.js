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
