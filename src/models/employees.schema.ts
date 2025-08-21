import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// check development changes
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  age?: number;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    age: { type: Number, min: 0 },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    profileImage: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
