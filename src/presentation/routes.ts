import { Router } from "express";
import { ProductRoutes } from "./products/routes";


export class AppRoutes {

    constructor() {}

    static get routes(): Router {
        const router = Router()

        //Definir las rutas
        router.use('/api/products', ProductRoutes.routes)
        

        return router 
    }
}