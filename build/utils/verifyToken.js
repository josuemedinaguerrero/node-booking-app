"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const verifyToken = (req, _res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next((0, error_1.createError)(401, 'You are not authenticated'));
    const encoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    if (!encoded)
        return next((0, error_1.createError)(403, 'Token is not valid'));
    req.user = encoded;
    next();
};
exports.verifyToken = verifyToken;
const verifyUser = (req, _res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === req.params.id)
        next();
    else
        next((0, error_1.createError)(403, 'You are not authorized! | User not found'));
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, _res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)
        next();
    else
        next((0, error_1.createError)(403, 'You are not authorized! - you must be admin'));
};
exports.verifyAdmin = verifyAdmin;
