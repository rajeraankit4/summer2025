import { Routes, Route } from "react-router-dom";
import Homepage from "../../Home/Home";
import SignupFlow from "../../Students/SignupFlow";

const LandingPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/student-signup" element={<SignupFlow />} /> */}
    </Routes>
  );
};

export default LandingPage;
