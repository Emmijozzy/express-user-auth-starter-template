import RouterInterface from "@/interface/router.interface";
import  {Router } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import AuthenticationController from "./authentication.controller";
import {regSchema} from "./authentication.validation";

class AuthRouter implements RouterInterface {
  public path = "/auth";
  public router: Router = Router();
  public authenticationController = new AuthenticationController()
  constructor() {
    this.initializeRouters()
  }

  private initializeRouters = () => {
    this.router.post(
                    `${this.path}/register`,
                      validationMiddleware(regSchema),
                      this.authenticationController.register
                    )
  }

}

export default AuthRouter