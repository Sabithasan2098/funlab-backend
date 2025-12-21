import { model, Schema } from "mongoose";
import { TVideoData } from "./video.interface";

const videoSchema = new Schema<TVideoData>(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    industry: { type: String },
    category: { type: String, required: true },
    genres: { type: String, required: true }, //ধরন
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

// videoSchema.pre("save", async function (next) {
//   if (this.id) {
//     return next();
//   }

//   const lastVideo = await Videos.findOne(
//     {},
//     { id: 1 },
//     { sort: { createdAt: -1 } }
//   );

//   let newId = "VID-0001";

//   if (lastVideo?.id) {
//     const lastNumber = Number(lastVideo.id.split("-")[1]);
//     newId = `VID-${String(lastNumber + 1).padStart(4, "0")}`;
//   }

//   this.id = newId;
//   next();
// });

export const videoModel = model<TVideoData>("Videos", videoSchema);
