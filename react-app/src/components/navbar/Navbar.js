import "./style.css"

import { NavLink } from "react-router-dom";

const Navbar = () => {
   return (
      <header className="header">
         <div className="container">
            <nav className="menu">
               <ul className="menu__list">
                  <li className="menu__item">
                     <NavLink to="/" className="menu__item-click">
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path className="path"
                              d="M17.53 15.24H4.4C4.24283 15.2414 4.0893 15.1927 3.96164 15.101C3.83399 15.0094 3.73885 14.8794 3.69 14.73L0.500002 5C0.451129 4.86009 0.446 4.70861 0.485298 4.56571C0.524595 4.42281 0.606458 4.29525 0.720002 4.2C0.832145 4.10161 0.97141 4.03941 1.11953 4.02157C1.26764 4.00372 1.4177 4.03106 1.55 4.1L7.37 7L10.37 1.18C10.4392 1.06398 10.5373 0.967898 10.6547 0.901177C10.7722 0.834456 10.9049 0.799377 11.04 0.799377C11.1751 0.799377 11.3078 0.834456 11.4253 0.901177C11.5427 0.967898 11.6408 1.06398 11.71 1.18L14.71 7.01L20.54 4.11C20.6708 4.0419 20.8191 4.01501 20.9655 4.03286C21.1119 4.05071 21.2494 4.11247 21.36 4.21C21.4557 4.31491 21.5197 4.44486 21.5445 4.58471C21.5693 4.72456 21.5539 4.86858 21.5 5L18.24 14.72C18.1929 14.8713 18.0985 15.0034 17.9707 15.097C17.8429 15.1906 17.6884 15.2407 17.53 15.24V15.24ZM5 13.74H17L19.51 6.25L14.64 8.67C14.5528 8.71462 14.4576 8.74148 14.3599 8.74902C14.2623 8.75656 14.1641 8.74464 14.0711 8.71394C13.978 8.68325 13.892 8.63439 13.818 8.57019C13.744 8.506 13.6835 8.42776 13.64 8.34L11 3.16L8.37 8.34C8.32648 8.42776 8.26597 8.506 8.19197 8.57019C8.11798 8.63439 8.03198 8.68325 7.93895 8.71394C7.84593 8.74464 7.74774 8.75656 7.65007 8.74902C7.5524 8.74148 7.45721 8.71462 7.37 8.67L2.48 6.22L5 13.74Z"
                              fill="#87B0D1" />
                        </svg>
                        <span className="menu__item-link ">Farm Gate</span>
                     </NavLink>
                  </li>
                  <li className="menu__item">
                     <NavLink to="/Npc" className="menu__item-click">
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M17.43 18C14.56 18 13.06 15.33 12.55 14.18H9.44999C8.93999 15.37 7.43999 18 4.56999 18C0.679993 18 0.679993 14.73 0.679993 13.34C0.679993 11.65 3.37999 6.34 3.91999 5.34C3.99263 5.23013 4.09258 5.14102 4.21004 5.08142C4.3275 5.02181 4.45843 4.99376 4.58999 5H17.41C17.5484 5.00084 17.684 5.03948 17.8021 5.11173C17.9201 5.18399 18.0162 5.28712 18.08 5.41C18.62 6.41 21.32 11.73 21.32 13.41C21.32 14.77 21.32 18 17.43 18ZM8.93999 12.72H13.06C13.2172 12.7186 13.3707 12.7673 13.4984 12.859C13.626 12.9506 13.7211 13.0806 13.77 13.23C13.77 13.23 14.93 16.54 17.43 16.54C19.65 16.54 19.82 15.23 19.82 13.38C19.82 12.46 18.21 8.92 16.95 6.46H5.04999C3.78999 8.92 2.17999 12.46 2.17999 13.38C2.17999 15.23 2.34999 16.54 4.56999 16.54C7.06999 16.54 8.21999 13.26 8.22999 13.23C8.27884 13.0806 8.37398 12.9506 8.50164 12.859C8.62929 12.7673 8.78282 12.7186 8.93999 12.72Z"
                              fill="#87B0D1" />
                           <path
                              d="M11 6.46002C10.8248 6.46076 10.6549 6.40017 10.5198 6.28874C10.3846 6.17732 10.2927 6.02211 10.26 5.85002C10.1603 5.20468 10.1903 4.54593 10.3482 3.91233C10.5062 3.27873 10.789 2.683 11.18 2.16002C11.7217 1.58541 12.3862 1.14043 13.1237 0.858216C13.8613 0.575998 14.653 0.463813 15.44 0.530016C15.5385 0.530016 15.636 0.549416 15.727 0.587107C15.818 0.624798 15.9007 0.680042 15.9703 0.749686C16.04 0.81933 16.0952 0.90201 16.1329 0.993004C16.1706 1.084 16.19 1.18152 16.19 1.28002C16.19 1.37851 16.1706 1.47603 16.1329 1.56703C16.0952 1.65802 16.04 1.7407 15.9703 1.81035C15.9007 1.87999 15.818 1.93524 15.727 1.97293C15.636 2.01062 15.5385 2.03002 15.44 2.03002C14.8757 1.97252 14.3057 2.03942 13.7701 2.22602C13.2345 2.41261 12.7464 2.71436 12.34 3.11002C11.8291 3.82526 11.6142 4.71013 11.74 5.58002C11.7572 5.67721 11.7551 5.77686 11.7338 5.87324C11.7125 5.96962 11.6723 6.06084 11.6156 6.14167C11.559 6.2225 11.4869 6.29134 11.4035 6.34425C11.3202 6.39717 11.2272 6.43311 11.13 6.45002L11 6.46002Z"
                              fill="#87B0D1" />
                        </svg>
                        <span className="menu__item-link">Farm NPC / PvP</span>
                     </NavLink>

                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
}

export default Navbar;