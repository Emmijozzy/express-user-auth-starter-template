import RouterInterface from "@/interface/router.interface";
import {Router, Request, Response, NextFunction} from "express"
import validationMiddleware from "../../middleware/validation.middleware"
import {regSchema} from "./authentication.validation";
import {User, UserDocument} from "./authentication.model"

/* 
  * creation of class,
  * class property: path and the router
  * the constructor was use to call the "initializeRouters" method.
  * initializeRouters method is a private method 
  * *with the router property, it initialize the router path, middleware and controller 
  * Router 1 : 
  * * method: post
  * * path: auth/register
  * *middleware: validationMiddle -> to validate data received on post Request
  * * controller : this.register -> 
  * the register method is made to serve as a controller to the "auth/register path"
  *  the register controller take requsted data from the validation middleware 
 */

class AuthRouter implements RouterInterface {
  public path = "/auth";
  public router: Router = Router()

  constructor() {
    this.initializeRouters()
  }

  private initializeRouters = () => {
    this.router.post(
                    `${this.path}/register`,
                      validationMiddleware(regSchema),
                      this.register 
                    )
  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    // collection of data
    const {firstName, lastName, userName, email, password } = req.body
    // creation of new user
    try {   
      const newUser = new User({
        email,
        password,
        userProfile: {
          firstName,
          lastName,
          userName,
        }
      })
      // save of new member created
      const savedUser = await newUser.save()
      console.log('new member created!!!')
      res.json(savedUser)
    } catch (err) {
      console.log(err)
    }
    
  }

}

export default AuthRouter