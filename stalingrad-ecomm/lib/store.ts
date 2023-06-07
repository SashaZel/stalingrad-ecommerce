import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils';

export interface ICartItem {
  itemName: string;
  itemPrice: number;
  itemWeight: number;
  quantity: number;
}

export interface ICart {
  preferredPayment: string;
  currency: 'RUB' | 'USD' | 'EUR'
  cartItems: {
    [id: string]: ICartItem
  };
}

const emptyOrder: ICart = {
  preferredPayment: '',
  currency: 'RUB',
  cartItems: {}
}

export const countAtom = atom(0);
export const cartAtom = atom(emptyOrder);
export const userEmailAtom = atomWithStorage("userEmail", "");
export const userNameAtom = atomWithStorage("userName", "");
export const userAddressAtom = atomWithStorage("userAddress", "");