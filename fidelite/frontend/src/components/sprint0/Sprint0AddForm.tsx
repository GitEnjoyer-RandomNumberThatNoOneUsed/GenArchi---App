import React, { useState } from "react";

interface Sprint0AddFormProps {
  onAdd: (text: string, appName: string) => void;
  appNames: string[];
}

const Sprint0AddForm: React.FC<Sprint0AddFormProps> = ({ onAdd, appNames }) => {
  const [newText, setNewText] = useState("");
  const [selectedAppName, setSelectedAppName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newText, selectedAppName);
    setNewText(""); // Reset text input
    setSelectedAppName(""); // Reset select
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 m-3 border-2 rounded-lg h-4/5 border-slate-600 bg-slate-200"
    >
      <h2 className="mb-3 text-lg font-bold text-center">Add a data</h2>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Text :</label>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter text"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Application Name :</label>
        <select
          value={selectedAppName}
          onChange={(e) => setSelectedAppName(e.target.value)}
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
          className="w-1/4 p-2 mt-3 text-white bg-green-600 hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Sprint0AddForm;
