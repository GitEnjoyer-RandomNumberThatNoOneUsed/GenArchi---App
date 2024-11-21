import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Test from "./pages/Test";
import StockManagement from "./pages/Stock";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Banner applicationsName="Stock Management"></Banner>
        <Routes>
          <Route path="/" element={<StockManagement />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
