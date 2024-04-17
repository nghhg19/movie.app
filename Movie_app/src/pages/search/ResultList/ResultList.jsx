import React, { useState } from "react";

import MovieDetail from "../../browse/MovieDetail/MovieDetail";
import classes from "./ResultList.module.scss";

function ResultList(props) {
  const [isHidden, setIsHidden] = useState(false);
  const [movieDetail, setmovieDetail] = useState();

  // Xử lý sự kiện click trên ảnh phim để hiển thị chi tiết phim
  const movieDetailHandler = (e) => {
    if (movieDetail === e.target) {
      setIsHidden(!isHidden);
    } else {
      setIsHidden(true);
    }
    setmovieDetail(e.target);
    console.log(e.target);
  };
  return (
    <>
      <h3 className={classes.title}>Search Result</h3>
      <div className={classes.list}>
        {props.movielist
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <img
              key={movie.id}
              id={movie.id}
              name={movie.name || movie.title}
              releasedate={movie.release_date}
              vote={movie.vote_average}
              overview={movie.overview}
              backdrop={movie.backdrop_path}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={classes.item}
              onClick={movieDetailHandler}
            />
          ))}
      </div>
      {/* Hiển thị chi tiết phim nếu được chọn */}
      {isHidden && (
        <MovieDetail
          id={movieDetail.id}
          name={movieDetail.name || movieDetail.title}
          releasedate={movieDetail.getAttribute("releasedate")}
          vote={movieDetail.getAttribute("vote")}
          overview={movieDetail.getAttribute("overview")}
          backdrop={movieDetail.getAttribute("backdrop")}
        />
      )}
    </>
  );
}

export default ResultList;
