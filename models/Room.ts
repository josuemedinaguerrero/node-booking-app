
import mongoose from 'mongoose';
import { RoomModel } from '../types';
const { Schema, model } = mongoose;

const RoomSchema = new Schema<RoomModel>({
   title: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   maxPeople: {
      type: Number,
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   roomNumbers: [
      { number: Number, unavailableDates: { type: [ Date ] } }
   ]
}, { timestamps: true });

export default model<RoomModel>('Room', RoomSchema);

