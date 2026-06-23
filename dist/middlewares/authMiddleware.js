"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new errors_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = {
            userId: payload.userId,
        };
        next();
    }
    catch (error) {
        next(new errors_1.UnauthorizedError('Invalid or expired token'));
    }
};
exports.requireAuth = requireAuth;
