import { ICatPaginated } from "./local-items-data";

export function paginateArray(arr: string[], itemsPerPage: number): ICatPaginated {
  if (!Array.isArray(arr)) {
    console.error("@paginateArray wrong arr type");
    return [[]];
  }
  const result: ICatPaginated = [];
  let page: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    page.push(arr[i]);
    if (page.length === itemsPerPage || i === arr.length - 1) {
      result.push(page);
      page = [];
    }
  }
  return result;
}
