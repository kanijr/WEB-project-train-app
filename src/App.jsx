import "./App.css";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route path="/booking/:trainId" element={<Booking />} />
    </Routes>
  );
}

export default App;
