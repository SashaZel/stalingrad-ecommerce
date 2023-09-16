import { useState } from "react";
import styles from "./BestSellers.module.css";
import IconArrowLeft from "../icons/IconArrowLeft";
import { IItemLocalPicture } from "../../lib/types";
import BestSellerCard from "./BestSellerCard";

export interface IBestSellerData {
  id: string;
  catName: string;
  catNameRUS: string;
  picture: IItemLocalPicture;
  priceRetailRUB: number;
}

interface IBestSellerProps {
  bestSellerData: IBestSellerData[];
  maxSlide: number;
}


export default function BestSellers({ maxSlide, bestSellerData }: IBestSellerProps) {
  const [slide, setSlide] = useState(0);

  const moveLeft = () => {
    if (slide === 0) {
      return;
    }
    setSlide((slide) => slide - 1);
  };

  const moveRight = () => {
    if (slide === maxSlide - 3) {
      return;
    }
    setSlide((slide) => slide + 1);
  };

  const slides = bestSellerData.map((data) => <BestSellerCard key={data.id} {...data} />)

  return (
    <section className="container">
      <div className={styles.header}>
        <h2>Бестселлеры</h2>
        <div className={styles.buttonsContainer}>
          <button className={`${styles.buttonMove} ${slide === 0 ? styles.inactiveButton : ""}`} onClick={moveLeft}>
            <IconArrowLeft />
          </button>
          <button
            className={`${styles.buttonMove} ${styles.buttonRight} ${
              slide === maxSlide - 3 ? styles.inactiveButton : ""
            }`}
            onClick={moveRight}
          >
            <IconArrowLeft />
          </button>
        </div>
      </div>
      <div className={styles.slidesWindow}>
        <div className={styles.slidesContainer} style={{ left: `-${slide * 400}px` }}>
          {slides}
        </div>
      </div>
    </section>
  );
}
