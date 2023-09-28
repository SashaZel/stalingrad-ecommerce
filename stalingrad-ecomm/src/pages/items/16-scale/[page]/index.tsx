import Head from "next/head";
import { IItemsPageProps } from "../../../../../lib/types";
import Layout from "../../../../../components/layout/layout";
import { ItemsPage } from "../../../../../components/items-page/ItemsPage";
import { getStaticPathsHelper, getStaticPropsHelper } from "../../../../../lib/items-page-helpers";

const PAGE_KEY = "scaleSixteen";

export async function getStaticPaths() {
  return getStaticPathsHelper(PAGE_KEY);
}

export async function getStaticProps(pathData: { params: { page: string } }) {
  return getStaticPropsHelper(PAGE_KEY, pathData);
}

export default function Page(props: IItemsPageProps) {
  const pageTitle = `${props.headerRUS}: Страница-${props.currentPage}`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ItemsPage {...props} />
    </Layout>
  );
}
