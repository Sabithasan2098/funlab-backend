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
  tv: boolean;
  comic: boolean;
  dualAudio: boolean;
  hindiDubbed: boolean;
  web: boolean;
  oscar: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
