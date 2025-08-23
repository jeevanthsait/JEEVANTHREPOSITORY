import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number; 
  createdAt: Date; 
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], 
    stock:[{type:Number,required :true,default:0}]
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
