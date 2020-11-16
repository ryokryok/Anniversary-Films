import { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetchAPI } from "./api";
import { MovieDataResponse, MovieData } from "./types";
import { errors } from "../out/_next/static/chunks/main";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return { isModalOpen, openModal, closeModal };
}

export function useSelectMonth() {
  const router = useRouter();
  // default value is 5 years ago
  const month =
    (router.query.month as string) === undefined
      ? dayjs().subtract(5, "year").format("YYYY-MM")
      : (router.query.month as string);

  function handleChangeMonth(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    router.push({
      pathname: "/",
      query: { month: event.target.value },
    });
  }
  return { month, handleChangeMonth };
}

export function useFetchMovieData(month: string) {
  const { data, error } = useSWR<MovieDataResponse, any>(month, fetchAPI);
  const { results, page, total_pages } = data;
  return { data, results, page, total_pages, error };
}
