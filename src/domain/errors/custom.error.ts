import { ValidationError } from "express-validator"

export class CustomError extends Error {

    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly errors?: ValidationError[]
    ) {
        super(message)
    }

    static badRequest(message: string) {
        return new CustomError(message, 400)
    }

    static notFound(message: string) {
        return new CustomError(message, 404)
    }
    static unathorized(message: string) {
        return new CustomError(message, 401)
    }

    static forbidden(message: string) {
        return new CustomError(message, 403)
    }

    static internalServer(message: string) {
        return new CustomError(message, 500)
    }

    static BadRequestExpressValidator(errors: ValidationError[]) {
        return new CustomError('Bad Request', 400, errors)
    }
}