"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorsAdapter = void 0;
const colors_1 = __importDefault(require("colors"));
class ColorsAdapter {
}
exports.ColorsAdapter = ColorsAdapter;
ColorsAdapter.magenta = (message) => {
    console.log(colors_1.default.magenta(message));
};
ColorsAdapter.red = (message) => {
    console.log(colors_1.default.red(message));
};
ColorsAdapter.rainbow = (message) => {
    console.log(colors_1.default.rainbow(message));
};
ColorsAdapter.cyan = (message) => {
    console.log(colors_1.default.cyan(message));
};
ColorsAdapter.green = (message) => {
    console.log(colors_1.default.green(message));
};
