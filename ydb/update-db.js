import { PATH_TO_STOCK_DATA_FILE_TEST } from "./constants.js";
import { readExcelFile, getStock, updateDB } from "./xlsx-utils.js";

const stalingradData = await readExcelFile(PATH_TO_STOCK_DATA_FILE_TEST, "Stalingrad-data.xlsx");

const stalingradStockData = getStock(stalingradData);

await updateDB(stalingradStockData, 'Stalingrad');