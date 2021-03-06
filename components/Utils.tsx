import React from "react";
import Modal from "react-modal";
import {
  createTweetText,
  formatFullDate,
  getOfficialCountryName,
} from "../lib/formatText";
import { MovieData } from "../lib/types";
import { useModal } from "../lib/hooks";

type SearchFormProps = {
  month: string;
  handleChangeMonth: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchForm({ month, handleChangeMonth }: SearchFormProps) {
  return (
    <div className="flex justify-center p-2">
      <form className="w-full max-w-sm">
        <div className="flex items-center border border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="month"
            value={month}
            onChange={handleChangeMonth}
          />
        </div>
      </form>
    </div>
  );
}

type GalleryProps = {
  data: MovieData[];
};

export function Gallery({ data }: GalleryProps) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 justify-items-auto">
        {data.map((md) => {
          return <MovieCard movieData={md} key={md.id} />;
        })}
      </div>
    </div>
  );
}

type MovieCardProps = {
  movieData: MovieData;
};

function MovieCard({ movieData }: MovieCardProps) {
  const { title, poster_path, release_date } = movieData;
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div className="flex flex-col justify-between items-stretch max-w-sm rounded overflow-hidden shadow-lg">
      <div className="bg-gray-400" onClick={openModal}>
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          className="object-contain h-56 lg:h-64 w-full text-center"
        />
      </div>
      <div className="align-top font-bold text-lg m-2">{title}</div>
      <div className="text-gray-700 text-base text-right text-bottom m-2">
        {formatFullDate(release_date)}
      </div>
      <MovieInfoModal
        movieData={movieData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}

type MovieInfoModalProps = {
  movieData: MovieData;
  isModalOpen: boolean;
  closeModal: () => void;
};

function MovieInfoModal({
  movieData,
  isModalOpen,
  closeModal,
}: MovieInfoModalProps) {
  const {
    id,
    title,
    overview,
    release_date,
    backdrop_path,
    poster_path,
    original_title,
    original_language,
  } = movieData;
  Modal.setAppElement("#__next");
  return (
    <Modal
      isOpen={isModalOpen}
      className="absolute max-h-screen overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center"
      onRequestClose={closeModal}
    >
      <div className="max-w-xl p-2 bg-white flex flex-col">
        <img
          src={`https://image.tmdb.org/t/p/original${
            backdrop_path ? backdrop_path : poster_path
          }`}
          alt={title}
          className="object-contain w-full mb-2"
        />

        <div className="font-bold text-lg">{title}</div>
        <div className="text-md mb-2 text-gray-600">
          {original_title} {`(${getOfficialCountryName(original_language)})`}
        </div>
        <div className="text-gray-700 text-base mb-2">{`${formatFullDate(
          release_date
        )} 公開`}</div>
        <div className="text-md mb-4">{overview}</div>
        <div className="flex flex-col">
          <TmdbButton id={id} />
          <TweetButton movieData={movieData} />
          <CloseButton buttonHandler={closeModal} />
        </div>
      </div>
    </Modal>
  );
}

type CloseButtonProps = {
  buttonHandler: () => void;
};

function CloseButton({ buttonHandler }: CloseButtonProps) {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold text-center p-2 my-2 rounded"
      onClick={buttonHandler}
    >
      Close
    </button>
  );
}

type TmdbButtonProps = {
  id: number;
};

function TmdbButton({ id }: TmdbButtonProps) {
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

type TweetButtonProps = {
  movieData: MovieData;
};

function TweetButton({ movieData }: TweetButtonProps) {
  const { id, title, release_date } = movieData;
  return (
    <a
      href={createTweetText(id, title, release_date)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-center p-2 rounded"
    >
      Tweet
    </a>
  );
}
