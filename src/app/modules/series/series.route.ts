import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { seriesSchemaValidation } from "./series.zodvalidation";
import {
  addEpisode,
  addSeason,
  addVideoSource,
  getAllSeriesVideo,
  getSeriesVideoByCategory,
  getSingleSeriesVideoById,
  getSingleVideoByName,
  postSeriesVideo,
} from "./series.controller";

const router = express.Router();

router.post(
  "/postSeriesVideo",
  validateRequest(seriesSchemaValidation),
  postSeriesVideo,
);
router.get("/getSeriesVideos", getAllSeriesVideo);
router.get("/getSeriesVideo/:id", getSingleSeriesVideoById);
router.get(
  "/getSeriesVideo",
  //   validateRequest(searchValidation),
  getSingleVideoByName,
);
router.get(
  "/getSeriesVideoByCategory",
  //   validateRequest(searchValidation),
  getSeriesVideoByCategory,
);

/* -----------------------------
          Add Field Routes
------------------------------ */

// 1. Add Season
router.patch("/:seriesId/add-season", addSeason);

// 2. Add Episode
router.patch("/:seriesId/:seasonNumber/add-episode", addEpisode);

// 3. Add Video Source (Resolution Add)
router.patch("/:seriesId/:seasonNumber/:episodeId/add-source", addVideoSource);

export const seriesVideoRoutes = router;
