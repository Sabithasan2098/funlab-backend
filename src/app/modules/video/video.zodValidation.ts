import z from "zod";

const videoSourceValidation = z.object({
  resolution: z.enum(["480", "720", "1080", "4k"]),
  url: z.string().url(),
  sizeMB: z.number(),
});

const videoTypeValidation = z.object({
  sources: z.array(videoSourceValidation),
  duration: z.number().positive(),
});

export const videoValidationWithZod = z.object({
  videoData: z.object({
    id: z.string().min(1, "Id is required"),
    name: z.string().min(1, "Name is required"),
    fullName: z.string().min(1, "Full name is required"),
    description: z.string().optional(),

    industry: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    genres: z.array(z.string()).min(1, "At least one genre required"),

    releaseYear: z.number().int().optional(),
    language: z.array(z.string()).optional(),

    video: videoTypeValidation,

    thumbnail: z.string().url(),
    banner: z.string().url(),
    screenshots: z.array(z.string().url()).optional(),

    imdbRating: z.number().min(0).max(10).optional(),

    tv: z.boolean(),
    comic: z.boolean(),
    dualAudio: z.boolean(),
    hindiDubbed: z.boolean(),
    web: z.boolean(),
    oscar: z.boolean(),

    views: z.number().int().nonnegative().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const searchValidation = z.object({
  name: z.string().trim().min(1),
});

export const videoSourceUpdateSchema = z.object({
  resolution: z.enum(["480", "720", "1080", "4k"]),
  url: z.string().url(),
  sizeMB: z.number().positive(),
});

export const videoUpdateSchemaWithZod = z.object({
  sources: videoSourceUpdateSchema,
  duration: z.number().positive().optional(),
});
