"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/todos', todo_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});
// Handle 404
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});
// Global Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
