import { Request, Response } from "express";
import {
  addEpisodeIntoSeason,
  addSeasonIntoSeries,
  addVideoSourceIntoEpisode,
  getAllSeriesVideoFromDB,
  getSeriesVideoByCategoryFromDB,
  getSingleSeriesVideoByIdFromDB,
  postSeriesVideoIntoDB,
  searchWithFallback,
} from "./series.service";

// post a video-------------------------->
export const postSeriesVideo = async (req: Request, res: Response) => {
  try {
    const { seriesData } = req.body;
    const result = await postSeriesVideoIntoDB(seriesData);
    res.status(200).json({
      success: true,
      message: "video successfully posted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// get all video------------------------->
export const getAllSeriesVideo = async (req: Request, res: Response) => {
  try {
    const result = await getAllSeriesVideoFromDB();
    res.status(200).json({
      success: true,
      message: "get all video successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// get single video---------------------->
export const getSingleSeriesVideoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getSingleSeriesVideoByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "get video successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// // get video by name-------------------->
export const getSingleVideoByName = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.search as string;

    if (!searchTerm) {
      res.status(400).json({
        success: false,
        message: "Search name is required",
      });
    }

    const result = await searchWithFallback(searchTerm);
    res.status(200).json({
      success: true,
      message: "Get video successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// get video by category-------------------->
export const getSeriesVideoByCategory = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.search as string;

    if (!searchTerm) {
      res.status(400).json({
        success: false,
        message: "Please fill this search term",
      });
    }

    const result = await getSeriesVideoByCategoryFromDB(searchTerm);
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "Get video successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "There was no videos",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

/* -----------------------------
   Add Season Controller
------------------------------ */
export const addSeason = async (req: Request, res: Response) => {
  try {
    const { seriesId } = req.params;
    const { newSeason } = req.body;

    const result = await addSeasonIntoSeries(seriesId, newSeason);

    res.status(200).json({
      success: true,
      message: "Season added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add season",
      error,
    });
  }
};

/* -----------------------------
   Add Episode Controller
------------------------------ */
export const addEpisode = async (req: Request, res: Response) => {
  try {
    const { seriesId, seasonNumber } = req.params;
    const episodeData = req.body;

    const result = await addEpisodeIntoSeason(
      seriesId,
      Number(seasonNumber),
      episodeData,
    );

    res.status(200).json({
      success: true,
      message: "Episode added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add episode",
      error,
    });
  }
};

/* -----------------------------
   Add Video Source Controller
------------------------------ */
export const addVideoSource = async (req: Request, res: Response) => {
  try {
    const { seriesId, seasonNumber, episodeId } = req.params;
    const { newSource } = req.body;

    const result = await addVideoSourceIntoEpisode(
      seriesId,
      Number(seasonNumber),
      episodeId,
      newSource,
    );

    res.status(200).json({
      success: true,
      message: "Video source added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add video source",
      error,
    });
  }
};
