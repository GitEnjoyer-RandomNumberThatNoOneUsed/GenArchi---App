import React, { useState } from "react";

interface Sprint0DeleteFormProps {
  onDelete: (id: number) => void;
}

const Sprint0DeleteForm: React.FC<Sprint0DeleteFormProps> = ({ onDelete }) => {
  const [deleteId, setDeleteId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteId !== "") {
      onDelete(Number(deleteId));
      setDeleteId(""); // Reset input field
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 m-3 border-2 rounded-lg h-3/5 border-slate-600 bg-slate-200"
    >
      <h2 className="mb-3 text-lg font-bold text-center">Delete a data</h2>
      <div className="mb-3">
        <label className="block mb-1 text-sm">Data's ID :</label>
        <input
          type="number"
          value={deleteId}
          onChange={(e) => setDeleteId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter ID"
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-1/4 p-2 mt-3 text-white bg-red-600 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default Sprint0DeleteForm;
