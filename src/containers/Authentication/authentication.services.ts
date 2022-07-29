// Dependencies
import jwt from "jsonwebtoken";
import {User, UserDocument} from "./authentication.model";
import RegisterDataInterface from "./authentication.interface/registerdata.Interface";

// initialization of service container 
class AuthenticationService {
  private tokenLife = String(process.env.JWT_TOKEN_LIFE);
  private jwtSecret = String(process.env.JWT_SECRET);

  public register = async (registerData: RegisterDataInterface) => {
    const newUser = new User(registerData);
    // save of new member created
    const savedUser = await newUser.save()
    console.log('new member created!!!')
    // creation of jwt payload
    const payload = {
      id: savedUser.id
    }
    // creation of token
    const token = jwt.sign(payload, this.jwtSecret, {expiresIn: this.tokenLife})
    //  TODO notice to user onb registration through mail
    // removal of password from savedUser return
    savedUser.password = ' ';
    // return of newUser Details and Token Created
    return {
      token: `Bearer ${token}`,
      userDetails: savedUser,
    }
  }

  // public login = async (loginData) 
}

export default AuthenticationService