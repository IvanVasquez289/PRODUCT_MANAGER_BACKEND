"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./products/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../config/swagger");
class AppRoutes {
    constructor() { }
    static get routes() {
        const router = (0, express_1.Router)();
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
        router.use('/api/products', routes_1.ProductRoutes.routes);
        //Documentación
        router.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
        return router;
    }
}
exports.AppRoutes = AppRoutes;
