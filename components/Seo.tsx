import Head from "next/head";
import React from "react";

export function SiteHead() {
  return (
    <Head>
      <title>nostalgic films</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="nostalgic films" />
      <meta
        property="og:description"
        content="映画を公開月で探せるサイトです。映画のデータはTMDBより使用しています。"
      />
      <meta name="twitter:title" content="nostalgic films" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="../public/twitter-card.png" />
    </Head>
  );
}
