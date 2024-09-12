import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors';
import { Request, Response,NextFunction } from "express";
import AuthRoute from './routes/auth.route';
import TokenRoute from "./routes/token.route";
import SubscriberRoute from "./routes/subscriber.route";
import MailRoute from "./routes/mail.route";
import SmtpRoute from "./routes/smtp.route";
import ProxyRoute from "./routes/proxy.route";
import dotenv from 'dotenv';
dotenv.config();
export class MainServer {
    public app: express.Application = express();
    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.handle404Error();
        this.handleClientError();
    }
    async setConfiguration() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors({origin: ["http://localhost:5173","https://unique-squirrel-enormously.ngrok-free.app","http://localhost:3001",process.env.OriginURL as string], credentials: true}));
        this.app.use(bodyParser.json());
    }

    setRoutes() {
        this.app.use("/api/auth", AuthRoute);
        this.app.use("/api/token", TokenRoute);
        this.app.use("/api/subscriber", SubscriberRoute);
        this.app.use("/api/mail", MailRoute);
        this.app.use("/api/smtp", SmtpRoute);
        this.app.use("/api/proxy", ProxyRoute);
    }
    handle404Error() {
		this.app.use((req: Request, res: Response) => {
			res.status(404).json({
				status: 404,
				errorName: "Not Found",
				errorMessage: "Not Found",
			});
		});
	}
    handleClientError() {
        this.app.use((err: Error, req: Request, res: Response,next:NextFunction) => {
            let errorStatus = (err as any).errorStatus || 500;
			let errorMessage = err.message || "Something went wrong. Please try again later";
            res.status(errorStatus).json({
                status: errorStatus,
                errorName: err.name,
                errorMessage: errorMessage,
            });
        });
    }
}