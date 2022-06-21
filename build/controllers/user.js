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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const models_1 = require("../models");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateUser = yield models_1.User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json(updateUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.User.findByIdAndDelete(req.params.id);
        res.json('User has been deleted');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findById(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getUser = getUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield models_1.User.find();
        res.json(Users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getUsers = getUsers;
