import { Request, Response } from "express";


export class ProductsController{

    public getProducts = (req: Request, res: Response) => {
        res.json({ message: "Obteniendo todos los productos" })
    }

    public createProduct = (req: Request, res: Response) => {
        res.json({ message: "Creando un nuevo producto" })
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