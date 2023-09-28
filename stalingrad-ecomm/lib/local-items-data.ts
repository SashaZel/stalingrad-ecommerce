import { readdir, readFile } from "node:fs/promises";
import { IItemLocalJSON, ITEM_DATA_LOCAL_EXAMPLE } from "./types";
import { paginateArray } from "./utils";
import { ITagsGroups, TAGS_GROUPS } from "../content/content";

const PATH_TO_ESHOP_DATA_PROD = process.env.PATH_TO_ESHOP_DATA_PROD;
const PATH_TO_ESHOP_DATA_TEST = process.env.PATH_TO_ESHOP_DATA_TEST;

// const PATH = PATH_TO_ESHOP_DATA_TEST;

export interface IStaticPathData {
  params: {
    item: string;
  };
}
export type ICatPaginated = string[][];

const PATH = PATH_TO_ESHOP_DATA_PROD;

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
    console.error("@local-items-data @getFileNames Error: no folder path provided ");
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

export async function getStaticPathsFromLocalData(): Promise<IStaticPathData[]> {
  const itemsList = await getFileNames(PATH);
  if (!itemsList) {
    console.error("@local-items-data @getStaticPathsFromLocalData() Error: no path provided");
    return [{ params: { item: "" } }];
  }
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

export async function getStaticDataFromLocal(itemID: string): Promise<IItemLocalJSON> {
  let itemData;

  try {
    const contents = await readFile(`${PATH}\\${itemID}.json`, {
      encoding: "utf8",
    });
    itemData = JSON.parse(contents) as IItemLocalJSON;
  } catch (error) {
    console.error("Error @getAlreadyExistData @readFile file name ", itemID, ".json ", error);
  }

  if (!itemData) {
    console.error(`@local-items-data @getStaticDataFromLocal() no data from ${itemID}.json, dummy data returned`);
    return new Promise((resolve) => {
      resolve(ITEM_DATA_LOCAL_EXAMPLE);
    });
  }

  return itemData;
  // return ITEM_DATA_LOCAL_EXAMPLE;
}

// Create collections by tags

function filterItemsByTagList(listWithItemsData: IItemLocalJSON[], tags: string[], isSortedByDate: boolean): string[] {
  const filteredList = listWithItemsData.filter((item) => {
    let isValid = true;
    for (let j = 0; j < tags.length; j++) {
      if (!item.tags.includes(tags[j])) isValid = false;
    }
    return isValid;
  });
  if (isSortedByDate) {
    filteredList.sort((a, b) => {
      if (a.releaseDate > b.releaseDate) return -1;
      if (a.releaseDate < b.releaseDate) return 1;
      return 0;
    });
  }
  const listWithoutDeprecated = filteredList.filter((item) => !item.tags.includes("deprecated"));
  const result = listWithoutDeprecated.map((item) => item.id);
  return result;
}

async function loadAppData(path: string | undefined, tagsGroups: ITagsGroups) {
  if (!path) {
    console.error("@loadAppData() Error: no PATH provided");
    return {};
  }
  const fileNames = await getFileNames(path);
  if (!fileNames) {
    console.error("@loadAppData() Error: no fileNames");
    return {};
  }
  const itemsData = [];
  for (let i = 0; i < fileNames.length; i++) {
    try {
      const content = await readFile(`${path}\\${fileNames[i]}`, {
        encoding: "utf8",
      });
      const itemData = JSON.parse(content) as IItemLocalJSON;
      if (!itemData) throw new Error("itemData is undefined");
      itemsData.push(itemData);
    } catch (error) {
      console.error("@filterItemsByTagList() error in reading file", fileNames[i]);
    }
  }
  const appData: ITagsGroups = {};
  for (const tagsGroup in tagsGroups) {
    const filtered = filterItemsByTagList(itemsData, tagsGroups[tagsGroup].tags, tagsGroups[tagsGroup].isSortedByDate);
    appData[tagsGroup] = {
      ...tagsGroups[tagsGroup],
      itemsPaginated: paginateArray(filtered, 40),
    };
  }
  return appData;
}

export const appData = loadAppData(PATH, TAGS_GROUPS);
