"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.createTodoSchema = void 0;
const zod_1 = require("zod");
exports.createTodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').max(255),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().optional(),
    }),
});
exports.updateTodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(255).optional(),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().optional(),
    }),
});
