"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string()
            .min(2, 'Name must be at least 2 characters long')
            .max(100)
            .optional(),
        email: zod_1.z.string().email('Invalid email format').optional(),
        firstName: zod_1.z
            .string()
            .min(2, 'Name must be at least 2 characters long')
            .max(100)
            .optional(),
        lastName: zod_1.z
            .string()
            .min(2, 'Name must be at least 2 characters long')
            .max(100)
            .optional(),
    }),
});
