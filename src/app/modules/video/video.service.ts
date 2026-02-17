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
      "id name thumbnail banner imdbRating releaseYear category genres language hindiDubbed dualAudio",
    );
  return result;
};

// get single video by id----------->
export const getSingleVideoByIdFromDB = async (id: string) => {
  const result = await videoModel.findOne({ id: id });
  return result;
};

// get single video by name-------->
// export const getSingleVideoByNameFromDB = async (name: string) => {
//   const result = await videoModel.findOne({
//     name: { $regex: `^${name}$`, $options: "i" },
//   });
//   return result;
// };

// get single video by category-------->
export const getVideoByIndustryFromDB = async (
  industry: string,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const result = await videoModel.aggregate([
    {
      $match: {
        industry: {
          $regex: `^${industry}$`,
          $options: "i",
        },
      },
    },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        id: 1,
        name: 1,
        thumbnail: 1,
        imdbRating: 1,
        releaseYear: 1,
        language: 1,
        dualAudio: 1,
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

// get related------------------------------------->

export const getRelatedVideosFromDB = async (movieId: string) => {
  const current = await videoModel.findOne({ id: movieId });

  if (!current) {
    throw new Error("Video not found");
  }

  const related = await videoModel
    .find({
      id: { $ne: movieId },
      $or: [
        { genres: { $in: current.genres } },
        { category: current.category },
        { industry: current.industry },
      ],
    })
    .select("id fullName banner name description")
    .limit(10)
    .sort({ imdbRating: -1 });
  return related;
};
