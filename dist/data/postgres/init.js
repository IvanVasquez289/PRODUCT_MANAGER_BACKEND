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
exports.DatabaseConnection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const colors_adapter_1 = require("../../config/colors-adapter");
class DatabaseConnection {
    constructor(postgresUri) {
        this.postgresUri = postgresUri;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.db = new sequelize_typescript_1.Sequelize(this.postgresUri, {
                    models: [__dirname + '/models/**/*'],
                    logging: false
                });
                yield this.db.authenticate();
                this.db.sync();
                colors_adapter_1.ColorsAdapter.cyan('Successfully connected to database');
            }
            catch (error) {
                console.log(error);
                colors_adapter_1.ColorsAdapter.red('Failed to connect to database');
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.close();
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
