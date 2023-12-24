import "./style.css"
import React, { useState } from 'react';

const Input = () => {
   const [isActive, setIsActive] = useState(false);

   const handleLabelClick = () => {
       setIsActive(true);
   };

   const handleInputChange = (e) => {
       if (e.target.value) {
           setIsActive(true);
       } else {
           setIsActive(false);
       }
   };


   return (
      <div className="timer__container">
         <label htmlFor="numberInput" className={`timer-label ${isActive ? 'active' : ''}`} onClick={handleLabelClick}>Set minutes</label>
         <input type="number" id="numberInput" className="setting__timer" placeholder="" onChange={handleInputChange}></input>
      </div>

   );
}

export default Input;