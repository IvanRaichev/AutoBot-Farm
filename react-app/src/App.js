import "./styles/reset.css"
import "./styles/main.css"

import Home from "./pages/Home"
import Npc from "./pages/Npc";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
         
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Npc" element={<Npc />}/>
          </Routes>
      </HashRouter>
      
    </div>
  );
}

export default App;
