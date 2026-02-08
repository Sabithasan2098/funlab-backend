export type TLanguage =
  | "English"
  | "Hindi"
  | "Bangla"
  | "Korean"
  | "Japanese"
  | "Tamil"
  | "Turkish";

export type TAudioInfo = {
  originalLanguage: TLanguage; // ✅ main language
  hindiDubbed: boolean;
  englishDubbed: boolean;
};

export type TVideoSource = {
  resolution: "480" | "720" | "1080" | "4k";
  url: string;
  sizeMB: number;
};

export type TEpisode = {
  id: string;

  episodeNumber: number;
  title: string;

  description?: string;
  duration: number;

  video: {
    sources: TVideoSource[];
  };

  audio: TAudioInfo; // ✅ added here

  thumbnail: string;
};

export type TSeason = {
  seasonNumber: number;
  title?: string;

  episodes: TEpisode[];
};

export type TSeriesData = {
  id: string;

  name: string;
  fullName: string;

  description?: string;

  industry: string;
  category: string;
  genres: string[];
  releaseDate: string;

  thumbnail: string;
  banner: string;

  // ✅ Language system for whole series
  audio: TAudioInfo;

  seasons: TSeason[];

  imdbRating?: number;
  views?: number;

  createdAt?: string;
  updatedAt?: string;
};

// ******  example data for series *********
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const series: TSeriesData = {
  id: "s1",
  name: "Squid Game",
  fullName: "Squid Game Season Series",

  industry: "Korean",
  category: "Thriller",
  genres: ["Action", "Drama"],
  releaseDate: "2009",

  thumbnail: "/thumb.jpg",
  banner: "/banner.jpg",
  imdbRating: 8.7,

  audio: {
    originalLanguage: "Korean",
    hindiDubbed: true,
    englishDubbed: true,
  },

  seasons: [
    {
      seasonNumber: 1,
      episodes: [
        {
          id: "ep1",
          episodeNumber: 1,
          title: "Red Light Green Light",
          duration: 3200,

          video: {
            sources: [
              { resolution: "720", url: "...", sizeMB: 500 },
              { resolution: "1080", url: "...", sizeMB: 900 },
            ],
          },

          audio: {
            originalLanguage: "Korean",
            hindiDubbed: true,
            englishDubbed: true,
          },

          thumbnail: "/ep1.jpg",
        },
      ],
    },
  ],
};
