// import joi from "joi";

// // initialization of lib container



//  const regSchema = joi.object({
//       firstName: joi.string()
//                     .required(),
//       lastName: joi.string()
//                     .required(),
//       userName: joi.string()
//                     .alphanum()
//                     .min(3)
//                     .max(30)
//                     .message('You must enter your name')
//                     .required(),
//       email: joi.string()
//                 .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
//                 .required(),
//       password: joi.string()
//                     .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/))
//                     .message('Your password doesn\'t march the required pattern'),
//                   //   .label('Your password doesn\'t march the required pattern'),
                        
//                   //   .error(new Error('Give your error message here for first name')),
//                   // .messages({
//                   //       "string.base": `"lastName" should be a type of 'text'`,
//                   //       "string.empty": `"lastName" cannot be an empty field`,
//                   //       "any.required": `"lastName" is a required.`,
//                   //     }),
//                     confirmPassword: joi.any()
//                     .valid(joi.ref('password'))
//                     .required()
//                     // .label('must match password'),
//                     .message('must match password'),
//                   });

// const loginSchema = joi.object({
//         email: joi.string()
//                   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
//                   .required(),
//         password: joi.string()
//                       .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/))
//                   //     .message('Your password doesn\'t march the required pattern'),
//                       .label('Your password doesn\'t march the required pattern'),

//         confirmPassword: joi.any()
//                             .valid(joi.ref('password'))
//                             .required()
//                         //     .message('must match password')
//                         .messages({
//                               "string.base": `"lastName" should be a type of 'text'`,
//                               "string.empty": `"lastName" cannot be an empty field`,
//                               "any.required": `"lastName" is a required.`,
//                             }),
//       });
      

// export {regSchema, loginSchema}

