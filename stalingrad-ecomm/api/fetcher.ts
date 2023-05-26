export async function fetcher(url: string) {
  try {
    const response = await fetch(url);
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
