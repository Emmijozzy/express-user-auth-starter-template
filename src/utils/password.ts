// Dependencies
import * as crypto from "crypto"
import * as bcrypt from "bcrypt"  

export default class Password {
  static genHash = async (userPassword: string)  => {
    const password: string = userPassword
    const saltRounds: number = 10
    let hashedPassword = await bcrypt.hashSync(password, saltRounds)
    return hashedPassword
  }

  static comparePassword = (userPassword: string, hashedPassword: string) => {
    const isMatch = bcrypt.compareSync(userPassword, hashedPassword)
    return isMatch
  } 
};
