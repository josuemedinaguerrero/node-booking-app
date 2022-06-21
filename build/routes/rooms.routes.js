"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
// CREATE
router.post('/:hotelid', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.createRoom);
// UPDATE
router.put('/:id', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.updateRoom);
// DELETE
router.delete('/:id/:hotelid', [verifyToken_1.verifyToken, verifyToken_1.verifyAdmin], controllers_1.deleteRoom);
// GET BY ID
router.get('/:id', controllers_1.getRoom);
// GET ALL
router.get('/', controllers_1.getRooms);
exports.default = router;
