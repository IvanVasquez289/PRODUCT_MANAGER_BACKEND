import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
    main()
})()

function main() {
    const server = new Server(
        4000,
        AppRoutes.routes
    )
    server.start()
}
