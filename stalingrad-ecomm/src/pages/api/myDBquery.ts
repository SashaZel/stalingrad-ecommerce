import type { NextApiRequest, NextApiResponse } from "next";
import { ddbClient } from "../../../lib/YDB-utils";
import { ListTablesCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const getListTables = async () => {
  try {
    const data = await ddbClient.send(new ListTablesCommand({}));
    console.log(data);
    // console.log(data.TableNames.join("\n"));
    return data;
  } catch (err) {
    console.error(err);
  }
};

const createItem = async () => {
  const newItem = {
    ItemID: "S-3042",
    Name: "Soviet Soldier"
  };
  const params = {
    TableName: "ITEMS",
    Item: marshall(newItem),
  };
  try {

    const result = await ddbClient.send(new PutItemCommand(params));
    console.log(result);
  } catch(error) {
    console.error('Err in API', error);
  }
};

const getItem = async(ItemID: string) => {
  const queryParams = {
    TableName: "ITEMS",
    Item: marshall({
      ItemID: ItemID
    })
  }
  try {

  } catch(error) {
    console.error('Error in API call getItem() ', error);
  }
}

type Data = {
  ok: boolean
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query);
  //console.log(process.env.DOCUMENT_API_ENDPOINT);
  //getListTables();
  //createItem();
  // const SQLq = req.query.SQLq as string;
  // res.status(200).json({ yourQuery: SQLq, DBanswer: "no answer yet" });
  res.status(200).json({ ok: true });
}
