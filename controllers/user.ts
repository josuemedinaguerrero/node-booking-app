
import { Request, Response } from "express";
import { User } from "../models";

export const updateUser = async( req: Request, res: Response ) => {
   try {
      const { id } = req.params;
      const updateUser = await User.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.json( updateUser );
   } catch ( error ) {
      res.status(500).json( error )
   }
}

export const deleteUser = async( req: Request, res: Response ) => {
   try {
      await User.findByIdAndDelete( req.params.id );
      res.json('User has been deleted');
   } catch ( error ) {
      res.status(500).json( error )
   }
}

export const getUser = async( req: Request, res: Response ) => {
   try {
      const user = await User.findById( req.params.id );
      res.json( user );
   } catch ( error ) {
      res.status(500).json( error )
   }
}

export const getUsers = async( _req: Request, res: Response ) => {
   try {
      const Users = await User.find();
      res.json( Users );
   } catch ( error ) {
      res.status(500).json( error )
   }
}

