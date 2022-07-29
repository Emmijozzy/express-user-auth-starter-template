import { User, UserDocument } from "../../authentication.model";
import { Response } from "express";
import LocalStrategy from 'passport-local'
import Data from '../../../../utils/data'
import _validatePassword from '../../../../utils/password'

/* 
  * definition of customField interface
  * definition of customField variable
  * declaration and definition of verifyCallback
  * creation of local strategy
   */
interface UserData {
  email: string;
  password: string;
  userProfile: {
    firstName: string;
    lastName: string;
    userName: string;
  }
}

interface CustomField {
  usernameField: string,
  passwordField: string
}

const customField: CustomField = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback =  async (email: string, password: string, done: (err: any, user: UserData | false) => void ) => {
  try {
    const user = await Data.findUserByEmailAsync(email).then( res => {return res });
    console.log(user)
    if(!user){
      return done("This e-mail address is not associated with any account", false)
    }
    let isMatch;
     _validatePassword.comparePassword(password , user.password).then(res =>
       isMatch = res)
    if(isMatch){
      return done(null, user)
    } else {
      console.log("incorrect password")
      return done("Incorrect password", false)
    };
  } catch(err) {
    return done(err, false)
  }
};

const strategy = new LocalStrategy.Strategy({ usernameField: "email" }, verifyCallback)

export default strategy