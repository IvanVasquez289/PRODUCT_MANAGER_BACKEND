import { Sequelize } from "sequelize"


export class DatabaseConnection {

    static async connect(postgresUri: string) {
        try {
            const db = new Sequelize(postgresUri)
            await db.authenticate()
            db.sync()
            console.log('Successfully connected to database')
        } catch (error) {
            console.log(error)
            console.log('Failed to connect to database')
        }
    }
}