import { ddbClient } from "../../lib/YDB-utils";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export async function getStaticProps() {
  // req wit DynamoDB
  const requestParams = {
    TableName: "ITEMS",
    Key: marshall({
      ItemID: "S-3042",
    }),
  };
  const result = await ddbClient.send(new GetItemCommand(requestParams));
  console.log(result);
  console.log("Status code ", result?.$metadata.httpStatusCode);
  if (!result.Item) return;
  const unmarshalledItem = unmarshall(result.Item);
  console.log("Item ", unmarshalledItem);

  // dummy data
  const posts: string[] = ["hi post", "hello post"];

  return {
    props: {
      posts: posts,
      item: unmarshalledItem,
    },
  };
}

export default function Figures({
  posts,
  item,
}: {
  posts: string[];
  item: { ItemID: string; Name: string };
}) {
  return (
    <>
      <h1>Hi, my figures page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}> {post} </li>
        ))}
      </ul>
      <p>we fetched {item.ItemID} {item.Name}</p>
    </>
  );
}
