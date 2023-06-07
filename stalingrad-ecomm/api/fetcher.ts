export interface IFetcherParams {
  method: "POST"; // *GET, POST, PUT, DELETE, etc.
  mode: "cors"; // no-cors, *cors, same-origin
  cache: "no-cache"; // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin"; // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json";
    // 'Content-Type': 'application/x-www-form-urlencoded'
  };
  redirect: "follow"; // manual, *follow, error
  referrerPolicy: "no-referrer"; // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: string;
}

export async function fetcher(url: string, params: IFetcherParams | undefined) {
  console.log("@fetcher() ", url);
  try {
    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const result = response.json();
    console.log("@fetcher result for ", url);
    return result;
  } catch (error) {
    console.error("@fetcher() Error in fetch: ", error);
  }
}
