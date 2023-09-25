import { useAtom } from "jotai";
import { IStaticPathData, getStaticDataFromLocal, getStaticPathsFromLocalData } from "../../../../lib/local-items-data";
import { IItemLocalJSON } from "../../../../lib/types";
import Layout from "../../../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { cartAtom, countAtom } from "../../../../lib/store";
import { ISingleStock, useSingleStock } from "../../../../api/useSingleStock";
import { SingleStock } from "../../../../components/single-stock/SingleStock";
import styles from "./Item.module.css";
import Gallery from "../../../../components/gallery/Gallery";

export async function getStaticPaths() {
  const paths = await getStaticPathsFromLocalData();
  // console.log('Paths ', paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(pathData: IStaticPathData) {
  const currentEnv = process.env.CURRENT_ENV;
  //console.log("Current env", currentEnv);

  const itemData = await getStaticDataFromLocal(pathData.params.item);
  return {
    props: {
      itemData,
      currentEnv,
    },
  };
}

export default function Item({ itemData, currentEnv }: { itemData: IItemLocalJSON; currentEnv: "dev" | "prod" }) {
  const [count, setCount] = useAtom(countAtom);
  const catName = itemData.catNameRUS || itemData.catName;

  // console.log( 'Item DAta', itemData)
  return (
    <Layout>
      <Head>
        <title>{itemData.id}</title>
        <meta property="og:title" content={`Stalingrad ${itemData.id}`} />
        <meta property="og:description" content={`"${catName}"`} />
        <meta property="og:url" content={`https://stalingrad-diorama.ru/items/${itemData.id}/`} />
      </Head>
      <section className="container">
        <p className={styles.breadcrumbs}>
          <Link className={styles.breadcrumb} href="/">
            Главная &gt;
          </Link>
          <Link className={styles.breadcrumb} href="/items/all/1/">
            Все товары &gt;
          </Link>
          <Link className={styles.breadcrumb} href={`/items/${itemData.id}`}>
            {itemData.id}
          </Link>
        </p>
        <div className={styles.content}>
          <Gallery itemData={itemData} />
          <div className={styles.contentRight}>
            
            <h1 className={styles.contentHeader}><span className={styles.contentID}>{itemData.id}</span><br />{catName}</h1>
            <SingleStock
              itemID={itemData.id}
              catName={itemData.catName}
              currentEnv={currentEnv}
              priceRUB={itemData.prices.priceRetailRUB}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

// export default function Item({ itemData }) {
//   return <>This is item in catalogue {itemData.ItemID}</>;
// }

// import { QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
// import { ddbClient } from "../../../lib/YDB-utils";
// import { unmarshall } from "@aws-sdk/util-dynamodb";
// import { GetStaticPaths, GetStaticProps } from "next";
// import { allDataFromDB } from "../../../lib/YDB-all-items";

// interface IItem {
//   item: string;
// }

// interface IParams {
//   params: IItem;
// }

// // async function getAllDataFromDB() {
// //   const requestParams = {
// //     TableName: "ITEMS",
// //     ProjectionExpression: "ItemID",
// //     Select: "ALL_ATTRIBUTES",
// //   };
// //   const result = await ddbClient.send(new ScanCommand(requestParams));
// //   if (!result.Items) {
// //     console.error("error in scan DynamoDB");
// //     return;
// //   }
// //   const unmarshItemsList = result.Items.map((item) => unmarshall(item));
// //   console.log(unmarshItemsList);
// //   return unmarshItemsList;
// // }

// // const allDataFromDB = getAllDataFromDB();

// export const getStaticPaths: GetStaticPaths = async () => {
//   // const paths: IParams[] = [
//   //   {
//   //     params: {
//   //       item: "1101",
//   //     },
//   //   },
//   //   {
//   //     params: {
//   //       item: "1102",
//   //     },
//   //   },
//   // ];
//   // fetch all items from DB
//   const result = await allDataFromDB;
//   if (!result) {
//     return {
//       paths: [
//         {
//           params: {
//             item: "error",
//           },
//         },
//       ],
//       fallback: false,
//     };
//   }
//   const paths = result.map((itemFromResult) => {
//     return {
//       params: {
//         item: itemFromResult.ItemID,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<{ itemData: IParams }> = async ({
//   params,
// }) => {
//   const result = await allDataFromDB;
//   if (!result) return;
//   const itemData =  result.find((item) => item.ItemID === params.item);
//   return {
//     props: {
//       itemData,
//     },
//   };
// };

// export default function Item({ itemData }) {
//   return <>This is item in catalogue {itemData.ItemID}</>;
// }
