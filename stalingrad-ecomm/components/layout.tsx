import { useAtomValue } from 'jotai/react';
import styles from './layout.module.css';
import { cartAtom } from '../lib/store';
import Link from 'next/link';


export default function Layout({ children }: { children: JSX.Element[] }) {

  const cart = useAtomValue(cartAtom);
  // const itemsInCart = Object.keys(cart.cartItems).length;
  let itemsInCart = 0;
  for (let itemID in cart.cartItems) {
    itemsInCart += cart.cartItems[itemID].quantity;
  }
  return (
    <div className={styles.container}>
      <header>
      <Link href="/">Stalingrad</Link> Yo, header,
      <Link href='/cart/'>Cart has {itemsInCart}</Link>
      </header>
      {children}
      <footer>copyrights footer</footer>
    </div>
  );
}
