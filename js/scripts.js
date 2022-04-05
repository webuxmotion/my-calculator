const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operations = ['+', '-', '/', '*'];
const commands = ['=', 'AC', 'DEL', '.'];
const clickTypes = {
  'NUM': 'NUMBER',
  'OP': 'OPERATION',
  'COM': 'COMMAND'
};
const buttonsEl = document.querySelector('#buttons');
const leftOperandEl = document.querySelector('#left-operand');
const operationEl = document.querySelector('#operation');
const currentEl = document.querySelector('#current');

buttonsEl.addEventListener('click', (e) => {
  let value = e.target.dataset.value;

  if (value !== undefined) {
    let clickType = getClickType(value);

    if (clickType == clickTypes.COM) {
      switch (value) {
        case 'DEL': 
          {
            // const currentValue = currentEl.textContent;
            // const newValue = currentValue + value;

            // updateElementText(currentEl, newValue);
            break;
          }
        case '.': 
          {
            const currentValue = currentEl.textContent;
            const newValue = currentValue + value;

            updateElementText(currentEl, newValue);
            break;
          }
        case 'AC':
          {
            updateElementText(leftOperandEl, '');
            updateElementText(operationEl, '');
            updateElementText(currentEl, '');
            break;
          }
        case '=':
          {
            const leftOperandValue = leftOperandEl.textContent;
            const operationValue = operationEl.textContent;
            const currentValue = currentEl.textContent;

            if (leftOperandValue && currentValue && operationValue) {
              let res = null;
              const leftValue = parseFloat(leftOperandValue);
              const rightValue = parseFloat(currentValue);
              switch (operationValue) {
                case '+':
                  res = leftValue + rightValue;
                  break;
                case '-':
                  res = leftValue - rightValue;
                  break;
                case '*':
                  res = leftValue * rightValue;
                  break;
                case '/':
                  res = leftValue / rightValue;
                  break;
              }
              updateElementText(leftOperandEl, '');
              updateElementText(operationEl, '');
              updateElementText(currentEl, res);
            }
            break;
          }

        default:
          console.log(`Sorry, we are out of ${clickType}.`);
      }
    } else if (clickType == clickTypes.NUM) {
      const currentValue = currentEl.textContent;
      const newValue = currentValue + value;

      updateElementText(currentEl, newValue);
    } else if (clickType == clickTypes.OP) {
      const currentValue = currentEl.textContent;

      if (currentValue) {
        updateElementText(leftOperandEl, currentValue);
        updateElementText(currentEl, '');
      }
      updateElementText(operationEl, value);
    }
  }
});

function updateElementText(element, text) {
  element.innerHTML = text;
}

function hasInArray(arrayValue, value) {
  return arrayValue.includes(value);
}

function getClickType(value) {
  if (hasInArray(numbers, parseInt(value))) {
    return clickTypes.NUM;
  } else if (hasInArray(operations, value)) {
    return clickTypes.OP;
  } else if ((hasInArray(commands, value))) {
    return clickTypes.COM;
  } else {
    return null;
  }
}