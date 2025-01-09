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
exports.FieldValidationMiddleware = void 0;
const express_validator_adapter_1 = require("../../config/express-validator-adapter");
class FieldValidationMiddleware {
    static ValidateErrors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = express_validator_adapter_1.ExpressValidatorAdapter.Result(req);
            let errorsArray = errors.array();
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errorsArray });
            }
            next();
        });
    }
}
exports.FieldValidationMiddleware = FieldValidationMiddleware;
