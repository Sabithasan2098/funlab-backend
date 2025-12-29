import { TVideoData } from "./video.interface";
import { videoModel } from "./video.model";

// post a video--------------------->
export const postVideoIntoDB = async (video: TVideoData) => {
  const result = await videoModel.create(video);
  return result;
};

// get all videos------------------->
export const getAllVideoFromDB = async () => {
  const result = await videoModel
    .find()
    .select(
      "name industry category genres thumbnail banner imdbRating screenshots"
    );
  return result;
};

// get single video by id----------->
export const getSingleVideoByIdFromDB = async (id: string) => {
  const result = await videoModel.findOne({ _id: id });
  return result;
};

// get single video by name-------->
export const getSingleVideoByNameFromDB = async (name: string) => {
  const result = await videoModel.findOne(
    {
      name: { $regex: `^${name}$`, $options: "i" },
    },
    {
      _id: 1,
      name: 1,
      industry: 1,
      category: 1,
      genres: 1,
      thumbnail: 1,
      banner: 1,
      imdbRating: 1,
      screenshots: 1,
    }
  );
  return result;
};

// get single video by category-------->
export const getVideoByCategoryFromDB = async (category: string) => {
  const result = await videoModel.aggregate([
    {
      $match: {
        category: {
          $regex: `^${category}$`,
          $options: "i",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        industry: 1,
        category: 1,
        genres: 1,
        thumbnail: 1,
        banner: 1,
        imdbRating: 1,
        screenshots: 1,
      },
    },
  ]);
  return result;
};
