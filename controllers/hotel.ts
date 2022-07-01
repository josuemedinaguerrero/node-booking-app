import { NextFunction, Request, Response } from "express";
import { Hotel, Room } from "../models";
import { HotelModel } from "../types";

export const createHotel = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const newHotel: HotelModel = new Hotel(req.body);
      const savedHotel = await newHotel.save();
      res.json(savedHotel);
   } catch (error) {
      next(error);
   }
};

export const updateHotel = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { id } = req.params;
      const updateHotel = await Hotel.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.json(updateHotel);
   } catch (error) {
      next(error);
   }
};

export const deleteHotel = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.json("Hotel has been deleted");
   } catch (error) {
      next(error);
   }
};

export const getHotel = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const hotel = await Hotel.findById(req.params.id);
      res.json(hotel);
   } catch (error) {
      next(error);
   }
};

export const getHotels = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { min, limit, max, ...others } = req.query;
      const hotels = await Hotel.find({
         ...others,
         cheapesPrice: { $gt: min || 1, $lt: max || 999999 },
      }).limit(Number(limit) || 999);
      res.json(hotels);
   } catch (error) {
      next(error);
   }
};

export const countByCity = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const citiesQuery = req.query.cities as string;
      const cities = citiesQuery.split(",");
      const list = await Promise.all(
         cities.map((city) => {
            return Hotel.countDocuments({ city });
         })
      );
      res.json({
         list,
         cities,
      });
   } catch (error) {
      next(error);
   }
};

export const countByType = async (
   _req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });

      res.json([
         { type: "hotels", count: hotelCount },
         { type: "apartments", count: apartmentCount },
         { type: "resorts", count: resortCount },
         { type: "villas", count: villaCount },
         { type: "cabins", count: cabinCount },
      ]);
   } catch (error) {
      next(error);
   }
};

export const getHotelRooms = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const hotel = await Hotel.findById(req.params.id);
      if (hotel) {
         const hotelRes = hotel as unknown as HotelModel;
         const list = await Promise.all(
            hotelRes.rooms.map((room) => {
               return Room.findById(room);
            })
         );
         res.json(list);
      }
   } catch (error) {
      next(error);
   }
};
