import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sprint0 from "./components/sprint0/Sprint0";
import HomePage from "./components/homePage/homePage";
import Header from "./components/Header";
import CommunicationApp from "./components/communicationApp/communicationApp";
import FidelityList from "./components/fidelity/FidelityList";
import Fidelity from "./components/fidelity/Fidelity";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fidelityList" element={<FidelityList />} />
          <Route path="/fidelities/:fidelityId" element={<Fidelity />} />
          <Route path="sprint0" element={<Sprint0 />} />
          <Route path="communication" element={<CommunicationApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
