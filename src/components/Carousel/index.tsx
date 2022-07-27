import { useState, useEffect } from "react";
import { NasaImageType } from "../../hooks/useApiHook";

const VISIBLE_IMAGES = 1;

const Carousel = ({ images }: { images: NasaImageType[] | [] }) => {
  let sliderImg:any = {};
  const [currentIndex, setCurrentIndex] = useState(3);

  useEffect(() => {
    showVisibleSlider();
  }, []);

  useEffect(() => {
    changeImages();
  }, [currentIndex]);

  const showVisibleSlider = () => {
    for (let i = currentIndex - VISIBLE_IMAGES; i < currentIndex; i++) {
      if (i === currentIndex - VISIBLE_IMAGES) {
        sliderImg[i].classList.add("leftImg");
        sliderImg[i].classList.remove("hidden");
      } else {
        if (sliderImg[i].classList.contains("leftImg"))
          sliderImg[i].classList.remove("leftImg");
        sliderImg[i].classList.remove("hidden");
      }
    }
  };

  const changeImages = () => {
    Object.keys(sliderImg).forEach(item => {
      sliderImg[item].classList.add("hidden");
    });
    showVisibleSlider();
  };

  const renderImages = () => {
    return images && images.map((item, index) => {
      let classname = "imageWrapper hidden";
      return (
        <div
          className={classname}
          key={index}
          id={`img${index}`}
          ref={instance => (sliderImg[index] = instance)}
        >
          <img src={item.url} className="sliderImg" alt="" />
        </div>
      );
    });
  };

  const rightHandler = () => {
    setCurrentIndex(currentIndex + 1 > images.length
      ? VISIBLE_IMAGES
      : currentIndex + 1);
  };

  const lefthandler = () => {
    setCurrentIndex(currentIndex - 1 > images.length
      ? VISIBLE_IMAGES
      : currentIndex + 1);
  };
  
  return (
    <>
      <div className="container">{renderImages()}</div>
        <div>
          <button className="leftArrow" onClick={lefthandler}>
            Left
          </button>
          <button className="rightArrow" onClick={rightHandler}>
            Right
          </button>
        </div>
    </>
  );
};

export default Carousel;
