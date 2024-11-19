import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import AuthRoute from "./routes/auth.route";
import TokenRoute from "./routes/token.route";
import SubscriberRoute from "./routes/subscriber.route";
import MailRoute from "./routes/mail.route";
import SmtpRoute from "./routes/smtp.route";
import ProxyRoute from "./routes/proxy.route";
import AdminRoute from "./routes/admin.route";
import uploadRoute from "./routes/upload.route";
import dotenv from "dotenv";
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
        this.app.use(bodyParser.json());
        this.app.use(express.static("public"));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.path === "/api/subscriber/add-subscriber") {
                res.header("Access-Control-Allow-Origin", req.headers.origin as string);
                res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
                res.header("Access-Control-Allow-Credentials", "true");
                next();
            } else {
                const allowedOrigins = [
                    "http://localhost:5174",
                    "http://localhost:5173",
                    "https://unique-squirrel-enormously.ngrok-free.app",
                    "http://localhost:3001",
                    process.env.OriginURL as string,
                ];
                const origin = req.headers.origin as string;
                if (allowedOrigins.includes(origin)) {
                    res.header("Access-Control-Allow-Origin", origin);
                    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
                    res.header("Access-Control-Allow-Credentials", "true");
                    next();
                } else {
                    res.status(403).json({ message: "Origin not allowed" });
                };
            }});
    }

    setRoutes() {
        this.app.use("/api/auth", AuthRoute);
        this.app.use("/api/token", TokenRoute);
        this.app.use("/api/subscriber", SubscriberRoute);
        this.app.use("/api/mail", MailRoute);
        this.app.use("/api/smtp", SmtpRoute);
        this.app.use("/api/proxy", ProxyRoute);
        this.app.use("/api/admin", AdminRoute);
        this.app.use('/api/file_upload', uploadRoute);
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

    handlePublicFiles(){
    }

    handleClientError() {
        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let errorStatus = (err as any).errorStatus || 500;
                let errorMessage =
                    err.message ||
                    "Something went wrong. Please try again later";
                res.status(errorStatus).json({
                    status: errorStatus,
                    errorName: err.name,
                    errorMessage: errorMessage,
                });
            }
        );
    }
}
