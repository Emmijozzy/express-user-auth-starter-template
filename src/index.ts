import App from "./app"
import *  as dotenv from  "dotenv";
dotenv.config()
import AuthRouter from "./containers/Authentication/authentication.router";

const app = new App(
    [
        new AuthRouter
    ], 
    Number(process.env.PORT)
)

app.init()