import React, { useState } from "react";
import { MovieData, MovieDataResponse } from "../utils/types";
import mock_data from "../utils/mock_data_2010_10.json";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetchAPI } from "../utils/api";

export function Main() {
  const [selectMonth, setSelectMonth] = useState("2010-10");
  return (
    <main className="">
      <SearchForm month={selectMonth} setMonth={setSelectMonth} />
      <Gallery month={selectMonth} />
    </main>
  );
}

function SearchForm({
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

function Gallery({ month }: { month: string }) {
  const { data, error } = useSWR<MovieDataResponse, any>(month, fetchAPI);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-auto">
        {data.results.map((md) => {
          return (
            <div
              key={md.id}
              className="relative max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="bg-gray-400">
                <img
                  src={`https://image.tmdb.org/t/p/original${md.poster_path}`}
                  alt={md.title}
                  className="object-contain h-56 w-full"
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

export function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
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
