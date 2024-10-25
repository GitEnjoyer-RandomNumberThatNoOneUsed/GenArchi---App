import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Test from "./pages/Test"

const App: React.FC = () => {
  return (
    <div>
      <Router>
      <Banner applicationsName="TMS"></Banner>
        <Routes>
          <Route path="/" element={<Test/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;