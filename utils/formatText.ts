import "dayjs/locale/ja";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";

export function formatFullDate(originalDate: string): string {
  return dayjs(originalDate).format("YYYY年MM月DD日");
}

export function formatMonthDayDate(originalDate: string): string {
  return dayjs(originalDate).format("MM月DD日");
}

export function calcReleaseYear(date: string): string {
  const resultYear = dayjs().year() - dayjs(date).year();
  return resultYear === 0 ? "今年" : `${resultYear}年前`;
}

export function createTweetText(id: number, title: string, releaseDate: string): string {
  return `https://twitter.com/intent/tweet?text=${title}は${calcReleaseYear(releaseDate)}の${formatMonthDayDate(
    releaseDate
  )}公開!&url=https://www.themoviedb.org/movie/${id}`;
}

export function getOfficialCountryName(alpha2: string): string {
  const countryName = ISO6391.getName(alpha2);
  return countryName === "" ? alpha2 : countryName;
}
