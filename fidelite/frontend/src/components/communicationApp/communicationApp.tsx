import { useNavigate } from "react-router-dom";
import CommunicationEcommerce from "./communicationEcommerce";

const CommunicationApp = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="ml-4 mt-7">
        <button
          className="px-4 py-2 text-white bg-black hover:bg-slate-600"
          onClick={goToHome}
        >
          Back to Home Page
        </button>
      </div>
      <h1 className="m-3 mb-6 text-4xl font-bold text-center ">
        Communicate with other applications
      </h1>
      <CommunicationEcommerce />
    </div>
  );
};

export default CommunicationApp;
