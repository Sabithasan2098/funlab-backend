import express from "express";
import { postVideo } from "./video.controller";
import { videoValidationWithZod } from "./video.zodValidation";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

router.post("/postVideo", validateRequest(videoValidationWithZod), postVideo);

export const videoRoutes = router;
