"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const todo_service_1 = require("../services/todo.service");
const db_1 = require("../config/db");
const todoService = new todo_service_1.TodoService(db_1.prisma);
const createTodo = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await todoService.createTodo(userId, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await todoService.getTodos(userId);
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getTodos = getTodos;
const getTodoById = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        const result = await todoService.getTodoById(userId, todoId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getTodoById = getTodoById;
const updateTodo = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        const result = await todoService.updateTodo(userId, todoId, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        await todoService.deleteTodo(userId, todoId);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTodo = deleteTodo;
