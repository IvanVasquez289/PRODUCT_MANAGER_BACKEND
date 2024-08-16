import { Router } from "express"
import { ProductsController } from "./controller"
import { ProductService } from "../services/product-service"


export class ProductRoutes {

    static get routes(): Router {
        const router = Router()
        const productService = new ProductService
        const controller = new ProductsController(productService)

        //Definir las rutas
        router.get('/', controller.getProducts)
        router.post('/', controller.createProduct)
        router.get('/:id', controller.getProduct)
        router.put('/:id', controller.updateProduct)
        router.delete('/:id', controller.deleteProduct)

        return router
    }
}