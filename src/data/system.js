import { programs } from "./programs.js";

const startEntries = [
  {
    title: "Programs",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Favorites",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Documents",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Settings",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Find",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Help",
    type: "app",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    title: "Run",
    type: "app",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
];

const programList = document.querySelector(".main-list");

export function populateStartList() {
  startEntries.forEach((entry) => programList.append(createStartEntry(entry)));
}

function createStartEntry(entryData) {
  const icon = createEl("img", {
    classList: "list-icon",
    imgPath: entryData.icon,
  });
  const title = createEl("p", { textContent: entryData.title });
  const chevron = createEl("img", {
    classList: "chevron pixel",
    imgPath: "styles/icons/system/start/arrow-asset.png",
  });

  const startEntry = createEl("div", {
    classList: "start-entry",
    dataset: { type: entryData.type },
    childNodes: [icon, title, chevron],
  });

  return startEntry;
}

function createEl(
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
