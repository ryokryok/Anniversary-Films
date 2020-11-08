import React, { useState } from "react";
import { Gallery, SearchForm } from "./Utils";
import dayjs from "dayjs";

export function Main() {
  // initial month is 5 years ago
  const [selectMonth, setSelectMonth] = useState(dayjs().subtract(5, "year").format("YYYY-MM"));
  return (
    <main className="">
      <SearchForm month={selectMonth} setMonth={setSelectMonth} />
      <Gallery month={selectMonth} />
    </main>
  );
}
