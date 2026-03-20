export function attachGlobalEVT() {
  attachWindowEVT();
}

function attachWindowEVT() {
  let draggedWindow = null;
  let offset = { x: 0, y: 0 };

  document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('title-bar')) {
      const win = e.target.closest('.window');
      const rect = win.getBoundingClientRect();

      win.style.left = `${rect.left}px`;
      win.style.top = `${rect.top}px`;
      win.style.transform = `none`;

      offset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      draggedWindow = win;
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!draggedWindow) return;

    draggedWindow.style.top = `${e.clientY - offset.y}px`;
    draggedWindow.style.left = `${e.clientX - offset.x}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!draggedWindow) return;
    draggedWindow = null;
  })
}

