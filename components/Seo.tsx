import Head from "next/head";
import React from "react";
import { formatFullDate } from "../lib/formatText";
interface HeadProps {
  month: string;
}
export function SiteHead({ month }: HeadProps) {
  return (
    <Head>
      <title>nostalgic films</title>
      <link rel="icon" href="/favicon.ico" />
      {month ? (
        <meta
          property="og:title"
          content={`${formatFullDate(month)}公開映画 | nostalgic films`}
        />
      ) : (
        <meta property="og:title" content="nostalgic films" />
      )}
      <meta
        property="og:description"
        content="映画を公開月で探せるサイトです。映画のデータはTMDBより使用しています。"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="../public/twitter-card.png" />
    </Head>
  );
}
