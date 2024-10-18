import React, { useState } from "react";

interface Sprint0UpdateFormProps {
  onUpdate: (id: number, text: string, appName: string) => void;
  appNames: string[];
}

const Sprint0UpdateForm: React.FC<Sprint0UpdateFormProps> = ({
  onUpdate,
  appNames,
}) => {
  const [updateId, setUpdateId] = useState<number | "">("");
  const [updateText, setUpdateText] = useState("");
  const [updateAppName, setUpdateAppName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateId !== "" && updateText !== "" && updateAppName !== "") {
      onUpdate(Number(updateId), updateText, updateAppName);
      setUpdateId("");
      setUpdateText("");
      setUpdateAppName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 m-3 border-2 rounded-lg border-slate-600 bg-slate-200"
    >
      <h2 className="mb-3 text-lg font-bold text-center">Modify a data</h2>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Data's ID :</label>
        <input
          type="number"
          value={updateId}
          onChange={(e) => setUpdateId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter ID"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Text :</label>
        <input
          type="text"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter new text"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Application Name :</label>
        <select
          value={updateAppName}
          onChange={(e) => setUpdateAppName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select an application</option>
          {appNames.map((appName) => (
            <option key={appName} value={appName}>
              {appName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-1/4 p-2 mt-3 text-white bg-blue-600 hover:bg-blue-700"
        >
          Modify
        </button>
      </div>
    </form>
  );
};

export default Sprint0UpdateForm;
