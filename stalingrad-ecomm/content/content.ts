import { ICatPaginated } from "../lib/local-items-data";

export const MAX_BEST_SELLER_SLIDE = 9;

export const BEST_SELLERS = [
  "Stalingrad-3221",
  "Stalingrad-3222",
  "Stalingrad-3223",
  "Stalingrad-3224",
  "Stalingrad-3225",
  "Stalingrad-3226",
  "Stalingrad-3227",
  "Stalingrad-3220",
  "Stalingrad-3200",
];

export interface ICategory {
  tags: string[];
  isSortedByDate: boolean;
  route: string;
  headerRUS: string;
  itemsPaginated?: ICatPaginated
}

export interface ITagsGroups {
  [name: string]: ICategory
}

export const TAGS_GROUPS: ITagsGroups = {
  all: {
    tags: [],
    isSortedByDate: false,
    route: "all",
    headerRUS: "Все фигурки по номерам"
  },
  allByDate: {
    tags: [],
    isSortedByDate: true,
    route: "all-by-date",
    headerRUS: "Все фигурки по дате релиза"
  },
  redArmy: {
    tags: ["Red Army"],
    isSortedByDate: false,
    route: "red-army",
    headerRUS: "Красная Армия"
  },
  wwOne: {
    tags: ["WW1"],
    isSortedByDate: false,
    route: "ww1",
    headerRUS: "Первая мировая война"
  },
  scaleSixteen: {
     tags: ["scale_1/16"],
     isSortedByDate: false,
     route: "16-scale",
     headerRUS: "Масштаб 1:16"
  }, 
  scaleThirtyFive: {
    tags: ["scale_1/35"], 
    isSortedByDate: false,
    route: "35-scale", 
    headerRUS: "Масштаб 1:35"
  },
  scaleFortyEight: {
    tags: ["scale_1/48"],
    isSortedByDate: false,
    route: "48-scale",
    headerRUS: "Масштаб 1:48"
  },
  germans: {
    tags: ["Germans"],
    isSortedByDate: false,
    route: "germans",
    headerRUS: "Германия"
  }, 
  modern: {
    tags: ["modern"],
    isSortedByDate: false,
    route: "modern",
    headerRUS: "Современка"
  },
  civilians: {
    tags: ["civilians"],
    isSortedByDate: false,
    route: "civilians",
    headerRUS: "Гражданские"
  },
  bigSets: {
    tags: ["Big Set"],
    isSortedByDate: true,
    route: "big-sets",
    headerRUS: "Большие наборы"
  }
};
