import type { NextApiRequest, NextApiResponse } from "next";
import { ddbClient } from "../../../lib/YDB-utils";
import { ListTablesCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const POSITIVE_RES_CREATE = {
  ok: true,
  message: "Successfully created item.",
};
const NEGATIVE_RES_CREATE = {
  ok: false,
  message: "Something went wrong...",
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    //const body = JSON.parse(event.body);
    const params = {
      TableName: req.body.TableName,
      Item: marshall(req.body.Item),
    };

    const result = await ddbClient.send(new PutItemCommand(params));
    //console.log(result.$metadata.httpStatusCode);
    const resultStatus = result?.$metadata?.httpStatusCode;
    res
      .status(resultStatus || 500)
      .json(resultStatus === 200 ? POSITIVE_RES_CREATE : NEGATIVE_RES_CREATE);
  } catch (error) {
    const errorMessage = "Err in API in createItem " + error;
    console.error(errorMessage);
    res
      .status(500)
      .json(NEGATIVE_RES_CREATE);
  }
};

type Data = {
  ok: boolean;
};

export default handler;