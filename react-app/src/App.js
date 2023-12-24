import "./styles/reset.css"
import "./styles/main.css"

import Home from "./pages/Home"
import Npc from "./pages/Npc";
// import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

// function Main() {
//   return (
//     <div>
//       <h1>Main</h1>
//       <NavLink to="/edit">Go to Edit</NavLink>
//     </div>
//   );
// }

// function Edit() {
//   return (
//     <div>
//       <h1>Edit</h1>
//       <NavLink to="/">Go to Main</NavLink>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      {/* <HashRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
          </Routes>
        </HashRouter> */}

        {/* <Home/> */}
        <Npc/>
    </div>
  );
}

export default App;
