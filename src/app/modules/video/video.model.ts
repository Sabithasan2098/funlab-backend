import { model, Schema } from "mongoose";
import { TVideoData } from "./video.interface";

const videoSchema = new Schema<TVideoData>(
  {
    // id: { type: String, unique: true },
    name: { type: String, required: true },
    industry: { type: String },
    category: { type: String, required: true },
    genres: [{ type: String, required: true }], //ধরন
    videoPath: { type: String, required: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    imdbRating: { type: String },
    screenshots: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const videoModel = model<TVideoData>("Videos", videoSchema);
