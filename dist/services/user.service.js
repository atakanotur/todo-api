"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const db_1 = require("../config/db");
const errors_1 = require("../utils/errors");
const getProfile = async (userId) => {
    const user = await db_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new errors_1.NotFoundError('User not found');
    }
    return user;
};
exports.getProfile = getProfile;
const updateProfile = async (userId, data) => {
    const user = await db_1.prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
};
exports.updateProfile = updateProfile;
