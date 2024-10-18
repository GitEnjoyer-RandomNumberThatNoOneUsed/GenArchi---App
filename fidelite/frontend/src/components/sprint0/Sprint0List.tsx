import React, { useEffect, useState } from "react";
import Sprint0AddForm from "./Sprint0AddForm";
import Sprint0DeleteForm from "./Sprint0DeleteForm";
import Sprint0UpdateForm from "./Sprint0UpdateForm";

interface Sprint0 {
  id: number;
  text: string;
  createdAt: string;
  modifiedAt: string;
  appName: string;
}

const Sprint0List: React.FC = () => {
  const [sprint0, setSprint0s] = useState<Sprint0[]>([]);
  const [loading, setLoading] = useState(true);

  const appNames = [
    "BI",
    "Référentiel Produit",
    "Magasin",
    "E-commerce client",
    "Fidélité",
  ];

  useEffect(() => {
    fetch(`${process.env.BACKEND_FIDELITE}/sprint0`)
      .then((response) => response.json())
      .then((data) => {
        setSprint0s(data);
        setLoading(false);
      });
  }, []);

  // add sprint0
  const handleAdd = (text: string, appName: string) => {
    const newSprint0 = {
      text,
      appName,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    fetch(`${process.env.BACKEND_FIDELITE}/sprint0`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSprint0),
    })
      .then((response) => response.json())
      .then((data) => {
        setSprint0s((prevSprints) => [...prevSprints, data]);
      });
  };

  // delete sprint0
  const handleDelete = (id: number) => {
    fetch(`${process.env.BACKEND_FIDELITE}/sprint0/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setSprint0s((prevSprints) =>
          prevSprints.filter((sprint) => sprint.id !== id)
        );
      }
    });
  };

  //update sprint0
  const handleUpdate = (id: number, text: string, appName: string) => {
    const updatedSprint0 = {
      text,
      appName,
      modifiedAt: new Date().toISOString(),
    };

    fetch(`${process.env.BACKEND_FIDELITE}/sprint0/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSprint0),
    })
      .then((response) => response.json())
      .then((data) => {
        setSprint0s((prevSprints) =>
          prevSprints.map((sprint) =>
            sprint.id === id ? { ...sprint, ...data } : sprint
          )
        );
      });
  };

  return (
    <div>
      <div className="flex w-full space-x-4">
        <div className="flex-grow">
          <Sprint0AddForm onAdd={handleAdd} appNames={appNames} />
        </div>

        <div className="flex-grow">
          <Sprint0DeleteForm onDelete={handleDelete} />
        </div>

        <div className="flex-grow">
          <Sprint0UpdateForm onUpdate={handleUpdate} appNames={appNames} />
        </div>
      </div>

      <h1 className="p-3 m-3 mb-6 text-2xl font-bold text-center">
        List of data
      </h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          {sprint0.map((sprint) => (
            <div
              key={sprint.id}
              className="p-3 m-3 border-2 bg-slate-300 rounded-xl hover:bg-slate-400 border-slate-800"
            >
              <p>ID: {sprint.id}</p>
              <h2>Text: {sprint.text}</h2>
              <p>Created at: {sprint.createdAt}</p>
              <p>Modified at: {sprint.modifiedAt}</p>
              <p>Application name: {sprint.appName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sprint0List;
