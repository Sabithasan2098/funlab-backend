import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  seriesSchemaValidation,
  updateSeriesValidation,
} from "./series.zodvalidation";
import {
  addEpisode,
  addSeason,
  addVideoSource,
  getAllSeriesVideo,
  getSeriesVideoByCategory,
  getSingleSeriesVideoById,
  getSingleVideoOnSearch,
  postSeriesVideo,
} from "./series.controller";

const router = express.Router();

router.post(
  "/postSeriesVideo",
  validateRequest(seriesSchemaValidation),
  postSeriesVideo,
);
router.get("/getAllSeriesVideos", getAllSeriesVideo);
router.get("/getSeriesVideo/:id", getSingleSeriesVideoById);
router.get(
  "/getSingleVideoOnSearch",
  //   validateRequest(searchValidation),
  getSingleVideoOnSearch,
);
router.get(
  "/getSeriesVideoByCategory",
  //   validateRequest(searchValidation),
  getSeriesVideoByCategory,
);

// 1. Add Season
router.patch(
  "/:seriesId/add-season",
  validateRequest(updateSeriesValidation),
  addSeason,
);

// 2. Add Episode
router.patch(
  "/:seriesId/:seasonNumber/add-episode",
  validateRequest(updateSeriesValidation),
  addEpisode,
);

// 3. Add Video Source (Resolution Add)
router.patch(
  "/:seriesId/:seasonNumber/:episodeId/add-source",
  validateRequest(updateSeriesValidation),
  addVideoSource,
);

export const seriesVideoRoutes = router;
