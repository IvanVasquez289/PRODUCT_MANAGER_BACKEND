import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { CustomError } from "../../domain/errors/custom.error";


export class ProductsController{

    constructor(
        private readonly productService: ProductService
    ) {}

    private handleError = (error: CustomError, res: Response) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message })
            return
        }

        res.status(500).json({ message: 'Internal server error' })
    }

    public getProducts = (req: Request, res: Response) => {
        res.json({ message: "Obteniendo todos los productos" })
    }

    public createProduct = (req: Request, res: Response) => {
        // res.json({ message: "Creando un nuevo producto" })
        this.productService.createProduct(req)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    public getProduct = (req: Request, res: Response) => {
        res.json({ message: "Obteniendo un producto" })
    }

    public updateProduct = (req: Request, res: Response) => {
        res.json({ message: "Actualizando un producto" })
    }

    public deleteProduct = (req: Request, res: Response) => {
        res.json({ message: "Eliminando un producto" })
    }
}