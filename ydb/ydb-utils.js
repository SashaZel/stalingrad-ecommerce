import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  PutItemCommand,
  UpdateItemCommand,
  GetItemCommand,
  BatchGetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { REGION, DOCUMENT_API_ENDPOINT } from "./constants.js";

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

export const createOrdersTable = async () => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "email", //ATTRIBUTE_NAME_1
        AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
        AttributeName: "date", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "email", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "date", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "ORDERS", //TABLE_NAME
  };

  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("ORDERS Table Created", data);
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

export const decrementStockByNumber = async (brand, ID, num) => {
  const params = {
    TableName: "ITEMS",
    Key: marshall({
      Brand: brand,
      ID: Number(ID),
    }),
    UpdateExpression: "SET Stock = Stock - :decr",
    ExpressionAttributeValues: marshall({
      ":decr": num,
    }),
    ReturnValues: "UPDATED_NEW",
  };
  let data;
  try {
    data = await ddbClient.send(new UpdateItemCommand(params));
  } catch (error) {
    console.error("@decrementStockByNumber() Error ", error);
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
