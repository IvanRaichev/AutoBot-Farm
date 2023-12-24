import Navbar from "../components/navbar/Navbar"
import Settings from "../components/settings/Settings"
import Button from "../components/button/Button"
import { settings } from "../helpers/settingsList"

const Npc = () => {
   return (
      <>
         <Navbar />
         <main className="main">
            <section className="structur">
               <div className="container">
                  <div className="structur-box">
                     <div className="main__settings settings">
                        <h2 className="settings__title">Settings NPC</h2>
                        <ul className="settings__list">
                        {settings
                           .filter(item => item.content === "Npc")
                           .map((settings, index)=>{
                              return(
                                 <Settings key={index} title={settings.title} img={settings.img} id={settings.id} for={settings.for} alt={settings.alt}/>
                              )
                           })}

                        </ul>
                     </div>
                     <div className="main__settings settings">
                        <h2 className="settings__title">Settings PVP</h2>
                        <ul className="settings__list">
                        {settings
                           .filter(item => item.content === "PvP")
                           .map((settings, index)=>{
                              return(
                                 <Settings key={index} title={settings.title} img={settings.img} id={settings.id} for={settings.for} alt={settings.alt}/>
                              )
                           })}
                        </ul>
                     </div>
                  </div>
                  <div className = "buttons">
                  <Button title="Start NPC" name="button__start btn-npc"/>
                  <Button title="Start PvP" name="button__start btn-pvp"/>
               </div>
               </div>

               
            </section>
         </main>
      </>
   );
}

export default Npc;