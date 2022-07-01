import express, { Router } from "express";
import {
   createRoom,
   deleteRoom,
   getRoom,
   getRooms,
   updateRoom,
   updateRoomAvailability,
} from "../controllers";
import { verifyAdmin, verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);

router.post("/:hotelid", [verifyToken, verifyAdmin], createRoom);

router.put("/:id", [verifyToken, verifyAdmin], updateRoom);
router.put("/availability/:id", updateRoomAvailability);

router.delete("/:id/:hotelid", [verifyToken, verifyAdmin], deleteRoom);

export default router;
