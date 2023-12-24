const Card = (props) => {
   return (
      <div className="slider__choose-item">
         <img src={props.img} alt={props.alt} />
      </div>
   );
}

export default Card;