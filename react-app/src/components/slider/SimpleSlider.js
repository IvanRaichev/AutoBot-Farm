
import "./slick.css"
import "./slick-theme.css"

import chara01 from "./../../img/main/Chara01.png"
import chara02 from "./../../img/main/Chara02.png"
import chara03 from "./../../img/main/Chara03.png"
import chara04 from "./../../img/main/Chara04.png"
import arrowNext from "./../../img/main/arrow-right.png"
import arrowPrev from "./../../img/main/arrow-left.png"

import Slider from "react-slick";
import Card from "../card/Card";
import SliderArrowNext from "../sliderArrowNext/SliderArrowNext"
import SliderArrowPrev from "../sliderArrowPrev/SliderArrowPrev"

const SimpleSlider = () => {

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SliderArrowNext img={arrowNext} />,
      prevArrow: <SliderArrowPrev img={arrowPrev} />
   };

   return (
      <Slider {...settings}>
         <Card img={chara01} alt="yami" />
         <Card img={chara02} alt="tristan" />
         <Card img={chara03} alt="bonz" />
         <Card img={chara04} alt="mai" />
      </Slider>
   );
}

export default SimpleSlider;