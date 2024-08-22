import { Sequelize } from "sequelize-typescript"
import { ColorsAdapter } from "../../config/colors-adapter"
export class DatabaseConnection {
    public db: Sequelize;
    constructor(
        private readonly postgresUri: string
    ) {}
    async connect() {
        try {
            this.db = new Sequelize(this.postgresUri, {
                models: [__dirname + '/models/**/*.ts'],
                logging: false
            })
            await this.db.authenticate()
            this.db.sync()
            ColorsAdapter.cyan('Successfully connected to database')
        } catch (error) {
            console.log(error)
            ColorsAdapter.red('Failed to connect to database')
        }
    }
    async close() {
        await this.db.close()
    }
}