import { ChangeEvent, FormEvent, useState } from "react";
import { useSingleStock } from "../api/useSingleStock";
import { useAtom } from "jotai";
import { ICartItem, cartAtom } from "../lib/store";

interface ISingleStockProps {
  itemID: string;
  currentEnv: "dev" | "prod";
  catName: string;
  priceRUB: number;
}

export function SingleStock({ itemID, currentEnv, catName, priceRUB }: ISingleStockProps) {
  const { data, isLoading, isError } = useSingleStock(itemID, currentEnv);
  const [addQuantity, setAddQuantity] = useState(1);
  const [error, setError] = useState("");
  const [cart, setCart] = useAtom(cartAtom);

  // console.log('render SingleStock')
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
    const quantity = Number(e.target.value);
    if (typeof quantity !== "number" || Number.isNaN(quantity)) {
      return;
    }
    if (quantity > Number(data.stock)) {
      setError(`available only ${data.stock} items of this set`);
      return;
    }
    setAddQuantity(quantity);
  };

  const handleAddItemToCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("handle", e.currentTarget[0]);
    const quantityInputValue = Number(e.currentTarget.quantity.value);
    if (!quantityInputValue) {
      return;
    }
    const currentItemInCart = cart.cartItems[itemID];
    console.log("currentItemInCart", currentItemInCart);
    if (currentItemInCart) {
      // const updateQuantity = cart.cartItems[itemID].quantity + quantityInputValue;
      currentItemInCart.quantity += quantityInputValue;
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
      quantity: quantityInputValue,
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

  return (
    <div>
      {errorMessage}
      <div>In your cart {quantityInCard} these sets </div>
      <form onSubmit={(e) => handleAddItemToCard(e)}>
        <input type="text" id="quantity" value={addQuantity} onChange={(e) => handleChangeQuantity(e)} />
        <input type="submit" value="add to Cart" />
      </form>
      {`Available ${data.stock}`}
    </div>
  );
}
