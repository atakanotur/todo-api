"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }
    if (err instanceof zod_1.z.ZodError) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: err.errors,
        });
    }
    // Handle generic JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Invalid token',
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Token expired',
        });
    }
    console.error('Unhandled Exception:', err);
    return res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
