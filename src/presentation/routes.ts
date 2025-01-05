import { Router } from "express";
import { ProductRoutes } from "./products/routes";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../config/swagger';

export class AppRoutes {

    constructor() {}

    static get routes(): Router {
        const router = Router()

        
        
        /**
        * @swagger
        * components:
        *   schemas:
        *     Product:
        *       type: object
        *       properties:
        *           id:
        *               type: integer
        *               description: The auto-generated id of the product
        *               example: 1
        *           name:
        *               type: string
        *               description: The name of the product
        *               example: Mouse
        *           price:
        *               type: number   
        *               description: The price of the product
        *               example: 100
        *           availability:
        *               type: boolean
        *               description: The availability of the product
        *               example: true
        */
       
        /**
         * @swagger
         * /api/products:
         *   get:
         *      summary: Get all products
         *      tags: [Products]
         *      description: Return all products
         *      responses:
         *        200:
         *            description: The products were obtained successfully
         *            content:
         *                application/json:
         *                    schema:
         *                      type: array
         *                      items:
         *                          $ref: '#/components/schemas/Product'
         * 
         */

        //Definir las rutas
        router.use('/api/products', ProductRoutes.routes)

        //Documentación
        router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        return router 
    }
}