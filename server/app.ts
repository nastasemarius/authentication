import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import AuthController from './routes/auth.routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.configureRoutes();
    }

    private configureRoutes() {
        this.app.use('/auth', AuthController)
    }
}
const app = new App().app
export default app;
