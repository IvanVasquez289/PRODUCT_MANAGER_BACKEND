"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../data/postgres");
const colors_adapter_1 = require("./colors-adapter");
const envs_1 = require("./envs");
const clearDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = new postgres_1.DatabaseConnection(envs_1.envs.POSTGRES_URI);
        // await dbConnection.clear()
    }
    catch (error) {
        colors_adapter_1.ColorsAdapter.red(error);
        process.exit(1);
    }
});
if (process.argv[2] === '--clear') {
    clearDB();
    colors_adapter_1.ColorsAdapter.rainbow('Clearing database');
}
