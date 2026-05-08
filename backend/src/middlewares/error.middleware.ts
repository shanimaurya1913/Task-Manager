import { ErrorRequestHandler } from "express";
import { sendError } from "../utils/apiResponse";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Something went wrong on the server" : err.message;

  return sendError(res, statusCode, message);
};
