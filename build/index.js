"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB);
        console.log("Connected to backend.");
    }
    catch (error) {
        throw error;
    }
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected");
});
// Middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(( _req, _res, next ) => {
//    console.log('Hello from middleware');
//    next();
// })
// Routes
app.use("/api/auth", routes_1.authRoute);
app.use("/api/users", routes_1.usersRoute);
app.use("/api/hotels", routes_1.hotelsRoute);
app.use("/api/rooms", routes_1.roomsRoute);
const errorHandler = (err, _req, res, _next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
};
app.use(errorHandler);
app.get("/", (_req, res) => {
    res.send("Hello, first request");
});
app.listen(process.env.PORT, () => {
    connect();
});
