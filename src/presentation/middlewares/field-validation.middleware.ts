import { NextFunction, Request, Response } from "express";
import { ExpressValidatorAdapter } from "../../config/express-validator-adapter";
import { CustomError } from "../../domain/errors/custom.error";

export class FieldValidationMiddleware {

    static async ValidateErrors(req: Request, res: Response, next: NextFunction) {

        let errors = ExpressValidatorAdapter.Result(req)
        let errorsArray = errors.array()

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errorsArray })
        }

        next()
    }
}