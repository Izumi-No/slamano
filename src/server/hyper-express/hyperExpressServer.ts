import { IServer } from "../IServer.js";
import { Server, Router } from "hyper-express";


export class HyperExpressServer implements IServer {
    private server: Server;
    private router: Router;


    constructor() {
        this.server = new Server();
        this.router = new Router();

        this.server.use(this.router);
    }

    async start(port = 3030): Promise<void> {
        try {
            await this.server.listen(port)
            console.log(`Server is running on port http://localhost:${port}`)
        }
        catch (err) {
            console.log(err)
        }

    }
}