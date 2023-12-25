import React, { useState, useEffect } from 'react';
import Checkbox from "../checkbox/Checkbox";
import ReplaceImagePaths from "../../helpers/replaceImagePaths"
import "./style.css";

const Settings = (props) => {
   const [isChecked, setIsChecked] = useState(false); 

   useEffect(() => {
      const sliderElement = document.querySelector('.slick-slider');
      if (sliderElement) {
         if (!isChecked) {
            sliderElement.classList.add('hidden');
         } else {
            sliderElement.classList.remove('hidden');
         }
      }
   }, [isChecked]);

   const handleInputChange = (e) => {
      if (e.target.id === 'check-person') { // Проверяем ID чекбокса
         setIsChecked(e.target.checked);
      }
   };
   return (
      <li className="settings__item">
         {props.img && <img src={props.img} alt={props.alt} />}
         <span className="settings__link">{props.title}</span>

         <Checkbox id={props.id} htmlFor={props.for} onChange={handleInputChange} />
         {ReplaceImagePaths()}
      </li>
      
   );
}

export default Settings;
