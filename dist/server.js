"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const PORT = env_1.env.PORT || 3000;
const startServer = async () => {
    try {
        await db_1.prisma.$connect();
        console.log('📦 Connected to Database');
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        await db_1.prisma.$disconnect();
        process.exit(1);
    }
};
startServer();
// Handle unexpected errors (e.g., uncaught exceptions)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
