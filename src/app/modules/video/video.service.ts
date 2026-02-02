import { TVideoData } from "./video.interface";
import { videoModel } from "./video.model";
import { videoUpdateSchemaWithZod } from "./video.zodValidation";

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
      "name thumbnail banner imdbRating releaseYear category genres language hindiDubbed dualAudio",
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
    },
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

// update video source---------------------------->

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addVideoSources = async (movieId: string, payload: any) => {
  const validateData = videoUpdateSchemaWithZod.parse(payload);
  const findVideo = await videoModel.findOne({ _id: movieId });
  if (!findVideo) {
    throw new Error(`Movie with ID "${movieId}" not found`);
  }
  const exists = findVideo.video.sources.find(
    (s) => s.resolution === validateData.sources.resolution,
  );

  if (exists) {
    throw new Error(
      `Source with resolution "${validateData.sources.resolution}" already exists`,
    );
  }

  findVideo.video.sources.push(validateData.sources);

  if (validateData.duration) findVideo.video.duration = validateData.duration;

  await findVideo.save();
  return findVideo;
};
