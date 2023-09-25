import Link from "next/link";
import { IItemDataLimited } from "../../lib/types";
import { StockInList } from "../stock-in-list/StockInList";
import styles from "./ItemCard.module.css";

export interface IItemCardProps {
  item: IItemDataLimited;
  data: {
    brand: string;
    itemID: string;
    stock: string;
  }[];
  isLoading: boolean | undefined;
  isError: string | undefined;
}

export function ItemCard({ item, data, isLoading, isError }: IItemCardProps) {
  const catName = item.catNameRUS || item.catName;
  const isWide = Number(item.previewPicture.width) > Number(item.previewPicture.height);
  return (
    <div className={`${styles.container} ${isWide ? styles.wideContainer : ""}`} key={item.id}>
      <div className={styles.top}>
        <Link className={styles.pictureContainer} href={`/items/${item.id}/`}>
          <img
            className={styles.picture}
            src={`/pictures/Stalingrad/${item.previewPicture.pictureName}`}
            alt={item.catName}
          />
        </Link>
      </div>
      <div className={styles.bottom}>
        <Link className={styles.header} href={`/items/${item.id}/`}>
          <span className={styles.catNum}>{item.id}</span>
          <br />
          <span className={styles.catName}>{catName}</span>
        </Link>

        <StockInList data={data} isLoading={isLoading} isError={isError} currentID={item.id} />

        <p className={styles.price}>
          <span className={styles.priceNumber}> {item.prices.priceRetailRUB}</span> руб.
        </p>
      </div>
    </div>
  );
}
