import Head from "next/head";
import { Main } from "../components/Main";

export default function Home() {
  return (
    <div>
      <Head>
        <title>nostalgic films</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </div>
  );
}
