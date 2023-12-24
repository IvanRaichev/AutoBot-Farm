import "./styles/reset.css"
import "./styles/main.css"

import Home from "./pages/Home"
import Npc from "./pages/Npc";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
         
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Npc" element={<Npc />}/>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;
