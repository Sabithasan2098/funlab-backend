import express from "express";
import {
  getAllVideo,
  getVideoByCategory,
  getSingleVideoById,
  postVideo,
  updateVideoSourceController,
  getRelatedVideos,
} from "./video.controller";
import {
  videoUpdateSchemaWithZod,
  //   searchValidation,
  videoValidationWithZod,
} from "./video.zodValidation";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

router.post("/postVideo", validateRequest(videoValidationWithZod), postVideo);
router.get("/getVideos", getAllVideo);
router.get("/getVideo/:id", getSingleVideoById);
// router.get(
//   "/getVideo",
//   //   validateRequest(searchValidation),
//   getSingleVideoByName,
// );
router.get(
  "/getVideoByCategory",
  //   validateRequest(searchValidation),
  getVideoByCategory,
);
router.patch(
  "/video/source/:movieId",
  validateRequest(videoUpdateSchemaWithZod),
  updateVideoSourceController,
);

// get related------------------------->
router.get("/video/:id/related", getRelatedVideos);

export const videoRoutes = router;
