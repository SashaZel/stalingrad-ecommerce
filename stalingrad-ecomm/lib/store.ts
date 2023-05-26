import { atom } from "jotai";

export interface ICartItem {
  itemName: string;
  itemPrice: number;
  itemWeight: number;
  quantity: number;
}

interface ICart {
  name: string;
  address: string;
  email: string;
  preferredPayment: string;
  currency: 'RUB' | 'USD' | 'EUR'
  cartItems: {
    [id: string]: ICartItem
  }
}

const emptyOrder: ICart = {
  name: '',
  address: '',
  email: '',
  preferredPayment: '',
  currency: 'RUB',
  cartItems: {}
}

export const countAtom = atom(0);
export const cartAtom = atom(emptyOrder);