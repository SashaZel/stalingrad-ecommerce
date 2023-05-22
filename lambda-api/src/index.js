import * as dotenv from "dotenv";
import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  PutItemCommand,
  GetItemCommand,
  BatchGetItemCommand,
} from "@aws-sdk/client-dynamodb";

// Config

dotenv.config();
const REGION = "ru-central-1";
const DOCUMENT_API_ENDPOINT = process.env.DOCUMENT_API_ENDPOINT;

export const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: DOCUMENT_API_ENDPOINT,
});

// Utils

const getItem = async ({ table, brand, itemID }) => {
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

export const getBatchItems = async ({ table, listItems }) => {
  const requestKeys = [];
  listItems.map((item) => {
    const [brand, id] = item.split("-");
    const requestElement = {
      Brand: { S: brand },
      ID: { N: id },
    };
    requestKeys.push(requestElement);
  });
  const params = {
    RequestItems: {
      [table]: {
        //AttributesToGet: ['Brand', 'ID', 'Stock'],
        Keys: requestKeys,
      },
    },
  };

  let data;
  try {
    data = await ddbClient.send(new BatchGetItemCommand(params));
  } catch (error) {
    console.error("Error @getBatchItems ", error);
  }
  return data;
};

// Routs of quarry

// Get stock single item

async function getStockSingleItem(requestItem) {
  const [brand, id] = requestItem.split("-");

  const getItemParams = {
    table: "ITEMS",
    brand: brand,
    itemID: id,
  };
  const getItemResponse = await getItem(getItemParams);

  if (!getItemResponse) return null;

  const responseData = {
    brand: brand,
    itemID: id,
    stock: getItemResponse?.Item?.Stock?.N || null,
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(responseData),
  };
}

async function getStockMultipleItems(requestMultipleItems) {
  const resultGetBatch = await getBatchItems({
    table: "ITEMS",
    listItems: requestMultipleItems,
  });
  const stockItemsList = resultGetBatch.Responses.ITEMS;

  if (!Array.isArray(stockItemsList)) return null;

  const stockItemsListUnmarshall = [];
  stockItemsList.forEach((e) => {
    stockItemsListUnmarshall.push({
      brand: e?.Brand?.S,
      itemID: e?.ID?.N,
      stock: e?.Stock?.N,
    });
  });

  const responseData = {
    items: stockItemsListUnmarshall,
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(responseData),
  };

  // console.log(resultGetBatch);
  // console.log(resultGetBatch.Responses.ITEMS);
  // // [
  // //   { Brand: { S: 'Stalingrad' }, ID: { N: '3221' }, Stock: { N: '12' } },
  // //   { Brand: { S: 'Stalingrad' }, ID: { N: '3222' }, Stock: { N: '12' } }
  // // ]
}

export async function handler(event, context) {
  const requestItem = event.queryStringParameters.item;
  //console.log(event.multiValueQueryStringParameters);
  const requestMultipleItems = event.multiValueQueryStringParameters.items;

  if (requestItem) {
    const result = await getStockSingleItem(requestItem);
    if (result) return result;
  }

  if (requestMultipleItems) {
    const result = await getStockMultipleItems(requestMultipleItems);
    if (result) return result;
  }

  return {
    statusCode: 400,
    headers: {
      "Content-Type": "text/plain",
    },
    isBase64Encoded: false,
    body: "Wrong request.",
  };
}

// export async function handler(event, context) {

//   const requestItem = event.queryStringParameters.item;
//   const [ brand, id ] = requestItem.split('-');

//   const getItemParams = {
//     table: "ITEMS",
//     brand: brand,
//     itemID: id,
//   };
//   const getItemResponse = await getItem(getItemParams);

//   const responseData = {
//     brand: brand,
//     itemID: id,
//     stock: getItemResponse?.Item?.Stock?.N || null
//   };

//   return {
//     statusCode: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     isBase64Encoded: false,
//     body: JSON.stringify(responseData),
//   };
// }
