import React, { useState, useEffect } from 'react';

import Navbar from "../components/navbar/Navbar"
import Settings from "../components/settings/Settings"

import { settings } from "../helpers/settingsList"
import Button from "../components/button/Button"
import SimpleSlider from "../components/slider/SimpleSlider"
import Input from "../components/input/Input"

const Home = () => {
   const [isTimeChecked, setIsTimeChecked] = useState(false);

   useEffect(() => {
      const timeCheckbox = document.getElementById('check-time');
      const handleChange = () => {
         setIsTimeChecked(timeCheckbox.checked);
      };
   
      if (timeCheckbox) {
         timeCheckbox.addEventListener('change', handleChange);
         return () => {
            timeCheckbox.removeEventListener('change', handleChange);
         };
      }
   }, []);
   

   return (
      <>
         <Navbar />
         <main className="main">
            <section className="structur">
               <div className="container">
                  <div className="structur-box">
                     <div className="main__settings settings">
                        <h2 className="settings__title">Settings</h2>
                        <ul className="settings__list">
                        {settings
                  .filter(item => item.content === "Home")
                  .map((settingsItem, index) => {
                     return (
                        <React.Fragment key={index}>
                           <Settings 
                              title={settingsItem.title} 
                              img={settingsItem.img} 
                              id={settingsItem.id} 
                              for={settingsItem.for} 
                              alt={settingsItem.alt} 
                           />
                           {settingsItem.id === "check-time" && isTimeChecked && <Input />}
                        </React.Fragment>
                     );
                  })}
                        </ul>
                     </div>

                     <aside className="main__choose-person choose-person">
                        <h2 className="choose-person__title">Choose a Gate Character</h2>
                        <ul className="choose-person__list">
                           {settings
                              .filter(item => !item.hasOwnProperty('content'))
                              .map((settings, index) => {
                                 return (
                                    <Settings key={index} title={settings.title} id={settings.id} for={settings.for} />
                                 )
                              })}

                        </ul>
                        <SimpleSlider />
                     </aside>
                  </div>
                  <div className="buttons">
                     <Button title="Start Gate" name="button__start btn-gate" />
                  </div>
               </div>
            </section>
         </main>
      </>
   );
}

export default Home;