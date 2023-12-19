"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseNamespace {
    static sendSuccessMessage(res, data, code, message) {
        let body = {
            error: false,
            success: true,
            data,
            code: res.status(code).statusCode,
            message: message,
        };
        res.send(body);
    }
    static sendErrorMessage(req, res, err, code, message) {
        let body = {
            error: true,
            success: false,
            message: err?.message || message,
            code: res.status(code).statusCode,
        };
        res.send(body);
    }
    static BadUserRequestError(res, message) {
        let body = {
            error: true,
            success: false,
            message: message,
            status: 400,
            errorType: 'BadUserRequestError',
        };
        res.send(body);
    }
    static NotFoundError(res, message) {
        let body = {
            error: true,
            success: false,
            message: message,
            status: 404,
            errorType: 'NotFoundError',
        };
        res.send(body);
    }
    static UnauthorizedError(res, message) {
        let body = {
            error: true,
            success: false,
            message: message,
            status: 401,
            errorType: 'UnAuthorizedError',
        };
        res.send(body);
    }
    static InternalServerError(res, message) {
        let body = {
            error: true,
            success: false,
            message: message,
            status: 500,
            errorType: 'InternalServerError',
        };
        res.send(body);
    }
    static sendRequiredParameterMissingError(req, res, comment) {
        console.log('parameters are missing', comment);
        this.sendErrorMessage(req, res, {
            name: '',
            message: '',
        }, res.status(400).statusCode, 'one or more parameters missing from body');
    }
}
exports.default = ResponseNamespace;
//# sourceMappingURL=responses_namespace.js.map