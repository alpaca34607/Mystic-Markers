import React, { useState } from "react";
import "../../css/carousel.css";

const images = [
  { src: "/images/storyintro1.jpg", alt: "黃色小飛俠", link: "#Story" },
  { src: "/images/storyintro2.jpg", alt: "山羊人", link: "#Story" },
  { src: "/images/storyintro3.jpg", alt: "紅衣小女孩", link: "#Story" },
  { src: "/images/storyintro4.jpg", alt: "每月精選文章", link: "#Story" },
  { src: "/images/storyintro5.jpg", alt: "宮燈姊姊", link: "#Story" },

];

const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);

  const moveToSelected = (direction) => {
    if (direction === "next") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === "prev") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const getClassName = (index) => {
    const relativeIndex = (index - selectedIndex + images.length) % images.length;

    if (relativeIndex === 0) return "selected";
    if (relativeIndex === 1) return "next";
    if (relativeIndex === 2) return "nextRightSecond";
    if (relativeIndex === images.length - 1) return "prev";
    if (relativeIndex === images.length - 2) return "prevLeftSecond";
    return relativeIndex > 2 ? "hideRight" : "hideLeft";
  };


  return (
    <div id="carousel-area">
      <div id="carousel">
        {images.map((image, index) => (
          <div className={getClassName(index)} key={index}>

            <div className="img-wrap">
              <span className="img-text">{image.alt}</span>
              <img src={image.src} alt={image.alt} />
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="icon-btn" onClick={() => moveToSelected("prev")}><img src="/images/arrow_L.svg" alt="prev" className='icon-img' /></button>
        <button className="icon-btn" onClick={() => moveToSelected("next")}><img src="/images/arrow_R.svg" alt="next" className='icon-img' /></button>
      </div>
    </div>
  );
};

export default Carousel;
