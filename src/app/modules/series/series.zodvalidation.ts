import z from "zod";

const videoSourceSchemaValidation = z.object({
  resolution: z.enum(["480", "720", "1080", "4k"]),
  url: z.string().min(1, "Url field is required"),
  sizeMB: z.number().min(1, "SizeMB field is required"),
});

const audioInfoSchemaValidation = z.object({
  originalLanguage: z.enum([
    "English",
    "Hindi",
    "Bangla",
    "Korean",
    "Japanese",
    "Tamil",
    "Turkish",
  ]),
  dubbedLanguage: z.string(),
});

const episodeSchemaValidation = z.object({
  id: z.string().min(3, "Id field is required"),
  episodeNumber: z.number().min(1, "Episode field is required"),

  title: z.string().min(1, "Title field is required"),

  description: z.string().optional(),

  duration: z.number().min(1, "Duration field is required"),

  video: z.object({
    sources: z
      .array(videoSourceSchemaValidation)
      .min(1, "Source field is required"),
  }),

  audio: audioInfoSchemaValidation,

  thumbnail: z.string().min(1, "Thumbnail field is required").url(),

  releaseDate: z.string().optional(),
});

const seasonSchemaValidation = z.object({
  seasonNumber: z.number().min(1, "Season field is required"),
  title: z.string().optional(),
  episodes: z
    .array(episodeSchemaValidation)
    .min(1, "Episode field is required"),
});

export const seriesSchemaValidation = z.object({
  id: z.string().min(1, "Id field is required"),

  name: z.string().min(1, "Name field is required"),

  fullName: z.string().min(1, "Full name field is required"),

  description: z.string().optional(),

  industry: z.string().min(1, "Industry field is required"),

  category: z.string().min(1, "Category field is required"),

  genres: z.array(z.string()).min(1, "Genres field is required"),

  thumbnail: z.string().min(1, "Thumbnail field is required").url(),

  banner: z.string().min(1, "Banner field is required").url(),

  // ✅ Audio info for whole series
  audio: audioInfoSchemaValidation,

  // ✅ Seasons array
  seasons: z.array(seasonSchemaValidation).min(1, "Season field is required"),

  imdbRating: z.number(),

  views: z.number(),
});
