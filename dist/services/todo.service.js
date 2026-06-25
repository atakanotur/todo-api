"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const errors_1 = require("../utils/errors");
class TodoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTodo(userId, data) {
        return await this.prisma.todo.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async getTodos(userId) {
        return await this.prisma.todo.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTodoById(userId, todoId) {
        const todo = await this.prisma.todo.findFirst({
            where: {
                id: todoId,
                userId,
            },
        });
        if (!todo) {
            throw new errors_1.NotFoundError('Todo not found');
        }
        return todo;
    }
    async updateTodo(userId, todoId, data) {
        // Ensure the todo exists and belongs to the user
        await this.getTodoById(userId, todoId);
        return this.prisma.todo.update({
            where: { id: todoId },
            data,
        });
    }
    async deleteTodo(userId, todoId) {
        // Ensure the todo exists and belongs to the user
        await this.getTodoById(userId, todoId);
        await this.prisma.todo.delete({
            where: { id: todoId },
        });
    }
}
exports.TodoService = TodoService;
