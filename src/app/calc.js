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

  // TODO: Keydown event listener

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

function returnCalcUI() {
  return `          
  <input type="text" name="" id="" class="winput" />
  <div class="top-row">
    <div class="memory-box"></div>
    <div class="actions">
      <button class="primary">Back</button>
      <button class="primary">CE</button>
      <button class="primary">C</button>
    </div>
  </div>

  <div class="bottom-row">
    <div class="memory-btns">
      <button class="primary opr">MC</button>
      <button class="primary opr">MR</button>
      <button class="primary opr">MS</button>
      <button class="primary opr">M+</button>
    </div>
    <div class="numpad-btns">
      <div class="numpad">
        <button class="primary num">7</button>
        <button class="primary num">8</button>
        <button class="primary num">9</button>
        <button class="primary num">4</button>
        <button class="primary num">5</button>
        <button class="primary num">6</button>
        <button class="primary num">1</button>
        <button class="primary num">2</button>
        <button class="primary num">3</button>
        <button class="primary num">0</button>
        <button class="primary act">+/-</button>
        <button class="primary num">.</button>
      </div>
      <div class="operations">
        <button class="primary opr">/</button>
        <button class="primary opr">*</button>
        <button class="primary opr">-</button>
        <button class="primary opr">+</button>                
      </div>
      <div class="action-btns">
        <button class="primary act">sqrt</button>
        <button class="primary opr">%</button>
        <button class="primary act">1/x</button>
        <button class="primary opr">=</button>
      </div>
    </div>
  </div>`;
}