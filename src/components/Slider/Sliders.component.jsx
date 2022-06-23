import './slider.scss'
import React, {useState, useEffect} from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const Slider = () => {
  const [slider, setSlider] = useState(1);
  
  const leftClick = () => {
    setSlider(slider === 1 ? 5 : slider - 1);
  }

  const rightClick = () => {
    setSlider(slider === 5 ? 1 : slider + 1);
  }

  useEffect(() => {
    let slideTime = setTimeout(rightClick, 4000)
    return ()=> clearTimeout(slideTime)
    // eslint-disable-next-line
  }, [slider]);
  
  return(
    <div className='sliders'>
      <div className='slider'>
        <BsChevronLeft className='arrow left-arrow' onClick={leftClick} />
        <img src={`/slider${slider}.webp`} className='slider-image' alt='slider'/>
        <BsChevronRight className='arrow right-arrow' onClick={rightClick} />
      </div>
    </div>
  )
}

export default Slider