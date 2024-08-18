import { Router } from "express"
import { ProductsController } from "./controller"
import { ProductService } from "../services/product-service"
import { FieldValidationMiddleware } from "../middlewares/field-validation.middleware"
import { param } from "express-validator"
import { ExpressValidatorAdapter } from "../../config/express-validator-adapter"


export class ProductRoutes {

    static get routes(): Router {
        const router = Router()
        const productService = new ProductService
        const controller = new ProductsController(productService)

        //Definir las rutas
        router.get('/', controller.getProducts)
        
        router.post('/', 
            [
                ExpressValidatorAdapter.validateString('name'),
                ExpressValidatorAdapter.validateNumber('price'),
                FieldValidationMiddleware.ValidateErrors
            ],
            controller.createProduct
        )

        router.get('/:id', 
            [
                ExpressValidatorAdapter.validateParam(),
                FieldValidationMiddleware.ValidateErrors
            ],
            controller.getProductById
        )
        router.put('/:id',
            [
                ExpressValidatorAdapter.validateParam(),
                ExpressValidatorAdapter.validateString('name'),
                ExpressValidatorAdapter.validateNumber('price'),
                ExpressValidatorAdapter.validateBoolean('availability'),
                FieldValidationMiddleware.ValidateErrors
            ],
            controller.updateProduct
        )
        router.patch('/:id',
            [
                ExpressValidatorAdapter.validateParam(),
                FieldValidationMiddleware.ValidateErrors
            ],
            controller.updateAvailability
        )
        router.delete('/:id', controller.deleteProduct)

        return router
    }
}