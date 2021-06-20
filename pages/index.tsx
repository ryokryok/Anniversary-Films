import React from "react";
import { SearchForm, Gallery } from "../components/Utils";
import { SiteHead } from "../components/Seo";
import { useFetchMovieData, useSelectMonth } from "../lib/hooks";

export default function Home() {
  const { month, handleChangeMonth } = useSelectMonth();
  const { data, error } = useFetchMovieData(month);

  return (
    <div>
      <SiteHead month={month} />
      <SearchForm month={month} handleChangeMonth={handleChangeMonth} />
      {error ? (
        <div>failed to load</div>
      ) : !data ? (
        <div>loading...</div>
      ) : (
        <Gallery data={data.results} />
      )}
    </div>
  );
}
