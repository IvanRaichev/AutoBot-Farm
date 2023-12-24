import exp from "./../img/setting/exp-boost.svg"
import result from "./../img/setting/result-booster.svg"
import timer from "./../img/setting/timer.svg"
import chara01 from "./../img/main/Chara01.png"
import chara02 from "./../img/main/Chara02.png"
import chara03 from "./../img/main/Chara03.png"
import chara04 from "./../img/main/Chara04.png"

import Navbar from "../components/navbar/Navbar"

const Home = () => {
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
                           <li className="settings__item">
                              <img src={timer} alt="timer" />
                              <span className="settings__link">End of Bot Operation Timer</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check" />
                                 <label for="check" className="checkbox-button"></label>
                              </div>
                           </li>
                           <li className="settings__item">
                              <img src={exp} alt="exp" />
                              <span className="settings__link">Activate EXP Booster</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-exp" />
                                 <label for="check-exp" className="checkbox-button"></label>
                              </div>
                           </li>
                           <li className="settings__item">
                              <img src={result} alt="result" />
                              <span className="settings__link">Activate Result Booster</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-result" />
                                 <label for="check-result" className="checkbox-button"></label>
                              </div>
                           </li>
                        </ul>
                     </div>

                     <aside className="main__choose-person choose-person">
                        <h2 className="choose-person__title">Choose a Gate Character</h2>
                        <ul className="choose-person__list">
                           <li className="settings__item">
                              <span className="settings__link">Enable Choose</span>
                              <div className="settings__checkbox">
                                 <input type="checkbox" id="check-person" />
                                 <label for="check-person" className="checkbox-button"></label>
                              </div>
                           </li>
                        </ul>
                        <div className="choose-person__select slider-person">
                           <div className="slider__choose-item">
                              <img src={chara01} alt="yami" />
                           </div>
                           <div className="slider__choose-item">
                              <img src={chara02} alt="tristan" />
                           </div>
                           <div className="slider__choose-item">
                              <img src={chara03} alt="bonz" />
                           </div>
                           <div className="slider__choose-item">
                              <img src={chara04} alt="mai" />
                           </div>
                        </div>
                     </aside>
                  </div>
                  <div className = "buttons">
                  <button className="button__start btn-test">Start Gate</button>
               </div>
               </div>
            </section>
         </main>
      </>
   );
}

export default Home;