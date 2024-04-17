import React, { useState } from "react";
import styles from "./Browse.module.scss";
import Navbar from "./narbar/navbar";
import useFetch from "../../fetchAPI/useFetch";
import Banner from "./banner/banner";
import MovieList from "./MovieList/movieList";
import MovieDetail from "./MovieDetail/MovieDetail";

function Browse() {
  const API_KEY = "4364584ccb3f3d77ebc314cc4d7eb35a";
  const [isHidden, setIsHidden] = useState(false);
  const [movieDetail, setmovieDetail] = useState();
  const [clickedImg, setClickedImg] = useState();
  const [idMovieDetail, setIdMovieDetail] = useState(0);

  // Các yêu cầu API cho các danh sách phim
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  // Danh sách các loại phim cùng với API tương ứng
  const dataListMovie = [
    {
      id: "1",
      name: "Original",
      data: useFetch(requests.fetchNetflixOriginals),
    },
    { id: "2", name: "Xu hướng", data: useFetch(requests.fetchTrending) },
    { id: "3", name: "Xếp hạng cao", data: useFetch(requests.fetchTopRated) },
    { id: "4", name: "Hành động", data: useFetch(requests.fetchActionMovies) },
    { id: "5", name: "Hài", data: useFetch(requests.fetchComedyMovies) },
    { id: "6", name: "Kinh dị", data: useFetch(requests.fetchHorrorMovies) },
    { id: "7", name: "Lãng mạn", data: useFetch(requests.fetchRomanceMovies) },
    { id: "8", name: "Tài liệu", data: useFetch(requests.fetchDocumentaries) },
  ];

  // Xử lý sự kiện click trên ảnh phim để hiển thị chi tiết phim
  const movieDetailHandler = (e) => {
    const parentDiv = e.target.getAttribute("idclick");
    setClickedImg(parentDiv);
    setmovieDetail(e.target);
    if (idMovieDetail === e.target.id && clickedImg === parentDiv) {
      setIsHidden(!isHidden);
    } else {
      setIsHidden(true);
    }
    setIdMovieDetail(e.target.id);
    console.log(movieDetail);
  };

  if (dataListMovie) {
    return (
      <div className={styles.browse}>
        <Navbar />
        <Banner data={dataListMovie[0].data.results} />
        {dataListMovie.map((item) => {
          return (
            <div key={item.name}>
              <h3 className={styles.title}>{item.name}</h3>
              <MovieList
                data={item.data.results}
                isBackdrop={item.name === "Original" ? true : false}
                onClick={movieDetailHandler}
                idClick={item.id}
              />
              {/* Hiển thị chi tiết phim nếu có */}
              {isHidden && clickedImg === item.id && (
                <MovieDetail
                  id={movieDetail.id}
                  name={movieDetail.name || movieDetail.title}
                  releasedate={movieDetail.getAttribute("releasedate")}
                  vote={movieDetail.getAttribute("vote")}
                  overview={movieDetail.getAttribute("overview")}
                  backdrop={movieDetail.getAttribute("backdrop")}
                  autofocus={true}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Browse;
