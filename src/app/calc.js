export function initAppEVT() {
  initCalcApp();
}

function initCalcApp() {
  const calculatorApp = document.querySelector('.cal-window');
  const inputBox = calculatorApp.querySelector('input');
  inputBox.value = 0;

  let a;
  let b;
  let operation;
  let sum;

  calculatorApp.addEventListener('click', (e) => {
    const numpadBtn = e.target.closest('.numpad button');
    const operationBtn = e.target.closest('.operations button');
    const actionBtn = e.target.closest('.action-btns button');
    const clearBtn = e.target.closest('.actions button');

    if (numpadBtn) {
      if (isNaN(numpadBtn.textContent) && numpadBtn.textContent !== '.') return;
      if ((inputBox.value === a || inputBox.value === '0')) inputBox.value = '';

      inputBox.value += numpadBtn.textContent;
    };

    if (operationBtn) {
      a = inputBox.value;
      operation = operationBtn.textContent;
    }

    if (actionBtn) {
      b = inputBox.value;

      if (actionBtn.textContent === '=') {
        inputBox.value = compute(a, b, operation);
      }
    }

    if (clearBtn) {
      if (clearBtn.textContent === 'C') {
        a = b = operation = sum = null;
        inputBox.value = 0;
      }

      if (clearBtn.textContent === 'CE') {
        inputBox.value = 0;
      }

      if (clearBtn.textContent === 'Back') {
        if (inputBox.value === '0') return;

        inputBox.value = inputBox.value.slice(0,-1);
      }
    }
  });

  function compute(a, b, operation) {
    a = Number(a);
    b = Number(b);

    switch (operation) {
      case '/': sum = a / b; break;
      case '*': sum = a * b; break;
      case '-': sum = a - b; break;
      case '+': sum = a + b; break;
      default: sum = 'Error'; break;
    }

    return sum;
  }
}