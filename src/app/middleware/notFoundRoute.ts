import { Request, Response } from "express";
import app from "../../app";

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});
