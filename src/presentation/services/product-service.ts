import { Request } from "express";
import Product from "../../data/postgres/models/product.model";
import { ExpressValidatorAdapter } from "../../config/express-validator-adapter";
import { CustomError } from "../../domain/errors/custom.error";
import { Result, ValidationError } from "express-validator";

export class ProductService {
    constructor() {}

    async createProduct(req: Request) {
        try {
            const product = await Product.create(req.body)

            return {
                data: product
            }
        } catch (error) {
            throw CustomError.internalServer('Error al crear el producto')
        }

    }
}