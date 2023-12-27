import "./style.css"

const Button = (props) => {
   return (
      <button className={props.name}>{props.title}</button>
   );
}

export default Button;