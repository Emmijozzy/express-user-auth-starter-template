// Dependencies
import * as crypto from "crypto"
import * as bcrypt from "bcrypt"

// initialization of lib container
interface Lib {
  genHash: (userPassword: string) => Promise<any>,
  comparePassword: (userPassword: string, hash: string)  =>Promise< boolean>
}

const lib: Lib = {
  genHash: async (userPassword)  => {
    const password: string = userPassword
    const saltRounds: number = 10
    let hashedPassword = await bcrypt.hash(password, saltRounds).then(function(hash) {
       return hash
    })
    return hashedPassword
  },

  comparePassword: (userPassword, hashedPassword) => {
    const isMatch = bcrypt.compare(userPassword, hashedPassword).then(function(result) {
        return result
      })
    return isMatch
  } 

};

// generate salt and hash of password
// lib.genSaltHash = (password: string) => {
//   const salt = crypto.randomBytes(32).toString('hex');
//   const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//   return {
//     salt,
//     hash
//   }
// }

// lib.comparePassword = (password: string , hash: string, salt: string) => {
//   const hashToVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//   return hash === hashToVerify
// }

// export of module
export default lib