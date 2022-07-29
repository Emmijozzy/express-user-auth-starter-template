import express, {Express} from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import RouterInterface from "interface/router.interface";
import ErrorMiddleware from "./middleware/error.middleware"
import mongoose from "mongoose";
import connectMongoDb from './Database/database'
import dotenv from "dotenv"
dotenv.config()


export default class App {
    public App: Express = express();
    public port: number;
    public routers: RouterInterface[]

    constructor(routers: RouterInterface[], port: number ) {
        this.routers = routers;
        this.port = port

        this.initializeMiddlewares()
        this.initializeRouters()
        this.initializeErrorHandling()
    }

    private initializeMiddlewares = (): void => {
        this.App.use(cors())
        this.App.use(helmet());
        this.App.use(compression())
        this.App.use(express.json());
        this.App.use(express.urlencoded({extended: false}))
        this.App.use(cookieParser())
    }

    private initializeRouters = (): void  => {
        this.routers.map((router: RouterInterface) => {
            this.App.use('/', router.router)
        })

        
    }

    // private initializeDatabaseConnection = (): void => {
    // }

    private initializeErrorHandling = async(): Promise<void> => {
        this.App.use(ErrorMiddleware)
    }

    public init = (): void => {
        connectMongoDb()
                        .then(() => this.App.listen(this.port, () => console.log(`App is running port: ${this.port}`)))
                        .catch((err) => console.log(err))
    }
}