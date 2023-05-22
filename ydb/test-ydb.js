import {
  createItemsTable,
  getListTables,
  describeTable,
  putItem,
  getItem,
  getBatchItems
} from "./ydb-utils.js";

// await createItemsTable();

const tableDescription = await describeTable('ITEMS');
console.log(tableDescription);

// const allTables = await getListTables();
// console.log(allTables.TableNames);

// const itemParams = {
//   table: "ITEMS",
//   brand: "Stalingrad",
//   ID: 3223,
//   stock: 22,
// };
// const putItemResponse = await putItem(itemParams);
// console.log(putItemResponse);

// const getItemParams = {
//   table: "ITEMS",
//   brand: "Stalingrad",
//   itemID: 3222,
// };
// const getItemResponse = await getItem(getItemParams);
// console.log(getItemResponse);
// console.log(getItemResponse.Item.Stock.N);

// up to 100 items!
// const itemForRequest = [
//   'Stalingrad-3221',
//   'Stalingrad-3222',
//   'Stalingrad-3224'
// ]
// const resultGetBatch = await getBatchItems({table: 'ITEMS', listItems: itemForRequest});
// console.log(resultGetBatch);
// console.log(resultGetBatch.Responses.ITEMS);
// // [
// //   { Brand: { S: 'Stalingrad' }, ID: { N: '3221' }, Stock: { N: '12' } },
// //   { Brand: { S: 'Stalingrad' }, ID: { N: '3222' }, Stock: { N: '12' } }
// // ]
