export function attachGlobalEVT() {
  attachWindowEVT();
}

function attachWindowEVT() {
  let draggedWindow = null;
  let offset = { x: 0, y: 0 };

  function onMouseDown(e) {
    const titleBar = e.target.closest('.title-bar');
    if (!titleBar) return;

    const win = titleBar.closest('.window');
    if (!window) return;

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

