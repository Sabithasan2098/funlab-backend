import express, { Response, Request } from "express";
import cors from "cors";
const app = express();

// parser
app.use(express.json());
app.use(cors());

// router
const movieRouter = express.Router();
app.use("/api/v1/videos", movieRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("I am coming my dear publics");
});

export default app;
