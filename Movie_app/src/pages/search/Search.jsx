import React, { useState, useEffect } from "react";

import NavBar from "../browse/narbar/navbar";
import SearchForm from "./SearchForm/SearchForm";
import ResultList from "./ResultList/ResultList";

//omponent trang search
const Search = () => {
  const API_KEY = "4364584ccb3f3d77ebc314cc4d7eb35a";
  const [query, setQuery] = useState("");
  const [moviesList, setMoviesList] = useState();

  //hàm khi click vào nút search và set lại giá trị query là nội dung người dùng nhập
  const searchHandler = (inputValue) => {
    setQuery(inputValue);
  };

  //Hàm khi click vào nút reset và set lại giá trị query là rỗng
  const resetHandler = () => {
    setQuery("");
  };

  //Sử dung useEffect để fetch api dữ liệu search
  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${query}`
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();
        setMoviesList(data.results);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };

    fetchapi();
  }, [query]);
  console.log(moviesList);
  return (
    <div>
      <NavBar isHomeClassname={false} />
      <SearchForm
        onSearch={searchHandler}
        onReset={resetHandler}
        query={query}
      />
      {query && moviesList && <ResultList movielist={moviesList} />}
    </div>
  );
};

export default Search;
