// Dependencies
import {User, UserDocument} from "../containers/Authentication/authentication.model"

export type dataResponse = UserDocument | false | null | undefined
export default class Data {
  static findUserByEmailAsync = async (email: string):Promise<dataResponse> => {
    try {
        const user = User.findOne({email: email});
        if(!user) {
          console.log('No user found with this email');
          return false 
        } else {
          // console.log(user, "from data.js")
          return user
        }      
    } catch(err) {
      console.log(err)
      return false
    }
  }
}
