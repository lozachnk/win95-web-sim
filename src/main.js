import { attachGlobalEVT }  from "./utils/eventListeners.js";
import { populateStartList } from "./data/system.js";
import { initAppEVT } from "./app/calc.js";

attachGlobalEVT();
populateStartList();
initAppEVT();