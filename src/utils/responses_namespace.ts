import { Request, Response } from "express";

export default class ResponseNamespace {
    static sendSuccessMessage(res: Response, data: {}, code: number, message: String) {
        let body = {
            error: false,
            success: true,
            data,
            code: res.status(code).statusCode,
            message: message
        }
        res.send(body);
    }

    static sendErrorMessage(req: Request, res: Response, err: Error, code: number, message: String) {
        let body = {
            error: true,
            success: false,
            message: err?.message || message,
            code: res.status(code).statusCode
        }
        res.send(body);
    }

    static sendRequiredParameterMissingError (req: Request, res: Response, comment: string) {
        console.log("parameters are missing", comment);
        this.sendErrorMessage( req,
           res, {
               name: "",
               message: ""
           }, res.status(400).statusCode, "one or more parameters missing from body"
         );
     }
}