import React, { useState, useEffect } from "react";

interface Stock {
  _id: string;
  name: string;
  weight: number;
  quantity: number;
  description: string;
  image: string;
}

const StockManagement: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState<Omit<Stock, "_id">>({
    name: "",
    weight: 0,
    quantity: 0,
    description: "",
    image: "",
  });
  const [editStock, setEditStock] = useState<Stock | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const API_URL = "http://localhost:4000/stock";

  // Charger tous les stocks
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Stock[] = await response.json();
      setStocks(data);
    } catch (error) {
      setMessage("Erreur lors du chargement des stocks");
    }
  };

  // Créer un stock
  const handleCreateStock = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStock),
      });

      if (!response.ok) throw new Error("Erreur lors de la création");

      const createdStock: Stock = await response.json();
      setStocks([...stocks, createdStock]);
      setNewStock({
        name: "",
        weight: 0,
        quantity: 0,
        description: "",
        image: "",
      });
      setMessage("Stock créé avec succès");
    } catch (error) {
      setMessage("Erreur lors de la création du stock");
    }
  };

  // Mettre à jour un stock
  const handleUpdateStock = async () => {
    if (!editStock) return;

    try {
      const response = await fetch(`${API_URL}/${editStock._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editStock),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const updatedStock: Stock = await response.json();
      setStocks(
        stocks.map((stock) =>
          stock._id === updatedStock._id ? updatedStock : stock
        )
      );
      setEditStock(null);
      setMessage("Stock mis à jour avec succès");
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du stock");
    }
  };

  // Supprimer un stock
  const handleDeleteStock = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setStocks(stocks.filter((stock) => stock._id !== id));
      setMessage("Stock supprimé avec succès");
    } catch (error) {
      setMessage("Erreur lors de la suppression du stock");
    }
  };

  return (
    <div className="container p-4 mx-auto">
      {message && (
        <div className="p-2 mb-4 text-green-800 bg-green-200 rounded">
          {message}
        </div>
      )}
      <h1 className="mb-4 text-2xl font-bold">Gestion des Stocks</h1>

      {/* Formulaire de création */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Créer un nouveau stock</h2>
        <label className="block mb-1">Nom du stock :</label>
        <input
          type="text"
          placeholder="Nom"
          value={newStock.name}
          onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
          className="w-full p-2 mb-2 border"
        />
        <label className="block mb-1">Poids (en kg) :</label>
        <input
          type="number"
          placeholder="Poids"
          value={newStock.weight}
          onChange={(e) =>
            setNewStock({ ...newStock, weight: Number(e.target.value) })
          }
          className="w-full p-2 mb-2 border"
        />
        <label className="block mb-1">Quantité disponible :</label>
        <input
          type="number"
          placeholder="Quantité"
          value={newStock.quantity}
          onChange={(e) =>
            setNewStock({ ...newStock, quantity: Number(e.target.value) })
          }
          className="w-full p-2 mb-2 border"
        />
        <label className="block mb-1">Description :</label>
        <textarea
          placeholder="Description"
          value={newStock.description}
          onChange={(e) =>
            setNewStock({ ...newStock, description: e.target.value })
          }
          className="w-full p-2 mb-2 border"
        ></textarea>
        <label className="block mb-1">URL de l'image :</label>
        <input
          type="text"
          placeholder="Image URL"
          value={newStock.image}
          onChange={(e) => setNewStock({ ...newStock, image: e.target.value })}
          className="w-full p-2 mb-2 border"
        />
        <button
          onClick={handleCreateStock}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des stocks */}
      <div>
        <h2 className="text-xl font-semibold">Liste des stocks</h2>
        {stocks.map((stock) => (
          <div
            key={stock._id}
            className="flex items-center justify-between p-4 mb-2 border"
          >
            <div>
              <h3 className="text-lg font-bold">{stock.name}</h3>
              <p>Poids : {stock.weight} kg</p>
              <p>Quantité : {stock.quantity}</p>
              <p>{stock.description}</p>
              {stock.image && (
                <img
                  src={stock.image}
                  alt={stock.name}
                  className="object-cover w-32 h-32 mt-2"
                />
              )}
            </div>
            <div>
              <button
                onClick={() => setEditStock(stock)}
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteStock(stock._id)}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire de modification */}
      {editStock && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Modifier le stock</h2>
          <label className="block mb-1">Nom du stock :</label>
          <input
            type="text"
            placeholder="Nom"
            value={editStock.name}
            onChange={(e) =>
              setEditStock({ ...editStock, name: e.target.value })
            }
            className="w-full p-2 mb-2 border"
          />
          <label className="block mb-1">Poids (en kg) :</label>
          <input
            type="number"
            placeholder="Poids"
            value={editStock.weight}
            onChange={(e) =>
              setEditStock({ ...editStock, weight: Number(e.target.value) })
            }
            className="w-full p-2 mb-2 border"
          />
          <label className="block mb-1">Quantité disponible :</label>
          <input
            type="number"
            placeholder="Quantité"
            value={editStock.quantity}
            onChange={(e) =>
              setEditStock({ ...editStock, quantity: Number(e.target.value) })
            }
            className="w-full p-2 mb-2 border"
          />
          <label className="block mb-1">Description :</label>
          <textarea
            placeholder="Description"
            value={editStock.description}
            onChange={(e) =>
              setEditStock({ ...editStock, description: e.target.value })
            }
            className="w-full p-2 mb-2 border"
          ></textarea>
          <label className="block mb-1">URL de l'image :</label>
          <input
            type="text"
            placeholder="Image URL"
            value={editStock.image}
            onChange={(e) =>
              setEditStock({ ...editStock, image: e.target.value })
            }
            className="w-full p-2 mb-2 border"
          />
          <button
            onClick={handleUpdateStock}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Mettre à jour
          </button>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
