import { programs } from "./programs.js";
import { createStartEntry } from "../utils/elementHelpers.js";

export const startEntries = [
  {
    id: '001',
    title: "Programs",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    id: '002',
    title: "Favorites",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    id: '003',
    title: "Documents",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    id: '004',
    title: "Settings",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    id: '005',
    title: "Find",
    type: "folder",
    icon: "styles/icons/folders/start_programs.png",
    menuList: programs,
  },
  {
    id: '006',
    title: "Help",
    type: "program",
    icon: "styles/icons/folders/start_programs.png",
    launchLink: null,
  },
  {
    id: '007',
    title: "Run",
    type: "program",
    icon: "styles/icons/folders/start_programs.png",
    launchLink: null,
  },
];

const programList = document.querySelector(".main-list");

export function populateStartList() {
  startEntries.forEach((entry) => programList.append(createStartEntry(entry)));
}
