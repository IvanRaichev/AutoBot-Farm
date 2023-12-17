import "./App.css";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
// import Button from "./Button";
// import YourComponent from "./YourComponent";

function Main() {
  return (
    <div>
      <h1>Main</h1>
      <NavLink to="/edit">Go to Edit</NavLink>
    </div>
  );
}

function Edit() {
  return (
    <div>
      <h1>Edit</h1>
      <NavLink to="/">Go to Main</NavLink>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
          </Routes>
        </HashRouter>
        <div className="btn-container">

        <button className="btn-test">Start script</button>
        <button className="btn-test2">Start script N2</button>
        <button className="btn-test3">Start script N3</button>
        </div>
        {/* <Button /> */}
        {/* <YourComponent /> */}
      </header>
    </div>
  );
}

export default App;
