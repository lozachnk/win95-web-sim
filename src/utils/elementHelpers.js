export function createItem(data) {
  const imgPath = `assets/icons/${data.type === "folder" ? "folders" : "apps"}`;
  const { title, type, id, style } = data;
  let icon = createEl("img", {
    classList: "list-icon",
    imgPath:
      style === "category" || type === "file"
        ? `${imgPath}/${title.toLowerCase()}.png`
        : `${imgPath}/generic-folder_16x16.png`,
  });

  const folderName = createEl("p", { textContent: title });
  const chevron = createEl("img", {
    classList: "chevron pixel",
    imgPath: "assets/icons/system/start/arrow-asset.png",
  });

  const item = createEl("div", {
    classList: "menu-item",
    dataset: { type, id },
    childNodes: [icon, folderName, chevron],
  });

  return item;
}

export function createEl(
  tag,
  {
    classList,
    textContent,
    innerHTML,
    cssText,
    imgPath,
    dataset = {},
    childNodes = [],
  } = {},
) {
  const element = document.createElement(tag);
  if (classList) element.className = classList;
  if (textContent) element.textContent = textContent;
  if (innerHTML) element.innerHTML = innerHTML;
  if (cssText) element.style.cssText = cssText;
  if (tag === "img") element.src = imgPath;

  for (const key in dataset) {
    element.dataset[key] = dataset[key];
  }

  for (const el of childNodes) {
    element.appendChild(el);
  }

  return element;
}

export function createWindow(program) {
  const { contentClass } = program.data;

  const icon = `assets/icons/apps/${program.title.toLowerCase()}.png`;
  const titleBar = createEl("div", {
    classList: "title-bar",
    innerHTML: `
      <div class="title">
        <img src="${icon}" class="app-icon" alt="" />
        <p class="app-title">${program.title}</p>
      </div>

      <div class="window-buttons">
        <button class="primary" id="minimize">
          <img src="assets/icons/system/win-frame/minimize.png" alt="" />
        </button>
        <button class="primary" id="maximize">
          <img src="assets/icons/system/win-frame/maximize.png" alt="" />
        </button>
        <button class="primary" id="closeWin">
          <img src="assets/icons/system/win-frame/close.png" alt="" />
        </button>
      </div>
    `,
  });

  const ribbon = createEl('div', {
    classList: 'ribbon',
    innerHTML: `
      <div><span>E</span>dit</div>
      <div><span>V</span>iew</div>
      <div><span>H</span>elp</div>
    `
  });

  const win = createEl("div", {
    classList: `window panel ${contentClass}-window`,
    childNodes: [ titleBar, ribbon ]
  });

  return win;
}
