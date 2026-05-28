import { createEl, createItem } from "./elementHelpers.js";
import { startChildren } from "../data/fileSystem.js";


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
    win.style.cssText = `
      left: ${rect.left}px;
      top: ${rect.top}px;
      transform: none;
    `;

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

  (() => {
    let parent = null;
    let hoverMenu = null;

    startMenu.addEventListener('mouseover', (e) => {
      const folderItem = e.target.closest('.menu-item[data-type="folder"]');

      if (folderItem && !folderItem.contains(e.relatedTarget)) {
        parent = folderItem.parentElement;
        
        if (!parent.querySelector('.cascading-menu')) {
          const hoverMenuEl = createEl('div', { classList: 'cascading-menu' });
          parent.appendChild(hoverMenuEl);
        }

        hoverMenu = parent.querySelector('.cascading-menu');
        if (folderItem && hoverMenu) {
          const { id } = folderItem.dataset;

          populateHoverMenu(hoverMenu, id.toString());
          hoverMenu.style.top = `${folderItem.getBoundingClientRect().top - parent.getBoundingClientRect().top}px`;
          hoverMenu.style.left = `${parent.getBoundingClientRect().width - 5}px`;
        }
      }

      if (!folderItem && hoverMenu) {
        if (!hoverMenu.contains(e.target) && !hoverMenu.contains(e.relatedTarget)) {
          hoverMenu.remove();
          hoverMenu = null;
        }
      }
    });

    startMenu.addEventListener('mouseleave', () => {
      const rootSubmenu = startMenu.querySelector('.cascading-menu');
      if (rootSubmenu) rootSubmenu.remove();
    });
  })()
  

  function populateHoverMenu(hoverMenu, id) {
    const selectedEntry = findItemById(startChildren, id);
    const folderContents = selectedEntry.children;

    hoverMenu.innerHTML = '';
    folderContents.forEach(content => {
      hoverMenu.append(createItem(content));
    });
  }
}

function findItemById(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }

  return null;
}
