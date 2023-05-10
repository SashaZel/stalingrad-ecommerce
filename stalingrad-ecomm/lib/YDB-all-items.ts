import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./YDB-utils";

async function getAllDataFromDB() {
  const requestParams = {
    TableName: "ITEMS",
    Select: "ALL_ATTRIBUTES",
  };
  const result = await ddbClient.send(new ScanCommand(requestParams));
  if (!result.Items) {
    console.error("error in scan DynamoDB");
    return;
  }
  const unmarshItemsList = result.Items.map((item) => unmarshall(item));
  console.log(unmarshItemsList);
  return unmarshItemsList;
}

export const allDataFromDB = getAllDataFromDB();