import { User, UserDocument } from "../../authentication.model";
import { Response } from "express";
import LocalStrategy from 'passport-local'
import {_data, dataResponse} from '../../../../utils/data'
import _validatePassword from '../../../../utils/validatePassword'

/* 
  * definition of customField interface
  * definition of customField variable
  * declaration and definition of verifyCallback
  * creation of local strategy
   */

interface CustomField {
  usernameField: string,
  passwordField: string
}

const customField: CustomField = {
  usernameField: 'email',
  passwordField: 'password'
}

const verifyCallback =  async (email: string, password: string, done: (err: any, user:dataResponse ) => void ) => {
  try {
    const user: dataResponse = await _data.findUserByEmailAsync(email).then( res => {return res });
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