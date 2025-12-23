import { RequestHandler } from "express";
import type { ZodObject } from "zod";

export const validateRequest = (validation: ZodObject): RequestHandler => {
  return async (req, res, next) => {
    try {
      await validation.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
