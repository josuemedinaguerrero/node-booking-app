
import express, { Router } from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers";
import { verifyAdmin, verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

// CREATE
router.post('/:hotelid', [verifyToken, verifyAdmin], createRoom );

// UPDATE
router.put('/:id', [verifyToken, verifyAdmin], updateRoom );

// DELETE
router.delete('/:id/:hotelid', [verifyToken, verifyAdmin], deleteRoom );

// GET BY ID
router.get('/:id', getRoom );

// GET ALL
router.get('/', getRooms );

export default router;

