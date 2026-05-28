import { attachGlobalEVT }  from "./utils/eventListeners.js";
// import { populateStartList } from "./data/system.js";
import { initAppEVT } from "./app/calc.js";
import { popStart } from "./data/fileSystem.js";

attachGlobalEVT();
initAppEVT();
popStart();