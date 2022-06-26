import HttpException from "./HttpException"

class validationErrorException extends HttpException {
  constructor(message: string, status: number){
    super(message, status)
  }
}
export default validationErrorException