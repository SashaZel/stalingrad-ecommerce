import * as dotenv from "dotenv";
import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

dotenv.config({ path: "../stalingrad-ecomm/.env" });

const REGION = "ru-central-1";
const DOCUMENT_API_ENDPOINT = process.env.DOCUMENT_API_ENDPOINT;

export const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: DOCUMENT_API_ENDPOINT,
});

export const createItemsTable = async () => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "Brand", //ATTRIBUTE_NAME_1
        AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
        AttributeName: "ID", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "Brand", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "ID", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "ITEMS", //TABLE_NAME
  };

  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("ITEMS Table Created", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export async function getListTables() {
  try {
    const data = await ddbClient.send(new ListTablesCommand({}));
    //console.log(data);
    // console.log(data.TableNames.join("\n"));
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const describeTable = async (table) => {
  const params = { TableName: table }; //TABLE_NAME

  try {
    const data = await ddbClient.send(new DescribeTableCommand(params));
    // console.log("Success", data);
    // console.log("Success", data.Table.KeySchema);
    return data;
  } catch (err) {
    console.log("Error @describeTable ", err);
  }
};

export const putItem = async ({ table, brand, ID, stock }) => {
  const params = {
    TableName: table,
    Item: {
      Brand: { S: brand },
      ID: { N: String(ID) },
      Stock: { N: String(stock) },
    },
  };
  let data;
  try {
    data = await ddbClient.send(new PutItemCommand(params));
    // console.log("Put Item ", data);
  } catch (err) {
    console.error(err);
  }
  return data;
};

export const getItem = async ({ table, brand, itemID }) => {
  const params = {
    TableName: table, //TABLE_NAME
    Key: {
      Brand: { S: brand },
      ID: { N: String(itemID) },
    },
  };

  let data;
  try {
    data = await ddbClient.send(new GetItemCommand(params));
  } catch (error) {
    console.error("Error @getItem ", error);
  }
  return data;
};
