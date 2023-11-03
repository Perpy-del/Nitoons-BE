import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(err: Error | any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    console.error(err.stack);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err?.message || "Validation Error",
            status: "Failed",
            errorType: "ValidationError",
        })
    }

    const statusCode: number = err?.status || 500;
    const errorMessage = err?.message || "Internal server error";

    return res.status(statusCode).json({
        message: errorMessage,
        status: "Failed",
    })
}