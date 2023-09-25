import Link from "next/link";
import { useBatchStock } from "../../../../../api/useBatchStock";
import { StockInList } from "../../../../../components/stock-in-list/StockInList";
import {
  allCatPaginated,
  getStaticDataFromLocal,
  getStaticPathsFromLocalData,
} from "../../../../../lib/local-items-data";
import { IItemDataLimited } from "../../../../../lib/types";
import { paginateArray } from "../../../../../lib/utils";
import Head from "next/head";
import Layout from "../../../../../components/layout";
import { ItemCard } from "../../../../../components/item-card/ItemCard";
import { PaginationNav } from "../../../../../components/pagination-nav/PaginationNav";
import styles from "../../../../styles/ShopListLayout.module.css";

interface IAllItemsPageProps {
  currentItemsData: IItemDataLimited[];
  currentPage: number;
  totalPages: number;
  currentEnv: "dev" | "prod";
}

export async function getStaticPaths() {
  const rawPaths = await allCatPaginated;
  const paths = Array.from(rawPaths, (_, i) => String(i + 1)).map((e) => {
    return {
      params: {
        page: e,
      },
    };
  });

  //console.log("Paths ", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(pathData: { params: { page: string } }) {
  const currentEnv = process.env.CURRENT_ENV;
  const rawPaths = await allCatPaginated;
  const currentItems = rawPaths[Number(pathData.params.page) - 1];
  if (!currentItems || !Array.isArray(currentItems)) {
    throw new Error("@ items > all > [page] @getStaticProps() wrong page format or name");
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
    },
  };
}

export default function AllItemsPage({ currentItemsData, currentPage, totalPages, currentEnv }: IAllItemsPageProps) {
  const idList = currentItemsData.map((item) => item.id);
  const { data, isLoading, isError } = useBatchStock(idList, currentEnv);

  const pageTitle = `All items: Page-${currentPage}`;
  const catPreview = currentItemsData.map((item) => (
    <ItemCard key={item.id} item={item} data={data} isLoading={isLoading} isError={isError} />
  ));

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <section className="container">
        <div className={styles.container}>{catPreview}</div>
        <PaginationNav currentPage={currentPage} totalPages={totalPages} linkPredicate="/items/all/" />
      </section>
    </Layout>
  );
}
