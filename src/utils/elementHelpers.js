export function createStartEntry(entryData) {
  let imgPathRoot = 'styles/icons/folders/start';

  const icon = createEl("img", {
    classList: "list-icon",
    imgPath: `${imgPathRoot}/start_${(entryData.title).toLowerCase()}.png`,
  });

  const title = createEl("p", { textContent: entryData.title });
  const chevron = createEl("img", {
    classList: "chevron pixel",
    imgPath: "styles/icons/system/start/arrow-asset.png",
  });

  const startEntry = createEl("div", {
    classList: "start-entry",
    dataset: { type: entryData.type, id: entryData.id },
    childNodes: [icon, title, chevron],
  });

  return startEntry;
}

export function createItem(data) {
  const imgPath = `styles/icons/${data.type === 'folder' ? 'folders' : 'apps'}`;
  const { title, type, id } = data;

  const icon = createEl('img', {
    classList: 'list-icon',
    imgPath: `${imgPath}/${(title).toLowerCase()}.png`
  });

  const folderName = createEl('p', { textContent: title });
  const chevron = createEl('img', { 
    classList: 'chevron pixel', 
    imgPath: 'styles/icons/system/start/arrow-asset.png', 
  });

  const item = createEl('div', {
    classList: 'menu-item',
    dataset: { type, id },
    childNodes: [ icon, folderName, chevron ],
  });

  return item;
}

export function createEl(
  tag,
  { classList, textContent, imgPath, dataset = {}, childNodes = [] } = {},
) {
  const element = document.createElement(tag);
  if (classList) element.className = classList;
  if (textContent) element.textContent = textContent;
  if (tag === "img") element.src = imgPath;

  for (const key in dataset) {
    element.dataset[key] = dataset[key];
  }

  for (const el of childNodes) {
    element.appendChild(el);
  }

  return element;
}

function createWindow() {
  
}