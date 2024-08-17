import { Request } from "express";
import Product from "../../data/postgres/models/product.model";
import { CustomError } from "../../domain/errors/custom.error";

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

    async getProducts() {
        try {
            const products = await Product.findAll({
                order: [['price', 'DESC']],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })

            return {
                data: products
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}