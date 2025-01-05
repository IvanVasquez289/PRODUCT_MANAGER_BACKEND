import express, { Router } from 'express'
import { ColorsAdapter } from '../config/colors-adapter';
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import { envs } from '../config/envs';

export class Server {

    public readonly app = express()
    private serverListener?: any

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ) {}

    public corsOptions: CorsOptions = {
        origin: function(origin, callback) {
            if(origin = envs.FRONTENT_URL){
                callback(null, true)
            }else{
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    async start() {
        this.app.use(cors(this.corsOptions))

        //Middlewares
        this.app.use(express.json());

        this.app.use(morgan('dev'))

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