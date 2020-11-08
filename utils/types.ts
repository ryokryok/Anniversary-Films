export type MovieDataResponse = {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieData[];
};

export type MovieData = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
};
