import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { CustomError } from "../../domain/errors/custom.error";


export class ProductsController{

    constructor(
        private readonly productService: ProductService
    ) {}

    private handleError = (error: CustomError, res: Response) => {
        if(error instanceof CustomError) {
            if (error.errors) return res.status(error.statusCode).json({ errors: error.errors })
            return res.status(error.statusCode).json({ message: error.message })
        }

        return res.status(500).json({ message: 'Internal server error' })
    }

    public getProducts = (req: Request, res: Response) => {
        this.productService.getProducts()
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    public createProduct = (req: Request, res: Response) => {
        this.productService.createProduct(req)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    public getProductById = (req: Request, res: Response) => {
        this.productService.getProductById(req)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    public updateProduct = (req: Request, res: Response) => {
        res.json({ message: "Actualizando un producto" })
    }

    public deleteProduct = (req: Request, res: Response) => {
        res.json({ message: "Eliminando un producto" })
    }
}