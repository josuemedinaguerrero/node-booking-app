import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Req, TokenEncoded } from "../types";
import { createError } from "../utils/error";

export const verifyToken = (req: Req, _res: Response, next: NextFunction) => {
   const token = req.cookies.access_token;
   if (!token) return next(createError(401, "You are not authenticated"));

   const encoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
   ) as TokenEncoded;
   if (!encoded) return next(createError(403, "Token is not valid"));
   req.user = encoded;
   next();
};

export const verifyUser = (req: Req, _res: Response, next: NextFunction) => {
   if (req.user?.id === req.params.id) next();
   else next(createError(403, "You are not authorized! | User not found"));
};

export const verifyAdmin = (req: Req, _res: Response, next: NextFunction) => {
   if (req.user?.isAdmin) next();
   else next(createError(403, "You are not authorized! - you must be admin"));
};
