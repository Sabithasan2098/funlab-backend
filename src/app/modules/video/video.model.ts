import { model, Schema } from "mongoose";
import { TVideo, TVideoData, TVideoSource } from "./video.interface";

const videoSourceSchema = new Schema<TVideoSource>(
  {
    resolution: {
      type: String,
      enum: ["480", "720", "1080", "4k"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    sizeMB: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const videoTypeSchema = new Schema<TVideo>(
  {
    sources: { type: [videoSourceSchema], required: true },
    duration: { type: Number, required: true },
  },
  { _id: false },
);

const videoSchema = new Schema<TVideoData>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, unique: true },
    description: { type: String },
    industry: { type: String },
    category: { type: String, required: true },
    genres: [{ type: String, required: true }], //ধরন
    releaseYear: { type: Number },
    language: [{ type: String }],
    video: { type: videoTypeSchema, required: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    imdbRating: { type: Number },
    screenshots: [{ type: String }],
    tv: { type: Boolean, required: true },
    comic: { type: Boolean, required: true },
    dualAudio: { type: Boolean, required: true },
    hindiDubbed: { type: Boolean, required: true },
    web: { type: Boolean, required: true },
    oscar: { type: Boolean, required: true },
    views: { type: Number },
    isPublished: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const videoModel = model<TVideoData>("Videos", videoSchema);
