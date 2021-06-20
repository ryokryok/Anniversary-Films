import "dayjs/locale/ja";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";

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
  const presentDate = dayjs();
  if (
    dayjs(releaseDate).month() === presentDate.month() &&
    dayjs(releaseDate).date() === presentDate.date()
  ) {
    /* prettier-ignore*/
    return `https://twitter.com/intent/tweet?text=本日は${title}の公開${calcReleaseYear(releaseDate)}周年記念日です!&url=https://www.themoviedb.org/movie/${id}`;
  } else {
    /* prettier-ignore*/
    return `https://twitter.com/intent/tweet?text=${title}は${calcReleaseYear(releaseDate) === 0 ? "今年" : `${calcReleaseYear(releaseDate)}年前` }の${formatMonthDayDate(releaseDate)}公開!&url=https://www.themoviedb.org/movie/${id}`
  }
}

export function getOfficialCountryName(alpha2: string): string {
  const countryName = ISO6391.getName(alpha2);
  return countryName === "" ? alpha2 : countryName;
}
