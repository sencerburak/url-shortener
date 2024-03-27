import app from "./app";
import request from "supertest";
import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
// import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

describe("Server", () => {
  let server: any;

  const ddbMock = mockClient(DynamoDBClient);

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    ddbMock.reset();
  });

  it("should return a 200 for the health check route", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });

  it("should return a short URL for a valid request", async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [
        {
          shortUrl: { S: "abc" },
          originalUrl: { S: "http://example.com" },
          ttl: { N: "123456" },
        },
      ],
    });

    const response = await request(app).post("/shorten").send({
      url: "http://example.com",
    });

    expect(response.status).toBe(200);
    expect(response.body.shortUrl.endsWith("/abc")).toBe(true);
  });

  it("should redirect to the original URL for a valid short URL", async () => {
    ddbMock.on(GetItemCommand).resolves({
      Item: {
        shortUrl: { S: "abc" },
        originalUrl: { S: "http://example.com" },
        ttl: { N: "123456" },
      },
    });

    const response = await request(app).get("/abc");
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("http://example.com");
  });
});
