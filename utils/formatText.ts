import "dayjs/locale/ja";
import dayjs from "dayjs";

export function formatFullDate(originalDate: string): string {
  return dayjs(originalDate).format("YYYY年MM月DD日");
}

export function formatMonthDayDate(originalDate: string): string {
  return dayjs(originalDate).format("MM月DD日");
}

export function calcReleaseYear(date: string): number {
  return dayjs().year() - dayjs(date).year();
}

export function createTweetText(
  id: number,
  title: string,
  releaseDate: string
): string {
  return `https://twitter.com/intent/tweet?text=${title}は${calcReleaseYear(
    releaseDate
  )}年前の${formatMonthDayDate(
    releaseDate
  )}公開!&url=https://www.themoviedb.org/movie/${id}`;
}
