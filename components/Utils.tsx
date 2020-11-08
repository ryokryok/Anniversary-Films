import React, { useState } from "react";
import useSWR from "swr";
import Modal from "react-modal";
import { fetchAPI } from "../utils/api";
import { createTweetText, formatFullDate, getOfficialCountryName } from "../utils/formatText";
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
          return <MovieCard movieData={md} key={md.id} />;
        })}
      </div>
    </div>
  );
}

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return { isModalOpen, openModal, closeModal };
}

function MovieCard({ movieData }: { movieData: MovieData }) {
  const { title, poster_path, release_date } = movieData;
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg">
      <div className="bg-gray-400">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          className="object-contain h-56 w-full text-center"
        />
      </div>
      <div className="p-2 md:p-4">
        <div className="font-bold text-lg mb-4">{title}</div>
        <div className="text-gray-700 text-base">{formatFullDate(release_date)}</div>
        <button
          className="absolute bottom-0 right-0 border-gray border-solid border-2 font-bold m-2 p-2 rounded shadow-lg"
          onClick={openModal}
        >
          Info
        </button>
        <MovieInfoModal movieData={movieData} isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}

function MovieInfoModal({
  movieData,
  isModalOpen,
  closeModal,
}: {
  movieData: MovieData;
  isModalOpen: boolean;
  closeModal: () => void;
}) {
  const { id, title, overview, release_date, backdrop_path, original_title } = movieData;
  Modal.setAppElement("#__next");
  return (
    <Modal
      isOpen={isModalOpen}
      className="absolute"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center"
      onRequestClose={closeModal}
    >
      <div className="max-w-xl p-2 bg-white flex flex-col">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
          className="object-contain w-full mb-2"
        />

        <div className="font-bold text-lg">{title}</div>
        <div className="text-md mb-2 text-gray-600">
          {original_title} {`(${getOfficialCountryName(movieData.original_language)})`}
        </div>
        <div className="text-gray-700 text-base mb-2">{`${formatFullDate(release_date)} 公開`}</div>
        <div className="text-md mb-4">{overview}</div>
        <TmdbButton id={id} />
        <TweetButton movieData={movieData} />
      </div>
    </Modal>
  );
}

function TmdbButton({ id }: { id: number }) {
  return (
    <a
      href={`https://www.themoviedb.org/movie/${id}`}
      className="bg-green-500 hover:bg-green-700 text-white font-bold text-center p-2 my-2 rounded"
      target="_blank"
      rel="noreferrer noopener"
    >
      More Info(TMDB)
    </a>
  );
}

function TweetButton({ movieData }: { movieData: MovieData }) {
  const { id, title, release_date } = movieData;
  return (
    <a
      href={createTweetText(id, title, release_date)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-center p-2 rounded"
    >
      tweet
    </a>
  );
}
