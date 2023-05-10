import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = "ru-central-1";
const DOCUMENT_API_ENDPOINT = process.env.DOCUMENT_API_ENDPOINT;

export const ddbClient = new DynamoDBClient({
    region: REGION,
    endpoint: DOCUMENT_API_ENDPOINT
});

interface I_ITEMS_TABLE {
   ItemID: string;
   Maker: string;
   NameENG: string;
   NameRUS: string;
   DescriptionRUS: string;
   DescriptionENG: string;
   Rating: 1 | 2 | 3 | 4 | 5;
   Date: string;
   PriceRUB: number;
   PriceUSD: number;
   Keywords: string[];
}