"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//Import Routes
const index_1 = __importDefault(require("./api/index"));
// Import middelwares
// access environment variables
dotenv_1.default.config();
//initialize app with express
const app = (0, express_1.default)();
//Load app middelware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Serve all static files inside public directory
app.use("/static", express_1.default.static("public"));
// app.use(logRequestData)
//Routes handeling the request
app.use("/", index_1.default);
// app.use()
// app.use(errorHandlerMiddelware)
exports.default = app;
//# sourceMappingURL=app.js.map