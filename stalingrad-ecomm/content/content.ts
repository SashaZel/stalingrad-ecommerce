import { ICatPaginated } from "../lib/local-items-data";

export const BEST_SELLERS = [
  "Stalingrad-3235",
  "Stalingrad-3260",
  "Stalingrad-3261",
  "Stalingrad-3262",
  "Stalingrad-3263",
  "Stalingrad-3264",
  "Stalingrad-3265",
  "Stalingrad-3220",
  "Stalingrad-3221",
  "Stalingrad-3222",
  "Stalingrad-3229",
  "Stalingrad-3200",
  "Stalingrad-3546",
  "Stalingrad-3101",
  "Stalingrad-3177",
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
  },
  bestSellers: {
    tags: ["best_seller"],
    isSortedByDate: true,
    route: "best-sellers",
    headerRUS: "Бестселлеры"
  },
  easternFront: {
    tags: ["Eastern_front"],
    isSortedByDate: false,
    route: "eastern-front",
    headerRUS: "Великая Отечественная война"
  },
  sciFi: {
    tags: ["sci-fi"],
    isSortedByDate: true,
    route: "sci-fi",
    headerRUS: "Фантастика"
  }
};
