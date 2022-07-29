// Dependencies
import * as crypto from "crypto"
import * as bcrypt from "bcrypt"  

export default class Password {
  static genHash = async (userPassword: string)  => {
    const password: string = userPassword
    const saltRounds: number = 10
    let hashedPassword = await bcrypt.hashSync(password, saltRounds).then(function(hash) {
       return hash
    })
    return hashedPassword
  }

  static comparePassword = (userPassword: string, hashedPassword: string) => {
    const isMatch = bcrypt.compareSync(userPassword, hashedPassword).then(function(result) {
        return result
      })
    return isMatch
  } 
};
