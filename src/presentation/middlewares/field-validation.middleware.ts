import { NextFunction, Request, Response } from "express";
import { ExpressValidatorAdapter } from "../../config/express-validator-adapter";
import { CustomError } from "../../domain/errors/custom.error";

export class FieldValidationMiddleware {

    static async ValidateField(req: Request, res: Response, next: NextFunction) {

        if(Object.keys(req.body).includes('name')) await ExpressValidatorAdapter.validateString('name', req)
        if(Object.keys(req.body).includes('price')) await ExpressValidatorAdapter.validateNumber('price', req)

        let errors = ExpressValidatorAdapter.Result(req)
        let errorsArray = errors.array()

        if(!errors.isEmpty()){
            // throw CustomError.BadRequestExpressValidator(errorsArray)
            return res.status(400).json({ errors: errorsArray })
        }
        // if(Object.keys(req.body).includes('name')) console.log('hay un name en la peticion')

        next()
    }
}