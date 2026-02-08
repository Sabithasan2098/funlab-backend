import { Schema, model } from "mongoose";
import {
  TAudioInfo,
  TEpisode,
  TSeason,
  TSeriesData,
  TVideoSource,
} from "./series.interface";

/* -------------------------------
   Video Source Schema
-------------------------------- */
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

/* -------------------------------
   Audio Info Schema
-------------------------------- */
const audioInfoSchema = new Schema<TAudioInfo>(
  {
    originalLanguage: {
      type: String,
      enum: [
        "English",
        "Hindi",
        "Bangla",
        "Korean",
        "Japanese",
        "Tamil",
        "Turkish",
      ],
      required: true,
    },

    hindiDubbed: { type: Boolean, required: true },
    englishDubbed: { type: Boolean, required: true },
  },
  { _id: false },
);

/* -------------------------------
   Episode Schema
-------------------------------- */
const episodeSchema = new Schema<TEpisode>(
  {
    id: {
      type: String,
      required: true,
    },

    episodeNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number,
      required: true,
    },

    video: {
      sources: {
        type: [videoSourceSchema],
        required: true,
      },
    },

    audio: {
      type: audioInfoSchema,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

/* -------------------------------
   Season Schema
-------------------------------- */
const seasonSchema = new Schema<TSeason>(
  {
    seasonNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
    },

    episodes: {
      type: [episodeSchema],
      default: [],
    },
  },
  { _id: false },
);

/* -------------------------------
   Series Main Schema
-------------------------------- */
const seriesSchema = new Schema<TSeriesData>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    industry: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    genres: {
      type: [String],
      required: true,
    },
    releaseDate: { type: String, required: true },

    thumbnail: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      required: true,
    },

    // ✅ Audio info for whole series
    audio: {
      type: audioInfoSchema,
      required: true,
    },

    // ✅ Seasons array
    seasons: {
      type: [seasonSchema],
      default: [],
    },

    imdbRating: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/* -------------------------------
   Series Model Export
-------------------------------- */
export const SeriesModel = model<TSeriesData>("Series", seriesSchema);
