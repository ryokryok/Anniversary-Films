import axios from "axios";
import { MovieDataResponse } from "./types";
import dayjs from "dayjs";

function getStartDate(month: string): string {
  return dayjs(month).startOf("month").format("YYYY-MM-DD");
}

function getEndDate(month: string): string {
  return dayjs(month).endOf("month").format("YYYY-MM-DD");
}

export function fetchAPI(month: string): Promise<MovieDataResponse> {
  return axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: "ja-JP",
        region: "JP",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page: 1,
        "release_date.gte": getStartDate(month),
        "release_date.lte": getEndDate(month),
        with_release_type: decodeURI("1|2|3|4|5|6"),
      },
    })
    .then((res) => res.data);
}
