import z from "zod";

export const videoValidationWithZod = z.object({
  videoData: z.object({
    name: z.string().trim(),
    industry: z.string().trim(),
    category: z.string().trim(),
    genres: z.array(z.string().trim()), //ধরন
    videoPath: z.string().trim().url(),
    thumbnail: z.string().trim().url(),
    banner: z.string().trim().url(),
    imdbRating: z.string().trim(),
    screenshots: z.array(z.string().trim().url()).optional(),
    tvWeb: z.boolean(),
    comic: z.boolean(),
    dualAudio: z.boolean(),
    hindiDubbed: z.boolean(),
    web: z.boolean(),
    oscar: z.boolean(),
  }),
});

export const searchValidation = z.object({
  name: z.string().trim().min(1),
});
