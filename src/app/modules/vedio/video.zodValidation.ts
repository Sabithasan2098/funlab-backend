import z from "zod";

export const videoValidationWithZod = z.object({
  body: z.object({
    name: z.string().trim(),
    industry: z.string().trim(),
    category: z.string().trim(),
    genres: z.string().trim(), //ধরন
    videoPath: z.string().trim().url(),
    thumbnail: z.string().trim().url(),
    banner: z.string().trim().url(),
    imdbRating: z.string().trim(),
    screenshots: z.array(z.string().trim().url()).optional(),
  }),
});
