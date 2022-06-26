import {Request, Response, NextFunction} from "express"
import HttpException from  "../exception/HttpException"

/* 
  * Description: This file handle  error made to the server api.
  * Since is an error handling middleware, there is an additional parameter that is needed to for the to handle errors which "error" parameter, The error parameter is an type of Httpexception which has two properties message and the status, 
  *  the two properties are assign to a variable the send as a response to the request made
 */
const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const message = error.message || "Something went wrong"
    const status = error.status || 500
    res.status(status).json({error: message})
}

export default ErrorMiddleware