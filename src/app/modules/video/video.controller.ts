import { Request, Response } from "express";
import { postVideoIntoDB } from "./video.service";

export const postVideo = async (req: Request, res: Response) => {
  try {
    const data = req.body.videoData;
    const result = await postVideoIntoDB(data);
    res.status(200).json({
      success: true,
      message: "video successfully posted",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
