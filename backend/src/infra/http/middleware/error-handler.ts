import { AppException } from "@shared/errors/errors";
import { Request, NextFunction, Response } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppException) {
    console.log("[errorHandler]:", err.message);
    return res.status(err.statusCode).json({
      error: {
        type: err.name,
        message: err.message,
      },
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: {
      type: "InternalServerError",
      message: "Internal server error",
    },
  });
}
