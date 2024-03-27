import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from "./dynamoDBClient";

jest.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn().mockImplementation(() => ({
    config: { region: "mock-region" },
  })),
}));

describe("dynamoDbClient", () => {
  it("should create a new DynamoDB client", () => {
    expect(DynamoDBClient).toHaveBeenCalled();
  });

  it("should have the correct region", () => {
    expect(dynamoDbClient.config.region).toBe("mock-region");
  });
});
