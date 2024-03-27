import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

/**
 * The AWS region to use for the DynamoDB client.
 * Defaults to "eu-west-1" if not provided in the environment variables.
 */
const REGION = process.env.AWS_REGION ?? "eu-west-1";

/**
 * The DynamoDB client instance.
 */
export const dynamoDbClient = new DynamoDBClient({ region: REGION });
