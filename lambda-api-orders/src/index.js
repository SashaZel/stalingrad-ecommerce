import * as dotenv from "dotenv";
import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import * as nodemailer from "nodemailer";
import { createConfirmLetter } from "./create-letter.js";

// Config

dotenv.config();
const REGION = "ru-central-1";
const DOCUMENT_API_ENDPOINT = process.env.DOCUMENT_API_ENDPOINT;
const EMAIL_PSWRD = process.env.EMAIL_PSWRD;

export const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: DOCUMENT_API_ENDPOINT,
});

// Utils

async function sendEmail({ email, subject, textMessage, htmlMessage }) {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "stalingrad-diorama@yandex.ru",
      pass: EMAIL_PSWRD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Stalingrad" <stalingrad-diorama@yandex.ru>',
    to: `${email}, stalingrad.figures@gmail.com`,
    subject: subject,
    text: textMessage,
    html: htmlMessage,
  });

  console.log("Message sent: %s", info.accepted);
  return info?.accepted;
}

const postOrder = async ({
  email,
  dateNumber,
  orderDetails,
  isPayed,
  isProcessed,
  isShipped,
  tracking,
}) => {
  const params = {
    TableName: "ORDERS",
    Item: marshall({
      email: email,
      date: dateNumber,
      details: orderDetails,
      isPayed: isPayed,
      isProcessed: isProcessed,
      isShipped: isShipped,
      tracking: tracking,
    }),
  };
  let data;
  try {
    data = await ddbClient.send(new PutItemCommand(params));
    // console.log("Put Item ", data);
  } catch (err) {
    console.error("@putItem() error ", err);
  }
  return data;
};

const decrementStockByNumber = async (brand, ID, num) => {
  const params = {
    TableName: "ITEMS",
    Key: marshall({
      Brand: brand,
      ID: Number(ID),
    }),
    UpdateExpression: "SET Stock = Stock - :decr",
    ExpressionAttributeValues: marshall({
      ":decr": num,
    }),
    ReturnValues: "UPDATED_NEW",
  };
  let data;
  try {
    data = await ddbClient.send(new UpdateItemCommand(params));
  } catch (error) {
    console.error(
      "@decrementStockByNumber() @UpdateItemCommand() [ params, error ] ",
      params,
      error
    );
  }
  return data;
};

// Create new order handler and utils functions

function validateOrderRequest(email, details) {
  if (!email) {
    console.error("@validateOrderRequest() no email");
    return false;
  }
  if (!details) {
    console.error("@validateOrderRequest() no details");
    return false;
  }
  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    !email.includes(".")
  ) {
    console.error("@validateOrderRequest() wrong email format");
    return false;
  }
  if (
    !details.receiver ||
    typeof details.receiver !== "string" ||
    !details.receiver.includes(" ")
  ) {
    console.error("@validateOrderRequest() wrong receiver format");
    return false;
  }
  if (
    !details.address ||
    typeof details.address !== "string" ||
    !details.address.includes(" ")
  ) {
    console.error("@validateOrderRequest() wrong address format");
    return false;
  }
  if (!details.delivery || typeof details.delivery !== "string") {
    console.error("@validateOrderRequest() wrong delivery format");
    return false;
  }
  if (
    !details.order ||
    !Array.isArray(details.order) ||
    details.order.length < 1 ||
    details.order.length > 100
  ) {
    console.error("@validateOrderRequest() wrong order format");
    return false;
  }
  for (let i = 0; i < details.order.length; i++) {
    const itemInOrder = details.order[i];
    if (
      itemInOrder.length !== 4 ||
      typeof itemInOrder[0] !== "string" ||
      !itemInOrder[0].includes("-") ||
      typeof itemInOrder[1] !== "string" ||
      typeof itemInOrder[2] !== "number" ||
      typeof itemInOrder[3] !== "number"
    ) {
      console.error("@validateOrderRequest() wrong item in order format");
      return false;
    }
  }
  return true;
}

