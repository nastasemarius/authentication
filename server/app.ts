import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import AuthRoutes from './routes/auth.routes';
import UsersRoutes from './routes/users.routes';

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
        this.app.use('/auth', AuthRoutes)
        this.app.use('/users', UsersRoutes)
    }
}
const app = new App().app
export default app;
