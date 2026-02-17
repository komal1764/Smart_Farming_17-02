import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Verify from "./Verify";
import Home from "./Home";
import PotatoDetection from "./PotatoDetection";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />   
        <Route path="/home" element={<Home />} />
        <Route path="/potato" element={<PotatoDetection />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
