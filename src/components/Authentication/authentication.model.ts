import mongoose, { mongo, StringSchemaDefinition }  from "mongoose";
import * as bcrypt from "bcrypt";

/* 
  * definition of userDocument interface
  * * definition of comparePasswordFunction
  * definition of userSchema cast with userDocument
  * Definition of userSchema middleware 
  * */

export interface UserDocument extends mongoose.Document {
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: string,

  userProfile: {
    firstName: string,
    lastName: string,
    fullName: string,
    userName: string,
    picture: string
  }

  isSubscribe: boolean

  comparePassword: comparePasswordFunction
}

 /*
  * Type definition of function that compare user password with the user password on the user database
  */
type comparePasswordFunction = (userPassword: string, userDataPassword: string, cb: (err: Error, isMatch: boolean) => void) => void

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    unique: true
  },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  userProfile: {
    firstName: String,
    lastName: String,
    userName: String,
    picture: String
  },
  isSubscribe: {
    type: Boolean,
    default: false
  }

})


const comparePassword: comparePasswordFunction = ( userPassword, userDataPassword, cd ) => {
  bcrypt.compare(userPassword, userDataPassword, (err, isMatch: boolean): any => {
    cd(<Error>err, isMatch)
  })
}
/* 
  TODO: Assignment of compare password method
  */
// userSchema.method.comparePassword = comparePassword

export const User = mongoose.model("users", userSchema)
