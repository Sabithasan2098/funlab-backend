import { Request, Response } from "express";
import {
  getAllVideoFromDB,
  getVideoByCategoryFromDB,
  getSingleVideoByIdFromDB,
  postVideoIntoDB,
  addVideoSources,
  getRelatedVideosFromDB,
} from "./video.service";

// post a video-------------------------->
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
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// get all video------------------------->
export const getAllVideo = async (req: Request, res: Response) => {
  try {
    const result = await getAllVideoFromDB();
    res.status(200).json({
      success: true,
      message: "get all video successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// get single video---------------------->
export const getSingleVideoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getSingleVideoByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "get video successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

// // get video by name-------------------->
// export const getSingleVideoByName = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.search as string;

//     if (!searchTerm) {
//       res.status(400).json({
//         success: false,
//         message: "Search name is required",
//       });
//     }

//     const result = await getSingleVideoByNameFromDB(searchTerm);
//     res.status(200).json({
//       success: true,
//       message: "Get video successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "internal server is error",
//       errorThing: error,
//     });
//   }
// };

// get video by category-------------------->
export const getVideoByCategory = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.search as string;

    if (!searchTerm) {
      res.status(400).json({
        success: false,
        message: "Please fill this search term",
      });
    }

    const result = await getVideoByCategoryFromDB(searchTerm);
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "Get video successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "There was no videos",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server is error",
      errorThing: error,
    });
  }
};

export const updateVideoSourceController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { movieId } = req.params;
    const payload = req.body;

    const update = await addVideoSources(movieId, payload);

    res.status(200).json({
      success: true,
      message: "Video source update successfully",
      data: update,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// get related videos------------------------------>
export const getRelatedVideos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const related = await getRelatedVideosFromDB(id);
    res.status(200).json({
      success: true,
      message: "Video found successfully",
      data: related,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
