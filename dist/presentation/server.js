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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const colors_adapter_1 = require("../config/colors-adapter");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const envs_1 = require("../config/envs");
class Server {
    constructor(port, routes) {
        this.port = port;
        this.routes = routes;
        this.app = (0, express_1.default)();
        this.corsOptions = {
            origin: function (origin, callback) {
                if (origin = envs_1.envs.FRONTENT_URL) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        };
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)(this.corsOptions));
            //Middlewares
            this.app.use(express_1.default.json());
            this.app.use((0, morgan_1.default)('dev'));
            //Routes
            this.app.use(this.routes);
            this.serverListener = this.app.listen(this.port, () => {
                // console.log(`Server running on port ${this.port}`)
                colors_adapter_1.ColorsAdapter.magenta(`Server running on port ${this.port}`);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.serverListener) === null || _a === void 0 ? void 0 : _a.close();
        });
    }
}
exports.Server = Server;
