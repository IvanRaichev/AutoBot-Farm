import exp from "./../img/setting/exp-boost.svg"
import result from "./../img/setting/result-booster.svg"
import Navbar from "../components/navbar/Navbar"

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
                           <li className="settings__item">
                              <img src={exp} alt="exp" />
                              <span className="settings__link">Activate EXP Booster on Vagabond</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-exp-npc" />
                                 <label for="check-exp-npc" className="checkbox-button"></label>
                              </div>
                           </li>
                           <li className="settings__item">
                              <img src={exp} alt="result" />
                              <span className="settings__link">Activate Result Booster on Vagabond</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-result-npc" />
                                 <label for="check-result-npc" className="checkbox-button"></label>
                              </div>
                           </li>
                           <li className="settings__item">
                              <img src={result} alt="exp" />
                              <span className="settings__link">Activate Restart Duel Orb</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-exp-npc" />
                                 <label for="check-exp-npc" className="checkbox-button"></label>
                              </div>
                           </li>

                        </ul>
                     </div>
                     <div className="main__settings settings">
                        <h2 className="settings__title">Settings PVP</h2>
                        <ul className="settings__list">
                           <li className="settings__item">
                              <img src={exp} alt="exp" />
                              <span className="settings__link">Activate EXP Booster</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-exp-pvp" />
                                 <label for="check-exp-pvp" className="checkbox-button"></label>
                              </div>
                           </li>
                           <li className="settings__item">
                              <img src={exp} alt="result" />
                              <span className="settings__link">Activate Result Booster</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-result-pvp" />
                                 <label for="check-result-pvp" className="checkbox-button"></label>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className = "buttons">
                  <button className="button__start btn-test2">Start NPC</button>
                  <button className="button__start btn-test3">Start PvP</button>
               </div>
               </div>

               
            </section>
         </main>
      </>
   );
}

export default Npc;