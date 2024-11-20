import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  _id: number;
  name: string;
}

const MyComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      console.error("BACKEND_URL is not defined!");
      setError("Backend URL is not defined");
      return;
    }

    axios.get(`${backendUrl}/test`)
      .then(response => {
        const fetchedItems = Array.isArray(response.data) ? response.data : [];
        setItems(fetchedItems);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch items');
      });
  }, []);

  const handleCreate = () => {
    if (!newItemName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    const newItem = { name: newItemName };
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      console.error("Backend URL is not defined");
      setError("Backend URL is not defined");
      return;
    }

    axios.post(`${backendUrl}/test/create`, newItem)
      .then(response => {
        setItems(prevItems => [...prevItems, response.data]); // Mise à jour fonctionnelle de l'état
        setNewItemName('');
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to create item');
      });
  };

  return (
    <div className="flex p-6 space-x-6 bg-gray-100 min-h-screen">
      {/* Left Section - List of Items */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item._id} className="p-2 border-b last:border-none">
              {item.name}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items available</p>
        )}
      </div>

      {/* Right Section - Input and Button */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4">
        <input 
          value={newItemName} 
          onChange={e => setNewItemName(e.target.value)} 
          className="border border-blue-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item name"
        />
        <button 
          onClick={handleCreate} 
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MyComponent;
