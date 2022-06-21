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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioRegister = req.body;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(usuarioRegister.password, salt);
        const newUser = new models_1.User(Object.assign(Object.assign({}, usuarioRegister), { password: hash }));
        yield newUser.save();
        res.send('User has been created');
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield models_1.User.findOne({ username });
        if (!user)
            return next((0, error_1.createError)(404, 'Error logging in - User not found'));
        const validatePassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validatePassword)
            return next((0, error_1.createError)(404, 'Wrong password'));
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        const _a = user._doc, { password, isAdmin } = _a, otherDetails = __rest(_a, ["password", "isAdmin"]);
        res
            .cookie('access_token', token, { httpOnly: true })
            .json({ details: Object.assign({}, otherDetails), isAdmin });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
