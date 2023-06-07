import { ICart } from "../lib/store";
import { IFetcherParams, fetcher } from "./fetcher";

const ORDER_FUNCTION_YC = "https://functions.yandexcloud.net/d4ef7q49iikt5jrvsmii";
const ORDER_FUNCTION_ENDPOINT = ORDER_FUNCTION_YC;

interface ICreateOrderParams {
  cart: ICart;
  deliveryCost: number;
  totalSum: number;
  userEmail: string;
  userName: string;
  userAddress: string;
}

interface IOrderBody {
  email: string;
  details: {
    receiver: string;
    address: string;
    delivery: string;
    notes: string;
    order: [string, string, number, number][];
  };
  deliveryCost: number;
  totalSum: number;
}
interface ICreateOrderResponse {
  orderCreated: boolean;
  orderID: string;
  paymentLink: string;
  message: string;
}

export async function createOrder(params: ICreateOrderParams): Promise<ICreateOrderResponse> {
  const itemsInOrderBody: [string, string, number, number][] = [];
  for (let itemID in params.cart.cartItems) {
    const name = params.cart.cartItems[itemID].itemName;
    const quantity = params.cart.cartItems[itemID].quantity;
    const price = params.cart.cartItems[itemID].itemPrice;
    itemsInOrderBody.push([itemID, name, quantity, price]);
  }
  const orderBody: IOrderBody = {
    email: params.userEmail,
    details: {
      receiver: params.userName,
      address: params.userAddress,
      delivery: "Russian post (parcel)",
      notes: "",
      order: itemsInOrderBody,
    },
    deliveryCost: params.deliveryCost,
    totalSum: params.totalSum
  };
  const orderBodyJSON = JSON.stringify(orderBody);
  const fetchParams: IFetcherParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: orderBodyJSON,
  };
  const response = (await fetcher(ORDER_FUNCTION_ENDPOINT, fetchParams)) as ICreateOrderResponse;
  console.log('@CreateOrder() response ', response);
  return response;
}
