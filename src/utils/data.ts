// Dependencies
import {User, UserDocument} from "../components/Authentication/authentication.model"

export type dataResponse = UserDocument | false | null | undefined

type Lib = {
  findUserByEmailAsync: (email: string) => Promise< dataResponse>
}

// initialization of lib container
export const _data: Lib = {
  findUserByEmailAsync: async (email: string) => {
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
    }
  }
};

// export of module
