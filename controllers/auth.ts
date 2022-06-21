
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { User } from "../models";
import { TokenPayload, UserModel } from '../types';
import { FilterQuery } from "mongoose";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error";

export const register = async( req: Request, res: Response, next: NextFunction ) => {
   try {

      const usuarioRegister = req.body as UserModel;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync( usuarioRegister.password, salt );

      const newUser = new User({ ...usuarioRegister, password: hash });
      await newUser.save();
      res.send('User has been created');
   } catch ( error ) {
      next( error );
   }
}

export const login = async( req: Request, res: Response, next: NextFunction ) => {
   try {
      const { username } = req.body as UserModel;
      
      const user = await User.findOne({ username }) as FilterQuery<UserModel>;
      if ( !user ) return next( createError(404, 'Error logging in - User not found') );

      const validatePassword = await bcrypt.compare( req.body.password, user.password );
      if ( !validatePassword ) return next( createError(404, 'Wrong password') );

      const token = jwt.sign(
         { id: user._id, isAdmin: user.isAdmin } as TokenPayload,
         process.env.SECRET_KEY as string,
         { expiresIn: 60 * 60 * 24 }
      );

      const { password, isAdmin, ...otherDetails } = user._doc;
      res
         .cookie('access_token', token, { httpOnly: true })
         .json({ details: { ...otherDetails }, isAdmin });
   } catch ( error ) {
      next( error );
   }
}