async function recalculateOrder(details) {
  const result = {
    items: [],
    discounts: 0,
    deliveryCost: 200,
    totalOrder: 0,
    currency: "RUB",
  };
  // TODO: add prices validation with hash and salt
  let calculatedTotal = 0;
  for (let i = 0; i < details.order.length; i++) {
    const id = details.order[i][0];
    const name = details.order[i][1];
    const quantity = details.order[i][2];
    const price = details.order[i][3];
    const total = quantity * price * (1 - result.discounts);
    calculatedTotal += total;
    result.items.push({ id, name, quantity, price, total });
  }
  calculatedTotal += result.deliveryCost;
  result.totalOrder = calculatedTotal;
  return result;
}

async function updateDB(details) {
  let result;
  for (let i = 0; i < details.order.length; i++) {
    const [brand, ID] = details.order[i][0].split("-");
    const quantity = details.order[i][2];
    result = await decrementStockByNumber(brand, ID, quantity);
    if (!result) return;
  }
  return "ok";
}

async function handleCreateOrder(event) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.error("@handleCreateOrder() Error in parse JSON body ", error);
  }
  if (!body) {
    console.error("@handleCreateOrder() Error: no body in request");
    return;
  }
  const email = body.email;
  const details = body.details;
  const totalSum = body.totalSum;
  const isValidOrder = validateOrderRequest(email, details);
  if (!isValidOrder) return;
  const dateNow = new Date();
  const dateNumber = dateNow.getTime();
  const orderID = String(dateNumber);

  const resultUpdateDB = await updateDB(details);
  if (!resultUpdateDB) {
    console.error("@handleCreateOrder() Error in updateDB()");
    return;
  }
  const orderCalculation = await recalculateOrder(details);
  if (orderCalculation.totalOrder !== totalSum) {
    console.error(
      "@handleCreateOrder() wrong price calc [orderCalc, totalSum]",
      orderCalculation,
      totalSum
    );
    return;
  }
  // const orderCalculation = {
  //   items: [
  //     {
  //       id: 'Stalingrad-3221',
  //       name: 'German panzergre...',
  //       quantity: 2,
  //       price: 847,
  //       total: 1694
  //     },
  //     {
  //       id: 'Stalingrad-3221',
  //       name: 'German panzergre...',
  //       quantity: 1,
  //       price: 847,
  //       total: 847
  //     },
  //   ],
  //     discounts: 0,
  //     deliveryCost: 200,
  //     totalOrder: 1230,
  //     currency: "RUB"
  // }
  // TODO: request payment
  const responseData = {
    orderCreated: true,
    orderID: orderID,
    paymentLink: "https://DUMMY_PAYMENT_LINK",
    message: "Order created.",
  };
  // TODO: create user account (if necessary)
  // TODO: add order to user account
  // TODO: send email with confirmation to the user
  // TODO: send notification to admin
  const htmlLetter = createConfirmLetter(orderID, details, orderCalculation);
  const paramsEmail = {
    email: email,
    subject: `Заказ №${orderID} принят`,
    textMessage: "Hello world",
    htmlMessage: htmlLetter,
  };
  try {
    await sendEmail(paramsEmail);
  } catch (error) {
    console.error("@handleCreateOrder() Error in sending email: ", error);
  }
  const paramsForNewOrder = {
    email: email,
    dateNumber: dateNumber,
    orderDetails: details,
    isPayed: false,
    isProcessed: false,
    isShipped: false,
    tracking: "",
  };
  const resultPostOrder = await postOrder(paramsForNewOrder);
  const responseStatus = resultPostOrder?.$metadata?.httpStatusCode;
  if (!resultPostOrder || responseStatus !== 200) {
    console.error(
      "@handleCreateOrder() Error in postOrder() in DB",
      resultPostOrder
    );
    return;
  }

  // TODO: check the cors policy
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    isBase64Encoded: false,
    body: JSON.stringify(responseData),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
    };
  }

  if (event.httpMethod === "POST") {
    const result = await handleCreateOrder(event);
    if (result) return result;
  }
  return {
    statusCode: 400,
    headers: {
      "Content-Type": "text/plain",
    },
    isBase64Encoded: false,
    body: "Wrong request.",
  };
}
