import { ChangeEvent, FormEvent, useState } from "react";
import { useSingleStock } from "../../api/useSingleStock";
import { useAtom } from "jotai";
import { ICartItem, cartAtom } from "../../lib/store";
import { MouseEvent } from "react";
import styles from "./SingleStock.module.css";
import IconMinus from "../icons/IconMinus";
import IconPlus from "../icons/IconPlus";

interface ISingleStockProps {
  itemID: string;
  currentEnv: "dev" | "prod";
  catName: string;
  priceRUB: number;
}

export function SingleStock({ itemID, currentEnv, catName, priceRUB }: ISingleStockProps) {
  const { data, isLoading, isError } = useSingleStock(itemID, currentEnv);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [cart, setCart] = useAtom(cartAtom);
  const stock = Number(data?.stock) || 0;
  // const stock = 0;

  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (isError) {
    return <div>Error: no stock data</div>;
  }

  const currentItemInCart = cart.cartItems[itemID];
  let quantityInCard = currentItemInCart ? currentItemInCart.quantity : 0;

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const quantityInput = Number(e.target.value);
    if (typeof quantityInput !== "number" || Number.isNaN(quantityInput)) {
      return;
    }
    if (quantityInput > Number(data.stock)) {
      setError(`available only ${data.stock} items of this set`);
      return;
    }
    setQuantity(quantityInput);
  };

  const incrementQuantity = () => {
    const quantityForUpdate = quantity + 1;
    if (quantityForUpdate > Number(data.stock)) return;
    setQuantity(quantityForUpdate);
  };

  const decrementQuantity = () => {
    const quantityForUpdate = quantity - 1;
    if (quantityForUpdate < 0) return;
    setQuantity(quantityForUpdate);
  };

  const handleAddItemToCard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!quantity) {
      return;
    }
    const currentItemInCart = cart.cartItems[itemID];
    console.log("currentItemInCart", currentItemInCart);
    if (currentItemInCart) {
      currentItemInCart.quantity += quantity;
      setCart((cart) => {
        return {
          ...cart,
          cartItems: {
            ...cart.cartItems,
            [itemID]: {
              ...currentItemInCart,
            },
          },
        };
      });
      return;
    }

    let currentItemInCartDraft: ICartItem = {
      itemName: catName,
      itemPrice: priceRUB,
      itemWeight: 0,
      quantity,
    };
    setCart((cart) => {
      return {
        ...cart,
        cartItems: {
          ...cart.cartItems,
          [itemID]: currentItemInCartDraft,
        },
      };
    });
  };

  const errorMessage = error ? <span>{`Error: ${error}`}</span> : null;

  const stockQuantity = stock > 5 ? "В наличии" : `В наличии ${stock} шт.`;
  const stockMsg =
    stock <= 0 ? (
      <>
        <p className={styles.stock}>Нет в наличии.</p>
        <p>
          <span className={styles.grayText}>Уточнить срок поставки:</span> <a href="mailto:stalingrad.figures@gmail.com">stalingrad.figures@gmail.com</a>
        </p>
      </>
    ) : (
      <p className={styles.stock}>{stockQuantity}</p>
    );

  return (
    <div>
      <div className={styles.priceCard}>
        <p className={styles.price}>{priceRUB} руб.</p>
        <div className={stock <= 0 ? styles.redLine : styles.greenLine}></div>
        {stockMsg}
      </div>
      {errorMessage}
      <div className={styles.info}>В корзине {quantityInCard} шт. </div>
      <div className={styles.quantityRow}>
        <div className={styles.quantityButtons}>
          <button disabled={stock <= 0} className={styles.decIncButtons} onClick={() => decrementQuantity()}>
            <IconMinus />
          </button>
          <input
            disabled={stock <= 0}
            className={styles.inputQuantity}
            type="text"
            value={quantity}
            onChange={(e) => handleChangeQuantity(e)}
          />
          <button disabled={stock <= 0} className={styles.decIncButtons} onClick={() => incrementQuantity()}>
            <IconPlus />
          </button>
        </div>
        <button disabled={stock <= 0} className={styles.cartButton} onClick={(e) => handleAddItemToCard(e)}>
          В корзину
        </button>
      </div>
    </div>
  );
}
