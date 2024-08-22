import express, { Router } from 'express'
import { ColorsAdapter } from '../config/colors-adapter';

export class Server {

    public readonly app = express()
    private serverListener?: any

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ) {}

    async start() {

        //Middlewares
        this.app.use(express.json());

        //Routes
        this.app.use(this.routes);

        this.serverListener = this.app.listen(this.port, () => {
            // console.log(`Server running on port ${this.port}`)
            ColorsAdapter.magenta(`Server running on port ${this.port}`)
        })
     
    }

    async close() {
        this.serverListener?.close()
    }
}