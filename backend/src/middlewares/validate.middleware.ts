import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { sendError } from "../utils/apiResponse";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      const message = result.error.errors[0]?.message || "Validation failed";
      return sendError(res, 400, message);
    }

    req.body = result.data.body || req.body;
    req.query = result.data.query || req.query;
    req.params = result.data.params || req.params;

    return next();
  };
