import { Routes, Route } from "react-router-dom";
import Homepage from "../../Home/Home";


const LandingPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
       
      </Route>
    </Routes>
  );
};

export default LandingPage;
