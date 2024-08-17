import { Request } from "express";
import Product from "../../data/postgres/models/product.model";
import { ExpressValidatorAdapter } from "../../config/express-validator-adapter";
import { CustomError } from "../../domain/errors/custom.error";
import { Result, ValidationError } from "express-validator";

export class ProductService {
    constructor() {}

    async createProduct(req: Request) {
        
        //Validaciones
        await ExpressValidatorAdapter.validateString('name', req)
        await ExpressValidatorAdapter.validateNumber('price', req)
        let errors = ExpressValidatorAdapter.Result(req)
        let errorsArray = errors.array()

        if(!errors.isEmpty()){
            throw CustomError.BadRequestExpressValidator(errorsArray)
        }


        const product = await Product.create(req.body)
    

        return {
            data: product
        }
    }
}