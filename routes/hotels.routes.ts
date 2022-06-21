
import express, { Router } from "express";
import {
   countByCity,
   createHotel,
   deleteHotel,
   getHotel,
   getHotels,
   updateHotel } from '../controllers';
import { countByType } from "../controllers/hotel";
import { verifyAdmin, verifyToken } from "../utils/verifyToken";

const router: Router = express.Router();

// CREATE
router.post('/', [verifyToken, verifyAdmin], createHotel );

// UPDATE
router.put('/:id', [verifyToken, verifyAdmin], updateHotel );

// DELETE
router.delete('/:id', [verifyToken, verifyAdmin], deleteHotel );

// GET BY ID
router.get('/find/:id', getHotel );

// GET ALL
router.get('/', getHotels );
router.get('/countByCity', countByCity );
router.get('/countByType', countByType );

export default router;

