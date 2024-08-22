import { DatabaseConnection } from "../src/data/postgres"
import { Server } from "../src/presentation/server"


jest.mock('../src/data/postgres')
jest.mock('../src/presentation/server')

describe('probando server', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('App initialization', async() => {
        const mockConnect = jest.fn()
        const mockStart = jest.fn()

        DatabaseConnection.prototype.connect = mockConnect;
        Server.prototype.start = mockStart;
        
        await import ('../src/app')
        expect(Server).toHaveBeenCalledWith(4000, expect.any(Function))
        expect(mockConnect).toHaveBeenCalledTimes(1)
        expect(mockStart).toHaveBeenCalledTimes(1)
    })
})