import React from "react";
import { SearchForm, Gallery } from "../components/Utils";
import { SiteHead } from "../components/Seo";
import { useSelectMonth } from "../utils/hooks";

export default function Home() {
  const { month, handleChangeMonth } = useSelectMonth();

  return (
    <div>
      <SiteHead />
      <SearchForm month={month} handleChangeMonth={handleChangeMonth} />
      <Gallery month={month} />
    </div>
  );
}
