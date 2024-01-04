"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
function globalErrorHandler(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err?.message || 'Validation Error',
            status: 'Failed',
            errorType: 'ValidationError',
        });
    }
    const statusCode = err?.status || 500;
    const errorMessage = err?.message || 'Internal server error';
    return res.status(statusCode).json({
        message: errorMessage,
        status: 'Failed',
    });
}
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrHandler.js.map