import { Schema, model, Document } from "mongoose";
export interface IRole extends Document {
  name: string;
}
const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const Role = model<IRole>("Role", roleSchema);
