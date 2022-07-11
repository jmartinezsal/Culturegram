import { useState } from 'react';

import { AiFillLeftCircle } from 'react-icons/ai';
import {AiFillRightCircle} from 'react-icons/ai';


function ImageSlider({ images, type }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }


  return (
    <div className="slider">
      {length !== 1 && (<>
          <AiFillLeftCircle onClick={prevSlide} className="left-clicker" />
          <AiFillRightCircle onClick={nextSlide} className="right-clicker" />
      </>
      )
      }
      {images.map((image, idx) => (
        <div className={idx === current ? 'slide active' : 'slide'} key={idx}>
          {idx === current && (
            <img src={type === 'post' ? image["data_url"] : image.url} alt={image.url} key={idx} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageSlider;
