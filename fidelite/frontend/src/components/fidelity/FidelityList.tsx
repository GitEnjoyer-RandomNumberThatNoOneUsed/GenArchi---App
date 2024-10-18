import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Fidelity {
  id: number;
  credit: number;
  dateCreation: string;
}

const FidelityList = () => {
  const [fidelityList, setFidelityList] = useState<Fidelity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.BACKEND_FIDELITE}/fidelities`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a: Fidelity, b: Fidelity) => a.id - b.id);
        setFidelityList(sortedData);
      });
  }, []);

  const onFidelityClick = (fidelity: Fidelity) => {
    navigate(`/fidelities/${fidelity.id}`);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="mb-6 ml-5 mt-7">
        <button
          className="px-4 py-2 text-white bg-black hover:bg-slate-600"
          onClick={goToHome}
        >
          Back to home page
        </button>
      </div>
      <div className="max-w-lg p-4 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">
          List of fidelity accounts
        </h1>
        <ul className="divide-y divide-gray-200">
          {fidelityList.map((fidelity: Fidelity) => (
            <li
              key={fidelity.id}
              className="py-2 transition-colors duration-200 cursor-pointer hover:bg-gray-100"
              onClick={() => onFidelityClick(fidelity)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-500 bg-gray-200 rounded-full">
                  {fidelity.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-medium text-gray-900 truncate">
                    Credits: {fidelity.credit}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Date: {new Date(fidelity.dateCreation).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FidelityList;
