import { Schema, model, Document } from "mongoose";

export interface IUrl extends Document {
  unique_code: string;
  original_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    unique_code: {
      type: String,
      required: true,
      unique: true,
    },
    original_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UrlModel = model<IUrl>("Url", urlSchema);

export default UrlModel;
