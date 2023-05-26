import useSWR from "swr";
import { fetcher } from "./fetcher";

export interface ISingleStock {
  data: {
    brand: string;
    itemID: string;
    stock: string;
  };
  isLoading: boolean;
  isError: boolean;
}

const STOCK_FUNCTION_YC =
  "https://functions.yandexcloud.net/d4e43fcbjv11pq6m2qh8";
const STOCK_API_ENDPOINT = STOCK_FUNCTION_YC;


export function useSingleStock(id: string, currentEnv: 'dev' | 'prod'): ISingleStock {
  const reqUrl = `${STOCK_API_ENDPOINT}?item=${id}`
  const { data, error, isLoading } = useSWR(
    () => currentEnv === 'prod' ? reqUrl : null,
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  
  const result = {
    data,
    isLoading,
    isError: error,
  };
  //console.log(result)
  
  if(!data && !isLoading) {
    const DUMMY_SINGLE_STOCK: ISingleStock = {
      data: {
        brand: id.split('-')[0],
        itemID: id.split('-')[1],
        stock: '10'
      },
      isLoading: false,
      isError: false
    }
    return DUMMY_SINGLE_STOCK;
  }
  
  return result;

  // const result = await {
  //   inStock: true,
  //   quantity: 10
  // }
  // return result;
}
