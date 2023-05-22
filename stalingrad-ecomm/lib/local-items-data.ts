import { readdir, readFile, writeFile } from "node:fs/promises";
import { IItemLocalJSON, ITEM_DATA_LOCAL_EXAMPLE } from "./types";

const PATH_TO_ESHOP_DATA_PROD = process.env.PATH_TO_ESHOP_DATA_PROD;
const PATH_TO_ESHOP_DATA_TEST = process.env.PATH_TO_ESHOP_DATA_TEST;

const PATH = PATH_TO_ESHOP_DATA_TEST;

export interface IStaticPathData {
  params: {
    item: string;
  };
}

const DUMMY_PATHS: IStaticPathData[] = [
  {
    params: {
      item: "Stalingrad-3221",
    },
  },
  {
    params: {
      item: "Stalingrad-3222",
    },
  },
];

async function getFileNames(folder: string | undefined) {
  if (!folder) {
    console.error(
      "@local-items-data @getFileNames Error: no folder path provided "
    );
    return null;
  }

  try {
    const files = await readdir(folder);
    return files;
  } catch (err) {
    console.error("Error @getFileNames() in folder ", folder, err);
    return null;
  }
}

export async function getStaticPathsFromLocalData(): Promise<
  IStaticPathData[]
> {
  const itemsList = await getFileNames(PATH);
  if (!itemsList) {
    console.error(
      "@local-items-data @getStaticPathsFromLocalData() Error: no path provided"
    );
    return [{ params: { item: "" } }];
  }
  console.log(itemsList);
  return itemsList.map((fileName) => {
    const item = fileName.split(".")[0];
    return {
      params: {
        item,
      },
    };
  });
  // return new Promise((resolve) => {
  //   resolve(DUMMY_PATHS);
  // });
  // return DUMMY_PATHS;
}

export async function getStaticDataFromLocal(
  itemID: string
): Promise<IItemLocalJSON> {
  
  let itemData;

  try {
    const contents = await readFile(`${PATH}\\${itemID}.json`, {
      encoding: "utf8",
    });
    itemData = JSON.parse(contents) as IItemLocalJSON;
    // alreadyExistData[itemData.id] = itemData;
    // // clear all pictures data
    // alreadyExistData[itemData.id].pictures = [];
  } catch (error) {
    console.error(
      "Error @getAlreadyExistData @readFile file name ",
      itemID,
      ".json ",
      error
    );
  }

  if (!itemData) {
    console.error(`@local-items-data @getStaticDataFromLocal() no data from ${itemID}.json, dummy data returned`) 
    return new Promise((resolve) => {
      resolve(ITEM_DATA_LOCAL_EXAMPLE);
    });
  }

  return itemData;
  // return ITEM_DATA_LOCAL_EXAMPLE;
}
