export function attachGlobalEVT() {
  attachWindowEVT();
  setTaskbarAndStartEVT();
}

function attachWindowEVT() {
  let draggedWindow = null;
  let offset = { x: 0, y: 0 };

  function onMouseDown(e) {
    const titleBar = e.target.closest('.title-bar');
    if (!titleBar) return;

    const win = titleBar.closest('.window');
    if (!win) return;

    const rect = win.getBoundingClientRect();
    win.style.left = `${rect.left}px`;
    win.style.top = `${rect.top}px`;
    win.style.transform = `none`;

    offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    draggedWindow = win;
    document.body.style.userSelect = 'none';
  }
  
  function onMouseMove(e) {
    if (!draggedWindow) return;

    draggedWindow.style.top = `${e.clientY - offset.y}px`;
    draggedWindow.style.left = `${e.clientX - offset.x}px`;
  }

  function onMouseUp() {
    if (!draggedWindow) return;
    draggedWindow = null;

    document.body.style.userSelect = '';
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function setTaskbarAndStartEVT() {
  const taskbar = document.querySelector('.taskbar');
  const startMenu = document.querySelector('.start-menu');
  const startBtn = document.querySelector('.start-btn');

  let startIsOpen = false;

  if (taskbar) {
    taskbar.addEventListener('click', (e) => {
      const startBtn = e.target.closest('.start-btn');

      if (startBtn) {
        startIsOpen = !startIsOpen;
        startMenu.classList.toggle('opened', startIsOpen);
        startBtn.classList.toggle('active', startIsOpen);
      }
    })
  }

  // Make this event listener work with other menu elements
  document.addEventListener('mousedown', (e) => {
    const startMenuArea = e.target.closest('.start-menu');
    const startBtnArea = e.target.closest('.start-btn');

    if (!(startMenuArea || startBtnArea)) {
      startIsOpen = false;
      startMenu.classList.remove('opened');
      startBtn.classList.remove('active');
    }    
  });
}

