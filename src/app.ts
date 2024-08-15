import { envs } from "./config/envs"
import { DatabaseConnection } from "./data/db"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
    main()
})()

async function main() {
    await DatabaseConnection.connect(envs.POSTGRES_URI)
    
    const server = new Server(
        envs.PORT,
        AppRoutes.routes
    )
    server.start()
}
