import { TVideoData } from "./video.interface";
import { videoModel } from "./video.model";

// post a video--------------------->
export const postVideoIntoDB = async (video: TVideoData) => {
  const result = await videoModel.create(video);
  return result;
};
