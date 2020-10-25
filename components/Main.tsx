import React, { useState } from "react";
import { MovieData, MovieDataResponse } from "../utils/types";
import mock_data from "../utils/mock_data_2010_10.json";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetchAPI } from "../utils/api";

export function Main() {
  const { data, error } = useSWR<MovieDataResponse, any>("2010-10", fetchAPI);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <main className="">
      <Gallery movieData={data.results} />
    </main>
  );
}

function SearchForm({
  searchMonth,
  setSearchMonth,
}: {
  searchMonth: string;
  setSearchMonth: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchMonth(event.target.value);
  }
  return (
    <form className="w-full max-w-sm">
      <div className="flex items-center border-b border-orange-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="month"
          value={searchMonth}
          onChange={handleInput}
        />
      </div>
    </form>
  );
}

function Gallery({ movieData }: { movieData: MovieData[] }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-auto">
        {movieData.map((md) => {
          return (
            <div
              key={md.id}
              className="relative max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="bg-gray-400">
                <img
                  src={`https://image.tmdb.org/t/p/original${md.poster_path}`}
                  alt={md.title}
                  className="object-contain h-64 w-full"
                />
              </div>
              <div className="p-2 md:p-4">
                <div className="font-bold text-lg mb-4">{md.title}</div>
                <div className="text-gray-700 text-base">
                  {dayjs(md.release_date).format("YYYY年MM月DD日")}
                </div>
                <TweetButton
                  title={md.title}
                  releaseYear={dayjs().year() - dayjs(md.release_date).year()}
                  releaseDate={dayjs(md.release_date).format("MM月DD日")}
                  id={md.id}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TweetButton({
  title,
  releaseYear,
  releaseDate,
  id,
}: {
  title: string;
  releaseYear: number;
  releaseDate: string;
  id: number;
}) {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${title}は${releaseYear}年前の${releaseDate}公開!&url=https://www.themoviedb.org/movie/${id}`}
      className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2 rounded"
    >
      tweet
    </a>
  );
}
