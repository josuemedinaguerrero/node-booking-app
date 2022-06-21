
import { NextFunction, Request, Response } from "express";
import { Hotel, Room } from "../models";

export const createRoom = async( req: Request, res: Response, next: NextFunction ) => {
   const hotelId = req.params.hotelid;
   const newRoom = new Room( req.body );
   try {
      const savedRoom = await newRoom.save();
      try {
         await Hotel.findByIdAndUpdate( hotelId, {
            $push: { rooms: savedRoom._id }
         })
      } catch ( error ) {
         next( error );
      }
      res.json( savedRoom );
   } catch ( error ) {
      next( error );
   }
}

export const updateRoom = async( req: Request, res: Response, next: NextFunction ) => {
   try {
      const { id } = req.params;
      const updateRoom = await Room.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.json( updateRoom );
   } catch ( error ) {
      next( error );
   }
}

export const deleteRoom = async( req: Request, res: Response, next: NextFunction ) => {
   try {
      const hotelId = req.params.hotelid;
      await Room.findByIdAndDelete( req.params.id );
      try {
         await Hotel.findByIdAndUpdate( hotelId, {
            $pull: { rooms: req.params.id }
         })
      } catch ( error ) {
         next( error );
      }
      res.json('Room has been deleted');
   } catch ( error ) {
      next( error );
   }
}

export const getRoom = async( req: Request, res: Response, next: NextFunction ) => {
   try {
      const room = await Room.findById( req.params.id );
      res.json( room );
   } catch ( error ) {
      next( error );
   }
}

export const getRooms = async( _req: Request, res: Response, next: NextFunction ) => {
   try {
      const rooms = await Room.find();
      res.json( rooms );
   } catch ( error ) {
      next( error );
   }
}

