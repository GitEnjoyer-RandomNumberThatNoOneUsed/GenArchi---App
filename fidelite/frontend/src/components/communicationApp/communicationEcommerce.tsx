import { useEffect, useState } from "react";

interface Sprint0 {
  id: number;
  text: string;
  appName: string;
}

const CommunicationECommerce: React.FC = () => {
  const [sprint0, setSprint0] = useState<Sprint0[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [appName, setAppName] = useState("");

  const fetchSprint0 = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.BACKEND_ECOMMERCE}/sprint0`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Sprint0[] = await response.json();
      setSprint0(data);
    } catch (err) {
      setError(`Failed to fetch sprint0: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprint0();
  }, []);

  // add new ecommerce sprint0
  const addSprint0 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.BACKEND_ECOMMERCE}/sprint0`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          appName: appName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add sprint0: ${response.statusText}`);
      }

      const newSprint0: Sprint0 = await response.json();
      setSprint0((prevSprint0) =>
        prevSprint0 ? [...prevSprint0, newSprint0] : [newSprint0]
      );
      setText("");
      setAppName("");
    } catch (err) {
      setError(`Failed to add sprint0: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-2/4 p-4 text-center bg-white rounded-lg shadow-lg ">
        <h1 className="mb-4 text-2xl">Fetch E-commerce's data</h1>

        {/* form to add a sprint0 */}
        <form onSubmit={addSprint0} className="mb-6">
          <div className="mb-4">
            <label className="block mb-1 text-left">Text :</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-left">AppName :</label>
            <input
              type="AppName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter application name"
              required
            />
          </div>

          <button
            type="submit"
            className="p-2 mt-2 text-white bg-green-500 w-52 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Adding data..." : "Add data"}
          </button>
        </form>

        {/* display sprint0 */}
        {loading && <p>Loading...</p>}
        {sprint0 && (
          <div className="mt-9">
            <h2 className="text-xl font-bold">Data list :</h2>
            <div>
              {sprint0.map((sprint) => (
                <div
                  key={sprint.id}
                  className="p-3 m-3 border-2 bg-slate-300 rounded-xl hover:bg-slate-400 border-slate-800"
                >
                  <p>ID : {sprint.id}</p>
                  <h2>Text : {sprint.text}</h2>
                  <p>Application Name : {sprint.appName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </div>
    </div>
  );
};

export default CommunicationECommerce;
