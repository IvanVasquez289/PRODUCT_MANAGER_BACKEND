import { envs } from "./config/envs"
import { DatabaseConnection } from "./data/postgres"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
    main()
})()

async function main() { 
    try {
        const dataBaseConnection = new DatabaseConnection(envs.POSTGRES_URI)
        await dataBaseConnection.connect()
        const server = new Server(
            envs.PORT,
            AppRoutes.routes
        )
        server.start()
    } catch (error) {
        console.error('Error during initialization:', error);
        console.error('Error type:', typeof error);
    }
}
