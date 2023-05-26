import Link from "next/link";
import { IItemDataLimited } from "../lib/types";
import { StockInList } from "./StockInList";

interface IItemRowProps {
  item: IItemDataLimited;
  data: {
    brand: string;
    itemID: string;
    stock: string;
  }[];
  isLoading: boolean | undefined;
  isError: boolean | undefined;
}

export function ItemRow({ item, data, isLoading, isError }: IItemRowProps) {
  const catNumber = item.id.split("-")[1];
  const catName = item.catNameRUS || item.catName;
  return <li key={item.id}>
    <img src={`/pictures/Stalingrad/${catNumber}-0.jpg`} alt="" />
    <Link href={`/items/${item.id}/`}>{`${item.id} ${catName}`}</Link>
    <StockInList data={data} isLoading={isLoading} isError={isError} currentID={item.id} />
  </li>;
}
