import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./MovieDetail.module.scss";

function MovieDetail(props) {
  const API_KEY = "4364584ccb3f3d77ebc314cc4d7eb35a";
  const [idVideo, setIdVideo] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // Fetch dữ liệu video từ API
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          // Tìm index của video có type là "Trailer" hoặc "Teaser"
          const videoIndex = data.results?.findIndex(
            (movie) =>
              movie.site === "YouTube" &&
              (movie.type === "Trailer" || movie.type === "Teaser")
          );

          if (videoIndex === undefined) {
            return;
          } else if (videoIndex !== -1) {
            // Nếu tìm thấy video, lưu ID của video vào state
            setIdVideo(data.results[videoIndex].key);
          } else {
            setIdVideo(null);
          }
        }
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchMovieDetail();
  }, [props.id]);

  const videoRender =
    props && idVideo ? (
      <YouTube
        className={styles.youtube}
        videoId={idVideo}
        opts={{
          height: "400",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    ) : (
      <img
        className={styles.backdrop}
        src={`https://image.tmdb.org/t/p/w500${props.backdrop}`}
        alt={props.name}
      />
    );

  return (
    <>
      <div className={styles.movie}>
        <div className={styles.detail} style={{ color: "#fff" }}>
          <h4>{props.name}</h4>
          <p className={styles.date}>
            Release Date: {props.releasedate ? props.releasedate : "Not update"}
          </p>
          <p className={styles.vote}>Vote: {props.vote}/10</p>
          <p>{props.overview}</p>
        </div>
        <div className={styles.video} autoFocus>
          {videoRender}
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
