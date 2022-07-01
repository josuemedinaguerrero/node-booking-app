import express, { Router } from "express";
import {
   countByCity,
   createHotel,
   deleteHotel,
   getHotel,
   getHotels,
   updateHotel,
} from "../controllers";
import { countByType, getHotelRooms } from "../controllers/hotel";
import { verifyAdmin, verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

router.post("/", [verifyToken, verifyAdmin], createHotel);

router.put("/:id", [verifyToken, verifyAdmin], updateHotel);

router.delete("/:id", [verifyToken, verifyAdmin], deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
