import { Request } from "express";
import Product from "../../data/postgres/models/product.model";

export class ProductService {
    constructor() {}

    async createProduct(req: Request) {
        
        const product = await Product.create(req.body)
    

        return {
            data: product
        }
    }
}