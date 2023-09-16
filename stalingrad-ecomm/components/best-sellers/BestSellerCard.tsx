import { IBestSellerData } from "./BestSellers";
import styles from "./BestSellerCard.module.css";
import Link from "next/link";

export default function BestSellerCard({id, catName, catNameRUS, picture, priceRetailRUB}: IBestSellerData) {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{id}</h3>
      <p className={styles.par}>{catNameRUS || catName}</p>
      <img className={styles.picture} src={`/pictures/Stalingrad/${picture.previewSize.pictureName}`} alt="figure" />
      <Link className={styles.button} href={`/items/${id}/`}>Купить за {priceRetailRUB} руб.</Link>
    </div>
  );
}