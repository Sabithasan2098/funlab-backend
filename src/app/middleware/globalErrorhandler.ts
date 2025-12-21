/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import app from "../../app";

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.json({
    success: false,
    message: "Something went wrong",
  });
  next();
});
