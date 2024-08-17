import { Request } from "express";
import { check, validationResult } from "express-validator";

export class ExpressValidatorAdapter {

    static validateString = async(field: string,  req: Request) => {
        await check(field).notEmpty().withMessage(`El campo ${field} no puede estar vacio`).run(req)
    } 

    static validateNumber = async(field: string, req: Request) => {
        await check(field)
            .isNumeric().withMessage(`El campo ${field} debe ser un numero`)
            .notEmpty().withMessage(`El campo ${field} no puede estar vacio`)
            .custom((value) => value > 0).withMessage(`El campo ${field} debe ser mayor a 0`)
            .run(req)
    }

    static Result = (req: Request) => {
        return validationResult(req) 
    }
}