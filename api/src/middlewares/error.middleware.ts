import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err &&
    err.status &&
    err.status === 401 &&
    err.code &&
    err.code === "credentials_required"
  ) {
    res.status(err.status).json({ message: "Requires authentication" });

    return;
  }

  if (err && err.status && err.status === 401) {
    res.status(err.status).json({ message: "Bad credentials" });

    return;
  }

  const status = err.statusCode || err.code || 500;
  const message = err.message || "internal error";

  res.status(status).json({ message });
};
