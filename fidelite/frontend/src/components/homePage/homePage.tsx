import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToSprint0 = () => {
    navigate("/sprint0");
  };

  const goToCommunication = () => {
    navigate("/communication");
  };

  const goToFidelityList = () => {
    navigate("/fidelityList");
  };

  return (
    <div className="max-w-2xl p-20 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-2 text-4xl font-semibold text-center">
        Welcome to the Fidelity's application
      </h1>
      <h2 className="mb-6 text-2xl font-light text-center text-gray-600">
        Enhance your customer loyalty with Darty's cutting-edge solutions
      </h2>
      <h3 className="mb-6 text-xl font-light text-center text-gray-500">
        Aurane - Maëva - Juliette
      </h3>
      <ul className="space-y-4">
        <li>
          <button
            className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
            onClick={goToFidelityList}
          >
            View fidelity clients
          </button>
        </li>
        <li>
          <button
            className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
            onClick={goToSprint0}
          >
            List and manage data
          </button>
        </li>
        <li>
          <button
            className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
            onClick={goToCommunication}
          >
            Communicate with other applications
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
