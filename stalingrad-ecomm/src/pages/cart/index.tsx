import { useAtom } from "jotai";
import { cartAtom } from "../../../lib/store";
import Layout from "../../../components/layout";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useAtom(cartAtom);

  let totalSum = 0;
  const itemsList = [];
  for (let itemID in cart.cartItems) {
    const currentItem = cart.cartItems[itemID];
    totalSum += currentItem.itemPrice * currentItem.quantity;
    const rowDraft = (
      <li key={itemID}>
        <img src={`/pictures/Stalingrad/${itemID.split('-')[1]}-0.jpg`} alt="item in Stalingrad catalogue" />
        <Link href={`/items/${itemID}/`}>{currentItem.itemName}</Link>
        <span>{currentItem.itemPrice} RUB</span>
        <span>{currentItem.quantity} pcs.</span>
      </li>
    );
    itemsList.push(rowDraft);
  }

  return (
    <Layout>
      <h1>Hi, Cart</h1>
      <div>Your cart</div>
      <ul>{itemsList}</ul>
      <div>{`TOTAL: ${totalSum} RUB`}</div>
    </Layout>
  );
}
