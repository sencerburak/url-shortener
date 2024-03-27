/**
 * Handles URL-related operations such as shortening URLs, redirecting to original URLs, and listing DynamoDB tables.
 */

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { dynamoDbClient } from "../utils/dynamoDBClient";
import {
  ListTablesCommand,
  QueryCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  calculateTtl,
  generateShortUrl,
  getUrlWithProtocol,
} from "../utils/urlUtils";

const DYNAMODB_TABLE_NAME =
  process.env.DYNAMODB_TABLE_NAME ?? "url-shortener-mappings-table";

/**
 * Health check endpoint to verify the server is up and running.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON response indicating the server is up and running.
 */
export const healthCheck = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Server is up and running" });
});

/**
 * Retrieves a list of DynamoDB tables.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON response containing the list of DynamoDB tables or an error message.
 */
export const listTables = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = await dynamoDbClient.send(new ListTablesCommand({}));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to list DynamoDB tables" });
  }
});

/**
 * Shortens a given URL and returns the shortened URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON response containing the shortened URL or an error message.
 */
export const shortenUrl = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: Request, res: Response): Promise<any> => {
    const { url }: { url: string } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const fullUrl = getUrlWithProtocol(url);

    try {
      const existingUrlData = await dynamoDbClient.send(
        new QueryCommand({
          TableName: DYNAMODB_TABLE_NAME,
          IndexName: "OriginalUrlIndex",
          KeyConditionExpression: "originalUrl = :url",
          ExpressionAttributeValues: {
            ":url": { S: fullUrl },
          },
        }),
      );

      if (existingUrlData.Items && existingUrlData.Items.length > 0) {
        const existingShortUrl = existingUrlData.Items[0].shortUrl.S;
        return res.json({
          shortUrl: `${req.protocol}://${req.get("host")}/${existingShortUrl}`,
        });
      }

      const shortUrl = generateShortUrl();

      await dynamoDbClient.send(
        new PutItemCommand({
          TableName: DYNAMODB_TABLE_NAME,
          Item: {
            shortUrl: { S: shortUrl },
            originalUrl: { S: fullUrl },
            ttl: { N: calculateTtl().toString() },
          },
        }),
      );

      res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/${shortUrl}`,
      });
    } catch (error) {
      console.error("Error interacting with DynamoDB:", error);
      res.status(500).json({ error: "Failed to process short URL" });
    }
  },
);

/**
 * Redirects to the original URL associated with the given short URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A redirect response to the original URL or an error message.
 */
export const redirectToOriginalUrl = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: Request, res: Response): Promise<any> => {
    const { shortUrl } = req.params;

    try {
      const { Item } = await dynamoDbClient.send(
        new GetItemCommand({
          TableName: DYNAMODB_TABLE_NAME,
          Key: {
            shortUrl: { S: shortUrl },
          },
        }),
      );

      if (!Item || !Item.originalUrl?.S) {
        return res.status(404).send("URL not found");
      }

      await dynamoDbClient.send(
        new PutItemCommand({
          TableName: DYNAMODB_TABLE_NAME,
          Item: {
            shortUrl: { S: shortUrl },
            originalUrl: Item.originalUrl,
            lastAccessed: { N: `${Math.floor(Date.now() / 1000)}` },
            ttl: { N: `${calculateTtl()}` },
          },
        }),
      );

      res.redirect(Item.originalUrl.S);
    } catch (error) {
      console.error("Error retrieving or updating DynamoDB:", error);
      res.status(500).send("Internal server error");
    }
  },
);
