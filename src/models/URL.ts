import mongoose, { Document, Model, Schema } from "mongoose";

// Define the interface for URL documents
export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
}

// Define the schema
const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create or reuse the model
const Url: Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>("Url", urlSchema);

export default Url;
