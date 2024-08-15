import express, { Router } from 'express'

export class Server {

    private readonly app = express()

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ) {}

    async start() {

        //Middlewares
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
     
    }
}