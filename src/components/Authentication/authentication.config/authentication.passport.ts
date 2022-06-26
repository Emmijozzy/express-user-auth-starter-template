import  passport from 'passport'
import localStrategy from "./passport.strategy/strategy.local"
import {User, UserDocument} from "../authentication.model"



interface CustomField {
  usernameField: string,
  passwordField: string
}

const customField: CustomField = {
  usernameField: 'email',
  passwordField: 'password'
}

/* 
  *Initialization oif strategies
 */
passport.use('localLogin', localStrategy)



passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});