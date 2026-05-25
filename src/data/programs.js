
export const accessories = [
  {
    id: '201',
    icon: 'styles/icons/apps/canvas.png',
    title: 'Calculator',
    type: 'program',
    data: {
      windowClass: 'cal-window',
      contentClass: 'cal'
    },
  },
];

const games = [
  {
    id: '202',
    icon: 'styles/icons/apps/canvas.png',
    title: 'Minesweeper',
    type: 'program',
    data: {
      windowClass: 'cal-window',
      contentClass: 'cal'
    },
  },
];

export const programs = [
  {
    id: '101',
    icon: 'styles/icons/folders/generic-folder.png',
    title: 'Accessories',
    type: 'folder',
    menuList: accessories,
  },
  {
    id: '102',
    icon: 'styles/icons/folders/generic-folder.png',
    title: 'Games',
    type: 'folder',
    menuList: games
  }
];



function createCalculatorUI() {
  const containerEl = document.createElement('div');

  containerEl.innerHTML = `
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
        <div class="numpad">
          <button class="primary num">7</button>
          <button class="primary num">8</button>
          <button class="primary num">9</button>
          <button class="primary opr">/</button>
          <button class="primary num">sqrt</button>
          <button class="primary num">4</button>
          <button class="primary num">5</button>
          <button class="primary num">6</button>
          <button class="primary opr">*</button>
          <button class="primary num">%</button>
          <button class="primary num">1</button>
          <button class="primary num">2</button>
          <button class="primary num">3</button>
          <button class="primary opr">-</button>
          <button class="primary num">1/x</button>
          <button class="primary num">0</button>
          <button class="primary num">+/-</button>
          <button class="primary num">.</button>
          <button class="primary opr">+</button>
          <button class="primary opr">=</button>
        </div>
      </div>
  `;

  return containerEl;
}

