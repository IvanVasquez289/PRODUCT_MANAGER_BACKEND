"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
    static badRequest(message) {
        return new CustomError(message, 400);
    }
    static notFound(message) {
        return new CustomError(message, 404);
    }
    static unathorized(message) {
        return new CustomError(message, 401);
    }
    static forbidden(message) {
        return new CustomError(message, 403);
    }
    static internalServer(message) {
        return new CustomError(message, 500);
    }
    static BadRequestExpressValidator(errors) {
        return new CustomError('Bad Request', 400, errors);
    }
}
exports.CustomError = CustomError;
