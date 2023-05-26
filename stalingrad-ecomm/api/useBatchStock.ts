import useSWR from "swr";
import { fetcher } from "./fetcher";

export interface IBatchStock {
  data: {
    brand: string;
    itemID: string;
    stock: string;
  }[];
  isLoading: boolean;
  isError: boolean;
}

const STOCK_FUNCTION_YC = "https://functions.yandexcloud.net/d4e43fcbjv11pq6m2qh8";
const STOCK_API_ENDPOINT = STOCK_FUNCTION_YC;

export function useBatchStock(idList: string[], currentEnv: "dev" | "prod"): IBatchStock {
  let reqUrl = `${STOCK_API_ENDPOINT}?`;
  const urlQuery = idList.map((id) => `items=${id}`).join("&");
  reqUrl += urlQuery;
  const { data, error, isLoading } = useSWR(() => (currentEnv === "prod" ? reqUrl : null), fetcher, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const itemsData = data?.items;

  const result = {
    data: itemsData,
    isLoading,
    isError: error,
  };
  //console.log(result)

  if (!data && !isLoading) {
    const DUMMY_BATCH_STOCK: IBatchStock = {
      isLoading: false,
      isError: false,
      data: idList.map((id) => {
        return {
          brand: id.split("-")[0],
          itemID: id.split("-")[1],
          stock: "10",
        };
      }),
    };
    return DUMMY_BATCH_STOCK;
  }

  return result;
}
