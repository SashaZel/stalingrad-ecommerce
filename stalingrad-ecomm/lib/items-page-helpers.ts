import { appData, getStaticDataFromLocal } from "./local-items-data";
import { IItemDataLimited } from "./types";

export async function getStaticPathsHelper(pageKey: string | number) {
  const app = await appData;
  const rawPaths = app[pageKey].itemsPaginated;
  if (!rawPaths) {
    throw new Error(`@${pageKey} no page data`);
  }
  const paths = Array.from(rawPaths, (_, i) => String(i + 1)).map((e) => {
    return {
      params: {
        page: e,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticPropsHelper(pageKey: string | number, pathData: { params: { page: string } }) {
  let currentEnv = process.env.CURRENT_ENV || "dev";
  const app = await appData;
  const rawPaths = app[pageKey].itemsPaginated;
  if (!rawPaths) {
    throw new Error(`@${pageKey} no page data`);
  }
  const currentItems = rawPaths[Number(pathData.params.page) - 1];
  if (!currentItems || !Array.isArray(currentItems)) {
    throw new Error(`@ items ${pageKey} [page] @getStaticProps() wrong page format or name`);
  }
  const currentItemsData = [];
  for (let i = 0; i < currentItems.length; i++) {
    const itemData = await getStaticDataFromLocal(currentItems[i]);
    const itemDataLimited: IItemDataLimited = {
      id: itemData.id,
      catName: itemData.catName,
      catNameRUS: itemData.catNameRUS,
      prices: {
        priceRetailRUB: itemData.prices.priceRetailRUB,
      },
      previewPicture: itemData.pictures[0].previewSize,
    };
    currentItemsData.push(itemDataLimited);
  }
  return {
    props: {
      currentItemsData,
      currentPage: Number(pathData.params.page),
      totalPages: rawPaths.length,
      currentEnv,
      headerRUS: app[pageKey].headerRUS,
      route: app[pageKey].route,
    },
  };
}
