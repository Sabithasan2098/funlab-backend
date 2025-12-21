export type TVideoData = {
  id?: string;
  name: string;
  industry?: string;
  category: string;
  genres: string; //ধরন
  videoPath: string;
  thumbnail: string;
  banner: string;
  imdbRating?: string;
  screenshots?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
