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
Object.defineProperty(exports, "__esModule", { value: true });
exports.countByType = exports.countByCity = exports.getHotels = exports.getHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const models_1 = require("../models");
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHotel = new models_1.Hotel(req.body);
        const savedHotel = yield newHotel.save();
        res.json(savedHotel);
    }
    catch (error) {
        next(error);
    }
});
exports.createHotel = createHotel;
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateHotel = yield models_1.Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json(updateHotel);
    }
    catch (error) {
        next(error);
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Hotel.findByIdAndDelete(req.params.id);
        res.json('Hotel has been deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteHotel = deleteHotel;
const getHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield models_1.Hotel.findById(req.params.id);
        res.json(hotel);
    }
    catch (error) {
        next(error);
    }
});
exports.getHotel = getHotel;
const getHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { min, limit, max } = _a, others = __rest(_a, ["min", "limit", "max"]);
        const hotels = yield models_1.Hotel.find(Object.assign(Object.assign({}, others), { cheapesPrice: { $gt: min || 1, $lt: max || 9999 } })).limit(Number(limit));
        res.json(hotels);
    }
    catch (error) {
        next(error);
    }
});
exports.getHotels = getHotels;
const countByCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citiesQuery = req.query.cities;
        const cities = citiesQuery.split(',');
        const list = yield Promise.all(cities.map(city => {
            return models_1.Hotel.countDocuments({ city });
        }));
        res.json({
            list,
            cities
        });
    }
    catch (error) {
        next(error);
    }
});
exports.countByCity = countByCity;
const countByType = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelCount = yield models_1.Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = yield models_1.Hotel.countDocuments({ type: 'apartment' });
        const resortCount = yield models_1.Hotel.countDocuments({ type: 'resort' });
        const villaCount = yield models_1.Hotel.countDocuments({ type: 'villa' });
        const cabinCount = yield models_1.Hotel.countDocuments({ type: 'cabin' });
        res.json([
            { type: 'hotels', count: hotelCount },
            { type: 'apartments', count: apartmentCount },
            { type: 'resorts', count: resortCount },
            { type: 'villas', count: villaCount },
            { type: 'cabins', count: cabinCount }
        ]);
    }
    catch (error) {
        next(error);
    }
});
exports.countByType = countByType;
