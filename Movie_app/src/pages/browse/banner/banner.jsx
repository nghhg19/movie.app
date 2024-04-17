import styles from "./banner.module.scss";
import React, { useState, useEffect } from "react";

const Banner = (props) => {
  //khai báo state để lưu dữ liệu film sau khi random
  const [backdrop, setBackdrop] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");

  //Dữ liệu được truyền từ component cha(Browse)
  const { data } = props;
  console.log(data);

  //Random film từ data
  useEffect(() => {
    if (data && data.length > 0) {
      const randomMovie = data[Math.floor(Math.random() * data.length - 1)];
      //Lưu nội dung film đã random vào các state đã khai báo trước
      setBackdrop(randomMovie?.backdrop_path);
      setName(randomMovie?.name);
      setOverview(randomMovie?.overview);
    }
  }, [data]);

  return (
    <div className={styles.banner}>
      <img
        className={styles.bannerImg}
        src={backdrop && `https://image.tmdb.org/t/p/w500${backdrop}`}
        alt="banner"
      />
      <div className={styles.bannerContent}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.action}>
          <div className={styles.btn}>Play</div>
          <div className={styles.btnFaded}>My List</div>
        </div>
        <p className={styles.overview}>{overview.substring(0, 150)}...</p>
      </div>
    </div>
  );
};

export default Banner;
