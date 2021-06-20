import React from "react";

export function Header() {
  return (
    <header className="flex justify-center m-0">
      <p className="text-xl md:text-2xl text-center bg-gray-700 text-yellow-500 rounded-lg m-1 py-3 px-6 max-w-xs">
        Anniversary-Films
      </p>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="text-base text-center m-4">
      Power by{" "}
      <a className="text-green-600" href="https://www.themoviedb.org/">
        TMDB
      </a>
    </footer>
  );
}
