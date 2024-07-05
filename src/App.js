import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/dashboard/DashBoard";
import TicTacTo from "./pages/tictacto";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/SignIn" element={<SignIn/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/DashBoard" element={<DashBoard/>}></Route>
          <Route path="/TicTacTo" element={<TicTacTo/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;