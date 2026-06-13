import { createEl, createItem, createWindow } from "./elementHelpers.js";
import { startChildren } from "../data/fileSystem.js";
import { programRegistry, initCalcApp } from "../data/appData.js";

export function attachGlobalEVT() {
  attachWindowEVT();
  setTaskbarAndStartEVT();
}

// combine setting of dragged window and active window in one function

const taskbar = document.querySelector(".taskbar");
const startMenu = document.querySelector(".start-menu");
const startBtn = document.querySelector(".start-btn");

let window_zIndex = 0;

// Window dragging
function attachWindowEVT() {
  let draggedWindow = null;
  let offset = { x: 0, y: 0 };

  function onMouseDown(e) {
    const titleBar = e.target.closest(".title-bar");
    if (!titleBar) return;

    const win = titleBar.closest(".window");
    if (!win) return;

    const rect = win.getBoundingClientRect();
    win.style.cssText = `
      left: ${rect.left}px;
      top: ${rect.top}px;
      transform: none;
      z-index: ${window_zIndex = window_zIndex + 2};
    `;
    startMenu.style.zIndex = `${window_zIndex + 2}`;
    taskbar.style.zIndex = `${window_zIndex + 1}`;

    const titleBars = document.querySelectorAll(".title-bar");
    titleBars.forEach((bar) => {
      bar.style.cssText = `
        background: var(--title-bar-inactive);
      `;
    });
    titleBar.style.cssText = `
      background: var(--title-bar-active);
    `;

    offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    draggedWindow = win;
    document.body.style.userSelect = "none";
    console.log(window_zIndex);
  }

  function onMouseMove(e) {
    if (!draggedWindow) return;

    draggedWindow.style.top = `${e.clientY - offset.y}px`;
    draggedWindow.style.left = `${e.clientX - offset.x}px`;
  }

  function onMouseUp() {
    if (!draggedWindow) return;
    draggedWindow = null;

    document.body.style.userSelect = "";
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

let startIsOpen = false;

function setTaskbarAndStartEVT() {
  taskbar.addEventListener("click", (e) => {
    const startBtn = e.target.closest(".start-btn");

    if (startBtn) {
      startIsOpen = !startIsOpen;
      startMenu.classList.toggle("opened", startIsOpen);
      startBtn.classList.toggle("active", startIsOpen);
    }
  });

  document.addEventListener("mousedown", closeStartMenu);

  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("#closeWin");

    if (closeBtn) {
      const win = closeBtn.closest(".window.panel");
      win.remove();
    }
  });

  (() => {
    let parent = null;
    let hoverMenu = null;

    startMenu.addEventListener("mouseover", (e) => {
      const folderItem = e.target.closest('.menu-item[data-type="folder"]');

      if (folderItem && !folderItem.contains(e.relatedTarget)) {
        parent = folderItem.parentElement;

        if (!parent.querySelector(".cascading-menu")) {
          const hoverMenuEl = createEl("div", {
            classList: "cascading-menu panel",
          });
          parent.appendChild(hoverMenuEl);
        }

        hoverMenu = parent.querySelector(".cascading-menu");
        if (folderItem && hoverMenu) {
          const { id } = folderItem.dataset;

          populateHoverMenu(hoverMenu, id);
          hoverMenu.style.cssText = ``;
          hoverMenu.style.top = `${folderItem.getBoundingClientRect().top - parent.getBoundingClientRect().top}px`;
          hoverMenu.style.left = `${parent.getBoundingClientRect().width - 5}px`;
        }
      }

      if (!folderItem && hoverMenu) {
        if (
          !hoverMenu.contains(e.target) &&
          !hoverMenu.contains(e.relatedTarget)
        ) {
          hoverMenu.remove();
          hoverMenu = null;
        }
      }
    });

    startMenu.addEventListener("mouseleave", () => {
      const rootSubmenu = startMenu.querySelector(".cascading-menu");
      if (rootSubmenu) rootSubmenu.remove();
    });
  })();

  startMenu.addEventListener("click", (e) => {
    const item = e.target.closest('.menu-item[data-type="file"]');

    if (item) {
      const { id } = item.dataset;
      const regEntry = programRegistry.find((program) => program.id === id);
      const { contentClass, contentHTML } = regEntry.data;

      const win = createWindow(regEntry);
      const winContent = createEl("div", {
        classList: `window-content ${contentClass}`,
        innerHTML: contentHTML
      });

      win.appendChild(winContent);
      initCalcApp(win);
      win.style.zIndex = window_zIndex;
      document.body.appendChild(win);

      closeStartMenu(e);
    }
  });
}

function populateHoverMenu(hoverMenu, id) {
  const selectedEntry = findItemById(startChildren, id);
  const folderContents = selectedEntry.children;

  hoverMenu.innerHTML = "";
  folderContents.forEach((content) => {
    hoverMenu.append(createItem(content));
  });
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

function closeStartMenu(e) {
  const startMenuArea = e.target.closest(".start-menu");
  const startBtnArea = e.target.closest(".start-btn");

  if (!(startMenuArea || startBtnArea)) {
    startIsOpen = false;
    startMenu.classList.remove("opened");
    startBtn.classList.remove("active");
  }
}
