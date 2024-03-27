/**
 * Express application instance.
 */
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import { CustomError } from "./types/types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

/**
 * Error handling middleware.
 * @param err - The error object.
 * @param _req - The request object.
 * @param res - The response object.
 * @param _next - The next function.
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const statusCode = (err as CustomError).statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

export default app;
