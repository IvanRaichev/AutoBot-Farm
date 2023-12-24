import React, { useState, useEffect } from 'react';
import Input from "../input/Input";
import "./style.css";

const Settings = (props) => {
   const [isChecked, setIsChecked] = useState(false); 

   useEffect(() => {
      const checkbox = document.getElementById('check-person');
      const sliderElement = document.querySelector('.slick-slider');

      if (sliderElement && checkbox) {
         if (!checkbox.checked) {
            sliderElement.classList.add('hidden');
         }
      }
   }, []);

   const handleInputChange = (e) => {
      setIsChecked(e.target.checked);
      
      const sliderElement = document.querySelector('.slick-slider');
      if (sliderElement) {
         if (e.target.checked) {
            sliderElement.classList.remove('hidden');
         } else {
            sliderElement.classList.add('hidden');
         }
      }
   };

   return (
      <li className="settings__item">
         {props.img && <img src={props.img} alt={props.alt} />}
         <span className="settings__link">{props.title}</span>

         <Input id={props.id} htmlFor={props.for} onChange={handleInputChange} />
      </li>
   );
}

export default Settings;
