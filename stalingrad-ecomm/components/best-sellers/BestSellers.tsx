import { useRef, useState } from "react";
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
  const slidesWindowRef = useRef(null);

  const moveLeft = () => {
    if (slidesWindowRef.current === null) return;
    const slidesWindow = slidesWindowRef.current as HTMLDivElement;
    slidesWindow.scrollLeft -= 400;
  };

  const moveRight = () => {
    if (slidesWindowRef.current === null) return;
    const slidesWindow = slidesWindowRef.current as HTMLDivElement;
    slidesWindow.scrollLeft += 400;
  };

  const slides = bestSellerData.map((data) => <BestSellerCard key={data.id} {...data} />);

  return (
    <section className="container">
      <div className={styles.header}>
        <h2>Бестселлеры</h2>
        <div className={styles.buttonsContainer}>
          <button className={`${styles.buttonMove}`} onClick={moveLeft}>
            <IconArrowLeft />
          </button>
          <button className={`${styles.buttonMove} ${styles.buttonRight}`} onClick={moveRight}>
            <IconArrowLeft />
          </button>
        </div>
      </div>
      <div className={`${styles.slidesWindow} styledScrollbar`} ref={slidesWindowRef}>
        {slides}
      </div>
    </section>
  );
}
