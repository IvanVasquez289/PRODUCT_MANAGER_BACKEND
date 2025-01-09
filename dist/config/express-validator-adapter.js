"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressValidatorAdapter = void 0;
const express_validator_1 = require("express-validator");
class ExpressValidatorAdapter {
}
exports.ExpressValidatorAdapter = ExpressValidatorAdapter;
ExpressValidatorAdapter.validateString = (field) => {
    return (0, express_validator_1.body)(field).notEmpty().withMessage(`El campo ${field} no puede estar vacio`);
};
ExpressValidatorAdapter.validateNumber = (field) => {
    return (0, express_validator_1.body)(field)
        .isNumeric().withMessage(`El campo ${field} debe ser un numero`)
        .notEmpty().withMessage(`El campo ${field} no puede estar vacio`)
        .custom((value) => value > 0).withMessage(`El campo ${field} debe ser mayor a 0`);
};
ExpressValidatorAdapter.validateBoolean = (field) => {
    return (0, express_validator_1.body)(field)
        .isBoolean().withMessage(`El campo ${field} debe ser un boolean`);
};
ExpressValidatorAdapter.validateParam = () => {
    return (0, express_validator_1.param)('id').isInt().withMessage('ID no valido');
};
ExpressValidatorAdapter.Result = (req) => {
    return (0, express_validator_1.validationResult)(req);
};
