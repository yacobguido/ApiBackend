"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readParse = void 0;
const fs = require("fs");
const path_1 = require("path");
function readParse() {
    const Rooms = (0, path_1.join)(__dirname, '../../data/Rooms.json');
    const fileContent = fs.readFileSync(Rooms, 'utf-8');
    return JSON.parse(fileContent);
}
exports.readParse = readParse;
//# sourceMappingURL=utils.js.map