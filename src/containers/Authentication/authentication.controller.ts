import "./authentication.config/authentication.passport"
import {Response, Request, NextFunction} from "express"
import AuthenticationService from "./authentication.services";
import Password from "../../utils/password";
import Data from '../../utils/data';
import RegisterDataInterface from "./authentication.interface/registerdata.Interface";

export default class AuthenticationController {
  private authenticationService = new AuthenticationService()

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, userName, email } = req.body
    const user = await Data.findUserByEmailAsync(email)
    if(user) {
      return res.status(400).json({ error: "User with this email already exist"})
    }
    let { password } = req.body
    password = await Password.genHash(password)
    try {   
      const registerData: RegisterDataInterface= {
        email,
        password,
        userProfile: {
          firstName,
          lastName,
          userName,
        }
      };
      const { 
        token,
        userDetails
      } = await this.authenticationService.register(registerData);
      res.json({
        token,
        userDetails,
      })
    } catch (err) {
      console.log(err)
      // TODO create an exception for this error
      res.status(500).json({Error: "Error while creating new user"})
    }
    
  }
}