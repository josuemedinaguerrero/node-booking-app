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
exports.getRooms = exports.getRoom = exports.deleteRoom = exports.updateRoom = exports.createRoom = void 0;
const models_1 = require("../models");
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelid;
    const newRoom = new models_1.Room(req.body);
    try {
        const savedRoom = yield newRoom.save();
        try {
            yield models_1.Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            });
        }
        catch (error) {
            next(error);
        }
        res.json(savedRoom);
    }
    catch (error) {
        next(error);
    }
});
exports.createRoom = createRoom;
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateRoom = yield models_1.Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json(updateRoom);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelId = req.params.hotelid;
        yield models_1.Room.findByIdAndDelete(req.params.id);
        try {
            yield models_1.Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            });
        }
        catch (error) {
            next(error);
        }
        res.json('Room has been deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoom = deleteRoom;
const getRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield models_1.Room.findById(req.params.id);
        res.json(room);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoom = getRoom;
const getRooms = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield models_1.Room.find();
        res.json(rooms);
    }
    catch (error) {
        next(error);
    }
});
exports.getRooms = getRooms;
