
import { NextFunction, Request, Response, Express } from "express";
import { Document } from "mongoose";

export interface HotelModel extends Document {
   name: string;
   type: string;
   city: string;
   address: string;
   distance: string;
   photos: Array<string>;
   title: string;
   desc: string;
   rating: number;
   rooms: Array<string>;
   cheapesPrice: number;
   featured: boolean;
}

export interface UserModel extends Document {
   username: string;
   email: string;
   country: string;
   img: string;
   city: string;
   phone: string;
   password: string;
   isAdmin: boolean;
}

export interface RoomModel extends Document {
   title: string;
   price: number;
   maxPeople: number;
   desc: string;
   roomNumbers: Array<{
      number: number,
      unavailableDates: { type: Array<Date> }
   }>
}

export interface TokenEncoded {
   id: string;
   isAdmin: boolean;
   iat: number;
   exp: number;
}

export type TokenPayload = Omit<TokenEncoded, 'iat', 'exp'>

interface Req extends Request {
   user?: TokenEncoded
}

export interface Error {
   name?: string;
   message: string;
   stack?: string;
   status?: number;
   code?: number
}

export type ErrorRequestHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => any;

