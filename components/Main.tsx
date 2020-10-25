import React from "react";
import { MovieData } from "../utils/types";
import mock_data from "../utils/mock_data_2010_10.json";
import "dayjs/locale/ja";
import dayjs from "dayjs";

export function Main() {
  return (
    <main className="container mx-auto">
      <Gallery movieData={mock_data.results} />
    </main>
  );
}

export function Gallery({ movieData }: { movieData: MovieData[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-auto">
      {movieData.map((md) => {
        return (
          <div className="relative max-w-sm rounded overflow-hidden shadow-lg">
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
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TweetButton({
  title,
  releaseYear,
  releaseDate,
}: {
  title: string;
  releaseYear: number;
  releaseDate: string;
}) {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${title} は ${releaseYear} 年前の ${releaseDate} 公開!`}
      className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2 rounded"
    >
      tweet
    </a>
  );
}
