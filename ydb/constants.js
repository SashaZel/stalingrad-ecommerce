import * as dotenv from "dotenv";

dotenv.config({ path: "../stalingrad-ecomm/.env" });

export const PATH_TO_ESHOP_DATA_TEST = process.env.PATH_TO_ESHOP_DATA_TEST;
export const PATH_TO_ESHOP_DATA_PROD = process.env.PATH_TO_ESHOP_DATA_PROD;

export const PATH_TO_ESHOP_PICTURES_TEST =
  process.env.PATH_TO_ESHOP_PICTURES_TEST;
export const PATH_TO_ESHOP_PICTURES_PROD =
  process.env.PATH_TO_ESHOP_PICTURES_PROD;

export const PATH_TO_STOCK_DATA_FILE_TEST =
  process.env.PATH_TO_STOCK_DATA_FILE_TEST;
export const PATH_TO_STOCK_DATA_FILE_PROD =
  process.env.PATH_TO_STOCK_DATA_FILE_PROD;

export const REGION = "ru-central-1";
export const DOCUMENT_API_ENDPOINT = process.env.DOCUMENT_API_ENDPOINT;
