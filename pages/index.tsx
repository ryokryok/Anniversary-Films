import dayjs from "dayjs";
import React from "react";
import { SearchForm, Gallery } from "../components/Utils";
import { SiteHead } from "../components/Seo";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  // default value is 5 years ago
  const month =
    (router.query.month as string) === undefined
      ? dayjs().subtract(5, "year").format("YYYY-MM")
      : (router.query.month as string);

  function handleChangeMonth(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    router.push({
      pathname: "/",
      query: { month: event.target.value },
    });
  }
  return (
    <div>
      <SiteHead />
      <SearchForm month={month} handleChangeMonth={handleChangeMonth} />
      <Gallery month={month} />
    </div>
  );
}
