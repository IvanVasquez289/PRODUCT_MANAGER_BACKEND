import { DatabaseConnection } from "../data/postgres"
import { ColorsAdapter } from "./colors-adapter"
import { envs } from "./envs"

const clearDB = async () => {
    try {
        const dbConnection = new DatabaseConnection(envs.POSTGRES_URI)
        // await dbConnection.clear()
    } catch (error) {
        ColorsAdapter.red(error)
        process.exit(1)
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
    ColorsAdapter.rainbow('Clearing database')
}
