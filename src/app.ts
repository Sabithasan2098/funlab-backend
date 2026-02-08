import express, { Response, Request } from "express";
import cors from "cors";
import { videoRoutes } from "./app/modules/video/video.router";
import { seriesVideoRoutes } from "./app/modules/series/series.route";
const app = express();

// parser
app.use(express.json());
app.use(cors());

// application router
//
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/seriesVideos", seriesVideoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("I am coming my dear publics");
});

export default app;
