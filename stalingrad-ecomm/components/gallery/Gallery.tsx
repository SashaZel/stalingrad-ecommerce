import { useState } from "react";
import { IItemLocalJSON } from "../../lib/types";
import Link from "next/link";
import styles from "./Gallery.module.css";

export default function Gallery({ itemData }: { itemData: IItemLocalJSON }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previews = itemData.pictures.map((picture, index) => (
    <button key={picture?.previewSize?.pictureName || index} onClick={() => setCurrentIndex(index)}>
      <object
        className={`${styles.preview} ${index === currentIndex ? styles.previewActive : ""}`}
        data={`/pictures/Stalingrad/${picture?.previewSize?.pictureName}`}
        type="image/png"
      >
        <img className={styles.previewFallback} src="/img/not-found.jpg" alt={itemData?.catName} />
      </object>
    </button>
  ));

  return (
    <div className={styles.gallery}>
      <div className={styles.previews}>{previews}</div>
      <div className={styles.fullSizeArea}>
        <Link className={styles.fullSizeLink} href={`/pictures/Stalingrad/${itemData.pictures[currentIndex]?.fullSize?.pictureName}`}>
          <img
            className={styles.bigPicture}
            src={`/pictures/Stalingrad/${itemData.pictures[currentIndex]?.fullSize?.pictureName}`}
            alt={itemData.catNameRUS || itemData.catName}
          />
        </Link>
      </div>
    </div>
  );
}
