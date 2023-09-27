import { useBatchStock } from "../../api/useBatchStock";
import { IItemsPageProps } from "../../lib/types";
import { ItemCard } from "../item-card/ItemCard";
import { PaginationNav } from "../pagination-nav/PaginationNav";
import styles from "./ItemsPage.module.css";

export function ItemsPage({
  currentItemsData,
  currentPage,
  totalPages,
  currentEnv,
  headerRUS,
  route,
}: IItemsPageProps) {
  const idList = currentItemsData.map((item) => item.id);
  const { data, isLoading, isError } = useBatchStock(idList, currentEnv);

  const catPreview = currentItemsData.map((item) => (
    <ItemCard key={item.id} item={item} data={data} isLoading={isLoading} isError={isError} />
  ));

  return (
      <section className="container">
        <h3>{headerRUS}</h3>
        <PaginationNav currentPage={currentPage} totalPages={totalPages} linkPredicate={`/items/${route}/`} />
        <div className={styles.container}>{catPreview}</div>
        <PaginationNav currentPage={currentPage} totalPages={totalPages} linkPredicate={`/items/${route}/`} />
      </section>
  );
}