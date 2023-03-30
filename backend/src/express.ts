import express, {Request, Response} from "express";
import helmet from "helmet";
import cors from "cors";
import { questionsRouter } from "./questions/routes"

export default function () {
    const app: express.Application = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(cors());


    // Routes
    app.get('/api/v1', (req: Request, res: Response) => {
        res.send('Testing Server');
    });
    app.use('/api/v1/questions', questionsRouter);

    return app;
}
