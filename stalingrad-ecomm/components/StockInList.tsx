interface IStockInListProps {
  data: {
    brand: string;
    itemID: string;
    stock: string;
  }[];
  isLoading: boolean | undefined;
  isError: boolean | undefined;
  currentID: string;
}

export function StockInList({ data, isLoading, isError, currentID }: IStockInListProps) {
  if (isLoading) {
    return <span>...Load</span>;
  }
  if (isError) {
    return <span>no stock data</span>;
  }
  const [currentBrand, currentCatNum] = currentID.split("-");
  let stock;
  data.forEach((dataEl) => {
    if (dataEl.brand === currentBrand && dataEl.itemID === currentCatNum) {
      stock = dataEl.stock;
    }
  });
  const stockMessage = Number(stock) && Number(stock) > 0 ? "In stock" : "Out of stock";
  return <span>{stockMessage}</span>;
}
