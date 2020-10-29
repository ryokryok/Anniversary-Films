import React, { useState } from "react";
import { Gallery, SearchForm } from "./Utils";

export function Main() {
  const [selectMonth, setSelectMonth] = useState("2010-10");
  return (
    <main className="">
      <SearchForm month={selectMonth} setMonth={setSelectMonth} />
      <Gallery month={selectMonth} />
    </main>
  );
}
