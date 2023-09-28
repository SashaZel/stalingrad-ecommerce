import { useAtom } from "jotai";
import { cartAtom, userAddressAtom, userEmailAtom, userNameAtom } from "../../../lib/store";
import Layout from "../../../components/layout/layout";
import Link from "next/link";
import Head from "next/head";
import { useBatchStock } from "../../../api/useBatchStock";
import { ChangeEvent, useState } from "react";
import { createOrder } from "../../../api/createOrder";

interface ICreateStockMessage {
  reqStock: number;
  actualStock: string;
  isLoading: boolean;
  isError: string | undefined;
}

function getStockMessage({ reqStock, actualStock, isLoading, isError }: ICreateStockMessage): [boolean, string] {
  console.log("request actual ", reqStock, actualStock);

  if (isLoading) {
    return [false, "Loading..."];
  }
  if (isError || !reqStock || actualStock === undefined) {
    return [false, "Error..."];
  }
  if (reqStock > Number(actualStock)) {
    return [false, "Not enough"];
  }
  return [true, "In stock"];
}

export default function ConfirmOrder() {
  const [paymentLink, setPaymentLink] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cart, setCart] = useAtom(cartAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const [userAddress, setUserAddress] = useAtom(userAddressAtom);

  console.log("@Confirm-order cart: ", cart);

  const { data, isLoading, isError } = useBatchStock(Object.keys(cart.cartItems), "prod");

  let orderReadyForCheckout = false;
  if (!isLoading && !isError && Object.keys(cart.cartItems).length > 0) {
    orderReadyForCheckout = true;
  }

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputValue = e.currentTarget.value;
    setUserEmail(inputValue);
    if (!emailRegEx.test(inputValue)) {
      setErrorMsg("Проверьте введенный адрес электронной почты");
      return;
    }
    setErrorMsg("");
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserName(inputValue);
    if (!inputValue) {
      setErrorMsg("Пожалуйста введите имя");
      return;
    }
    if (!inputValue.includes(" ") || !inputValue.split(" ")[1]) {
      setErrorMsg("Имя получателя должно состоять как минимум из двух слов");
      return;
    }
    setErrorMsg("");
  };

  const handleAddressInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserAddress(inputValue);
    if (!inputValue) {
      setErrorMsg("Пожалуйста введите адрес");
      return;
    }
    if (inputValue.length < 12 || inputValue.split(" ").length < 3) {
      setErrorMsg("Проверьте правильност адреса");
      return;
    }
    setErrorMsg("");
  };

  const handleLinkToPaymentService = () => {
    setPaymentLink("");
    setCart((cart) => {
      return { ...cart, cartItems: {} };
    });
  };

  let totalSum = 0;
  const deliveryCost = 200;
  totalSum += deliveryCost;
  const itemsList = [];
  for (let itemID in cart.cartItems) {
    const currentItem = cart.cartItems[itemID];

    const stockMessage = getStockMessage({
      reqStock: currentItem.quantity,
      actualStock: data && data?.filter((stockData) => `${stockData.brand}-${stockData.itemID}` === itemID)[0]?.stock,
      isLoading,
      isError,
    });
    if (!stockMessage[0]) {
      orderReadyForCheckout = false;
    }
    totalSum += currentItem.itemPrice * currentItem.quantity;
    const rowDraft = (
      <li key={itemID}>
        <Link href={`/items/${itemID}/`}>{currentItem.itemName}</Link>
        <span>{currentItem.itemPrice} RUB</span>
        <span>{currentItem.quantity} pcs.</span>
        <span>{stockMessage[1]}</span>
        <button
          onClick={() =>
            setCart((cart) => {
              delete cart.cartItems[itemID];
              return { ...cart };
            })
          }
          disabled={!!paymentLink}
        >
          DELETE
        </button>
      </li>
    );
    itemsList.push(rowDraft);
  }

  let checkoutButton = <span>Пожалуйста проверьте данные заказа</span>;
  if (orderReadyForCheckout && !errorMsg) {
    checkoutButton = (
      <button
        onClick={async () => {
          console.log(cart);
          const createOrderParams = {
            cart,
            deliveryCost,
            totalSum,
            userEmail,
            userName,
            userAddress,
          };
          const result = await createOrder(createOrderParams);
          console.log("order created!");
          setPaymentLink(result?.paymentLink);
        }}
      >
        Place Order
      </button>
    );
  }
  if (paymentLink) {
    checkoutButton = (
      <a
        onClick={handleLinkToPaymentService}
        // href={paymentLink}
        href="mailto:stalingrad.figures@gmail.com"
      >
        В данный момент сайт находится в тестовом режиме и заказ не доступен. По всем вопросам пишите на
        stalingrad.figures@gmail.com
      </a>
    );
  }

  const errorMessageBox = errorMsg ? <span>{errorMsg}</span> : null;

  return (
    <Layout>
      <Head>
        <title>Подтверждение заказа</title>
      </Head>
      <section className="container">
        <h1>Hi, Cart</h1>
        <div>Your cart</div>
        <ul>{itemsList}</ul>
        <div>Post delivery 200 RUB</div>
        <div>{`TOTAL: ${totalSum} RUB`}</div>
        {checkoutButton}
        <div>
          <h2>Order details</h2>
          Your email
          <input
            type="text"
            id="receiverEmail"
            value={userEmail}
            disabled={!!paymentLink}
            onChange={(e) => handleEmailInput(e)}
          />
          Your name
          <input
            type="text"
            id="receiverName"
            value={userName}
            disabled={!!paymentLink}
            onChange={(e) => handleNameInput(e)}
          />
          Your address
          <input
            type="text"
            id="receiverAddress"
            value={userAddress}
            disabled={!!paymentLink}
            onChange={(e) => setUserAddress(e.currentTarget.value)}
          />
        </div>
        <div>{errorMessageBox}</div>
      </section>
    </Layout>
  );
}
