import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Fidelity {
  id: number;
  credit: number;
  dateCreation: string;
}

const Fidelity = () => {
  const [fidelity, setFidelity] = useState<Fidelity | null>(null);
  const { fidelityId } = useParams<{ fidelityId: string }>();
  const navigate = useNavigate();

  // State for credit editing
  const [isEditingCredit, setIsEditingCredit] = useState(false);
  const [newCredit, setNewCredit] = useState<number | null>(null);

  useEffect(() => {
    const fetchFidelityInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_FIDELITE}/fidelities/${fidelityId}`
        );
        const data = await response.json();
        setFidelity(data);
        setNewCredit(data.credit); // Initialize with the current credit
      } catch (error) {
        console.error("Error fetching fidelity information:", error);
      }
    };

    fetchFidelityInfo();
  }, [fidelityId]);

  const goToFidelityList = () => {
    navigate("/fidelityList");
  };

  // Handle credit update
  const handleUpdateCredit = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_FIDELITE}/fidelities/${fidelityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credit: newCredit }),
        }
      );
      const updatedFidelity = await response.json();
      setFidelity(updatedFidelity);
      setIsEditingCredit(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating fidelity credit:", error);
    }
  };

  if (!fidelity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <button
          className="px-4 py-2 text-white bg-black hover:bg-slate-600"
          onClick={goToFidelityList}
        >
          Back to fidelity list
        </button>
      </div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Fidelity information
      </h2>
      <div className="py-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">ID:</p>
        <p className="text-lg text-gray-900">{fidelity.id}</p>
      </div>
      <div className="py-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">Credits:</p>
        <p className="text-lg text-gray-900">
          {isEditingCredit ? (
            <div>
              <input
                type="number"
                value={newCredit ?? fidelity.credit}
                onChange={(e) => setNewCredit(Number(e.target.value))}
                className="p-2 border rounded"
              />
              <button
                onClick={handleUpdateCredit}
                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingCredit(false)}
                className="px-4 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {fidelity.credit}
              <button
                onClick={() => setIsEditingCredit(true)}
                className="relative flex items-center justify-center w-10 h-10 ml-4 bg-white border border-black rounded-full hover:bg-gray-200"
              >
                🖉
              </button>
            </>
          )}
        </p>
      </div>
      <div className="py-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700">Date of Creation:</p>
        <p className="text-lg text-gray-900">
          {new Date(fidelity.dateCreation).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Fidelity;
