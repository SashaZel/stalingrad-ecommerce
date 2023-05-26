import Head from "next/head";
import Layout from "../../../components/layout";
import Link from "next/link";

export default function All() {

  return (
    <Layout>
    <Head>
      <title>Redirect</title>
    </Head>
    <div>
      Hi cat in
      <Link href="/items/all/1/">please visit our cat</Link>
    </div>
    </Layout>
  );
}
