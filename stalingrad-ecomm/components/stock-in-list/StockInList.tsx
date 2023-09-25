import styles from "./StockInList.module.css";

interface IStockInListProps {
  data: {
    brand: string;
    itemID: string;
    stock: string;
  }[];
  isLoading: boolean | undefined;
  isError: string | undefined;
  currentID: string;
}

export function StockInList({ data, isLoading, isError, currentID }: IStockInListProps) {
  if (isLoading) {
    return <span className={`${styles.block} ${styles.gray}`}>...Загрузка</span>;
  }
  if (isError) {
    return <span className={`${styles.block} ${styles.gray}`}>Нет данных</span>;
  }
  const [currentBrand, currentCatNum] = currentID.split("-");
  let stock;
  data.forEach((dataEl) => {
    if (dataEl.brand === currentBrand && dataEl.itemID === currentCatNum) {
      stock = dataEl.stock;
    }
  });
  if (Number(stock) && Number(stock) > 0) {
    return <span className={`${styles.block} ${styles.green}`}>В наличии</span>;
  }
  return <span className={`${styles.block} ${styles.red}`}>Нет в наличии</span>;
}
