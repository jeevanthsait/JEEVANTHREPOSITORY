import { NextFunction, Request, Response } from "express";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Not Found" });
}

// Define a type-safe error interface
interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";

  if (status >= 500) {
    console.error("[error]", err);
  }

  res.status(status).json({ error: message });
}
