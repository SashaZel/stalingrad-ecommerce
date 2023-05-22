import * as dotenv from "dotenv";
import { getPicturesData } from "./getPicturesData.mjs";

dotenv.config({ path: "../stalingrad-ecomm/.env" });

const PATH_TO_ESHOP_DATA_TEST = process.env.PATH_TO_ESHOP_DATA_TEST;
const PATH_TO_ESHOP_DATA_PROD = process.env.PATH_TO_ESHOP_DATA_PROD; 

const PATH_TO_ESHOP_PICTURES_TEST = process.env.PATH_TO_ESHOP_PICTURES_TEST
const PATH_TO_ESHOP_PICTURES_PROD = process.env.PATH_TO_ESHOP_PICTURES_PROD;

const BRAND = "Stalingrad";

// getPicturesData(PATH_TO_ESHOP_PICTURES_TEST, PATH_TO_ESHOP_DATA_TEST, BRAND);
getPicturesData(PATH_TO_ESHOP_PICTURES_PROD, PATH_TO_ESHOP_DATA_PROD, BRAND);
