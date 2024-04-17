import React, { useRef } from "react";
import styles from "./movieList.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MovieList(props) {
  const { data } = props;
  const isBackdrop = props.isBackdrop;
  const scrollContainerRef = useRef(null);

  // Hàm scroll qua trái
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 500;
    }
  };

  // Hàm scroll qua phải
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 500;
    }
  };

  if (data) {
    return (
      <div className={styles.movies}>
        <button onClick={scrollLeft} className={styles.btnScrollLeft}>
          <FaChevronLeft />
        </button>
        <button onClick={scrollRight} className={styles.btnScrollRight}>
          <FaChevronRight />
        </button>
        <div className={styles.movieList} ref={scrollContainerRef}>
          {data.map((item) => {
            return (
              <img
                key={item.id}
                src={
                  isBackdrop
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                }
                id={item.id}
                idclick={props.idClick}
                name={item.name || item.title}
                releasedate={item.release_date}
                vote={item.vote_average}
                overview={item.overview}
                backdrop={item.backdrop_path}
                onClick={props.onClick}
                alt={item.name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MovieList;
