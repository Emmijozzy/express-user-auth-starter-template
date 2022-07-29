import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi'
import validationErrorException from "../exception/validationErrorException"

/* 
    * this is a middleware in another dimension, due to the fact that it has takes a parameter and return a request handler (RequestHandler) which is the data type for middleware
    * Therefore, what make this file a middleware file is that it's returns a middleware
    *  in the middleware it create a validation option  then validate the request data with the schema received as a as a parameter with the command (await schema.validateAsync)
    * this return the values back one validated, but in case error is encountered the function  catch it and return as a response
 */

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            let errors: string[] = [];
             await e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(String(error.message));
            });
            
            errors = await errors.map(error =>{
                const newString = error.replace('[ref:password]', 'password');
                console.log(newString)
                return newString
            } )
            // res.status(400).json({ errors: errors });
            next( new validationErrorException(errors.join(' \n '), 400))
        }
    };
}

export default validationMiddleware;
