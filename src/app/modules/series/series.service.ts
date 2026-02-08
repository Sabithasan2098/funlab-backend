import { videoModel } from "../video/video.model";
import {
  TEpisode,
  TSeason,
  TSeriesData,
  TVideoSource,
} from "./series.interface";
import { SeriesModel } from "./series.model";

// post a video--------------------->
export const postSeriesVideoIntoDB = async (video: TSeriesData) => {
  const result = await SeriesModel.create(video);
  return result;
};

// get all videos------------------->
export const getAllSeriesVideoFromDB = async () => {
  const result = await SeriesModel.find().select(
    "id name thumbnail banner imdbRating releaseDate audio.originalLanguage audio.hindiDubbed audio.englishDubbed",
  );
  return result;
};

// get single video by id----------->
export const getSingleSeriesVideoByIdFromDB = async (id: string) => {
  const result = await SeriesModel.findOne({ id: id });
  return result;
};

// get single video by name for every model-------->
export const searchWithFallback = async (query: string) => {
  const regex = new RegExp(query, "i");

  // ✅ Step 1: Search in Movie first
  const movies = await videoModel.find({
    $or: [{ name: regex }, { fullName: regex }, { genres: regex }],
  });

  // ✅ If movie found, return immediately
  if (movies.length > 0) {
    return {
      type: "movie",
      data: movies,
    };
  }

  // ✅ Step 2: If no movie found → Search in Series
  const series = await SeriesModel.find({
    $or: [{ name: regex }, { fullName: regex }, { genres: regex }],
  });

  // ✅ If series found
  if (series.length > 0) {
    return {
      type: "series",
      data: series,
    };
  }

  // ✅ Nothing found
  return {
    type: "none",
    data: [],
  };
};

// get single video by category-------->
export const getSeriesVideoByCategoryFromDB = async (category: string) => {
  const result = await SeriesModel.aggregate([
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
        id: 1,
        name: 1,
        fullName: 1,
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

// ************************update video source---------------------------->

/* -----------------------------
   1. Add New Season
------------------------------ */
export const addSeasonIntoSeries = async (
  seriesId: string,
  newSeason: TSeason,
) => {
  const result = await SeriesModel.findOneAndUpdate(
    { id: seriesId },
    {
      $push: { seasons: newSeason },
    },
    { new: true },
  );

  return result;
};

/* -----------------------------
   2. Add Episode Into Season
------------------------------ */
export const addEpisodeIntoSeason = async (
  seriesId: string,
  seasonNumber: number,
  newEpisode: TEpisode,
) => {
  const result = await SeriesModel.findOneAndUpdate(
    {
      id: seriesId,
      "seasons.seasonNumber": seasonNumber,
    },
    {
      $push: {
        "seasons.$.episodes": newEpisode,
      },
    },
    { new: true },
  );

  return result;
};

/* -----------------------------
   3. Add Video Source Into Episode
   (Dynamic resolution add)
------------------------------ */
export const addVideoSourceIntoEpisode = async (
  seriesId: string,
  seasonNumber: number,
  episodeId: string,
  newSource: TVideoSource,
) => {
  const result = await SeriesModel.findOneAndUpdate(
    {
      id: seriesId,
    },
    {
      // ✅ Prevent duplicate source
      $addToSet: {
        "seasons.$[s].episodes.$[e].video.sources": newSource,
      },
    },
    {
      new: true,
      arrayFilters: [{ "s.seasonNumber": seasonNumber }, { "e.id": episodeId }],
    },
  );

  return result;
};
