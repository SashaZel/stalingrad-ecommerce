import { QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../lib/YDB-utils";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetStaticPaths, GetStaticProps } from "next";
import { allDataFromDB } from "../../../lib/YDB-all-items";

interface IItem {
  item: string;
}

interface IParams {
  params: IItem;
}

// async function getAllDataFromDB() {
//   const requestParams = {
//     TableName: "ITEMS",
//     ProjectionExpression: "ItemID",
//     Select: "ALL_ATTRIBUTES",
//   };
//   const result = await ddbClient.send(new ScanCommand(requestParams));
//   if (!result.Items) {
//     console.error("error in scan DynamoDB");
//     return;
//   }
//   const unmarshItemsList = result.Items.map((item) => unmarshall(item));
//   console.log(unmarshItemsList);
//   return unmarshItemsList;
// }

// const allDataFromDB = getAllDataFromDB();

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths: IParams[] = [
  //   {
  //     params: {
  //       item: "1101",
  //     },
  //   },
  //   {
  //     params: {
  //       item: "1102",
  //     },
  //   },
  // ];
  // fetch all items from DB
  const result = await allDataFromDB;
  if (!result) {
    return {
      paths: [
        {
          params: {
            item: "error",
          },
        },
      ],
      fallback: false,
    };
  }
  const paths = result.map((itemFromResult) => {
    return {
      params: {
        item: itemFromResult.ItemID,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ itemData: IParams }> = async ({
  params,
}) => {
  const result = await allDataFromDB;
  if (!result) return;
  const itemData =  result.find((item) => item.ItemID === params.item);
  return {
    props: {
      itemData,
    },
  };
};

export default function Item({ itemData }) {
  return <>This is item in catalogue {itemData.ItemID}</>;
}
