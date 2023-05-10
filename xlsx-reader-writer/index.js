import xlsx from "xlsx";
import { codeToNumber, numberToCode } from "./utils.js";

export const readExcelFile = async (filePath) => {
  try {
    const path = "./test-data";
    const file = xlsx.readFile(`${path}/${filePath}`);
    let data = [];
    const sheets = file.SheetNames;
    //console.log(file.Sheets.Sheet1);
    // for (let i = 0; i < sheets.length; i++) {
    //   const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    //   temp.forEach((res) => {
    //     data.push(res);
    //   });
    // }
    // console.log(data);
    return file;
  } catch (err) {
    console.log(err);
  }
};

const testExcel = await readExcelFile("test-excel.xlsx");
//console.log(testExcel.Sheets.Sheet1);

const stalingradData = await readExcelFile("Stalingrad-data.xlsx");
console.log(
  `The stalingradData.Warehouse has size ${stalingradData.Sheets.Warehouse["!ref"]}`
);
console.log(
  `For item# ${stalingradData.Sheets.Warehouse.GN4.v} now available ${stalingradData.Sheets.Warehouse.GN6.v} sets`
);

export function getStock(warehouseData) {
  const maxColumn = warehouseData.Sheets.Warehouse["!ref"]
    .split(":")[1]
    .split("")
    .filter((e) => Number.isNaN(Number(e)))
    .join("");
  // console.log(maxColumn);
  const maxColumnNumber = codeToNumber(maxColumn);
  const stock = [];
  for(let i=0; i<maxColumnNumber; i++) {
    const columnNumber = numberToCode(i);
    console.log(columnNumber);
    if(typeof warehouseData.Sheets.Warehouse[`${columnNumber}4`]?.v === 'number' && typeof warehouseData.Sheets.Warehouse[`${columnNumber}6`]?.v === 'number' ) {
      stock.push({
        id: warehouseData.Sheets.Warehouse[`${columnNumber}4`].v,
        stock: warehouseData.Sheets.Warehouse[`${columnNumber}6`].v
      });
    }
  }
  console.log(stock);
}
getStock(stalingradData);
