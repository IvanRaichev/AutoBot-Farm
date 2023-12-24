const SliderArrowNext = (props) => {
   const { className,img, onClick } = props;
   return (
      <div
        className={className}
        onClick={onClick}
      >
         <img src={img} alt="arrow"/>
      </div>
    );
}
 
export default SliderArrowNext;