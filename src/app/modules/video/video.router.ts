import express from "express";
import {
  getAllVideo,
  getVideoByCategory,
  getSingleVideoById,
  getSingleVideoByName,
  postVideo,
} from "./video.controller";
import {
  //   searchValidation,
  videoValidationWithZod,
} from "./video.zodValidation";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

router.post("/postVideo", validateRequest(videoValidationWithZod), postVideo);
router.get("/getVideos", getAllVideo);
router.get("/getVideo/:id", getSingleVideoById);
router.get(
  "/getVideo",
  //   validateRequest(searchValidation),
  getSingleVideoByName
);
router.get(
  "/getVideoByCategory",
  //   validateRequest(searchValidation),
  getVideoByCategory
);

export const videoRoutes = router;
