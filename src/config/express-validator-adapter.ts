import { Request } from "express";
import { body, check, param, validationResult } from "express-validator";

export class ExpressValidatorAdapter {

    static validateString = (field: string) => {
        return body(field).notEmpty().withMessage(`El campo ${field} no puede estar vacio`)
    } 

    static validateNumber = (field: string) => {
        return body(field)
            .isNumeric().withMessage(`El campo ${field} debe ser un numero`)
            .notEmpty().withMessage(`El campo ${field} no puede estar vacio`)
            .custom((value) => value > 0).withMessage(`El campo ${field} debe ser mayor a 0`)
    }
    static validateParam = () => {
        return param('id').isInt().withMessage('ID no valido')
    }

    static Result = (req: Request) => {
        return validationResult(req) 
    }
}