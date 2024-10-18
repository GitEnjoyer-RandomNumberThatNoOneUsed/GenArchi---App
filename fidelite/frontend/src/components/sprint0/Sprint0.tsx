import { useNavigate } from "react-router-dom";
import Sprint0List from "./Sprint0List";

const Sprint0 = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="mb-6 ml-5 mt-7">
        <button
          className="px-4 py-2 text-white bg-black hover:bg-slate-600"
          onClick={goToHome}
        >
          Back to Home Page
        </button>
      </div>
      <Sprint0List />
    </div>
  );
};

export default Sprint0;
