import { Sequelize } from "sequelize"
import { ColorsAdapter } from "../config/colors-adapter"
export class DatabaseConnection {
    static async connect(postgresUri: string) {
        try {
            const db = new Sequelize(postgresUri)
            await db.authenticate()
            db.sync()
            ColorsAdapter.cyan('Successfully connected to database')
        } catch (error) {
            console.log(error)
            ColorsAdapter.red('Failed to connect to database')
        }
    }
}