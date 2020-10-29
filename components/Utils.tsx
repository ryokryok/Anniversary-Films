import React from "react";
import useSWR from "swr";
import { fetchAPI } from "../utils/api";
import { createTweetText, formatFullDate } from "../utils/formatText";
import { MovieData, MovieDataResponse } from "../utils/types";

export function SearchForm({
  month,
  setMonth,
}: {
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setMonth(event.target.value);
  }
  return (
    <div className="flex justify-center py-2">
      <form className="w-full max-w-sm">
        <div className="flex items-center border border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="month"
            value={month}
            onChange={handleInput}
          />
        </div>
      </form>
    </div>
  );
}

export function Gallery({ month }: { month: string }) {
  const { data, error } = useSWR<MovieDataResponse, any>(month, fetchAPI);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-auto">
        {data.results.map((md) => {
          return <MovieCard movieData={md} />;
        })}
      </div>
    </div>
  );
}

function MovieCard({ movieData }: { movieData: MovieData }) {
  const { id, title, poster_path, release_date } = movieData;
  return (
    <div
      key={id}
      className="relative max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div className="bg-gray-400">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          className="object-contain h-56 w-full"
        />
      </div>
      <div className="p-2 md:p-4">
        <div className="font-bold text-lg mb-4">{title}</div>
        <div className="text-gray-700 text-base">
          {formatFullDate(release_date)}
        </div>
        <TweetButton movieData={movieData} />
      </div>
    </div>
  );
}

function TweetButton({ movieData }: { movieData: MovieData }) {
  const { id, title, release_date } = movieData;
  return (
    <a
      href={createTweetText(id, title, release_date)}
      className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2 rounded"
    >
      tweet
    </a>
  );
}
