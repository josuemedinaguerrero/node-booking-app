"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const hotel_1 = require("../controllers/hotel");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
// CREATE
router.post('/', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.createHotel);
// UPDATE
router.put('/:id', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.updateHotel);
// DELETE
router.delete('/:id', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.deleteHotel);
// GET BY ID
router.get('/find/:id', controllers_1.getHotel);
// GET ALL
router.get('/', controllers_1.getHotels);
router.get('/countByCity', controllers_1.countByCity);
router.get('/countByType', hotel_1.countByType);
exports.default = router;
