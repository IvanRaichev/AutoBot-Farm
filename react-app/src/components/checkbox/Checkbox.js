import "./style.css"

const Checkbox = (props) => {

   const handleChange = (e) => {
      if (props.onChange) {
         props.onChange(e);
      }
   };

   return (
      <div className="checkbox">
         <input type="checkbox" id={props.id}  onChange={handleChange}/>
         <label htmlFor={props.htmlFor} className="checkbox-button"></label>
      </div>
   );
}

export default Checkbox;