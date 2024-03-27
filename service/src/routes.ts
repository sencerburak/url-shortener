import { Router } from "express";
import * as urlController from "./controllers/urlController";
import { url } from "inspector";

/**
 * Express router for handling URL shortening and redirection.
 */
const router = Router();

/**
 * Route for health check.
 * @name GET /health
 * @function
 */
router.get("/health", urlController.healthCheck);

/**
 * Route for listing all tables.
 * @name GET /list-tables
 * @function
 */
router.get("/list-tables", urlController.listTables);

/**
 * Route for shortening a URL.
 * @name POST /shorten
 * @function
 */
router.post("/shorten", urlController.shortenUrl);

/**
 * Route for redirecting to the original URL.
 * @name GET /:shortUrl
 * @function
 * @param {string} shortUrl - The shortened URL.
 */
router.get("/:shortUrl", urlController.redirectToOriginalUrl);

export default router;
