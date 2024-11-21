// services/dumbbellService.js
const Stock = require("../models/stockModel");

// Obtenir tous les haltères
const getAllStocks = async () => {
  return await Stock.find();
};

// Obtenir un haltère par son ID
const getStockById = async (id) => {
  return await Stock.findById(id);
};

// Créer un nouvel haltère
const createStock = async (data) => {
  const stock = new Stock(data);
  return await stock.save();
};

// Mettre à jour un haltère par son ID
const updateStock = async (id, data) => {
  return await Stock.findByIdAndUpdate(id, data, { new: true });
};

// Supprimer un haltère par son ID
const deleteStock = async (id) => {
  return await Stock.findByIdAndDelete(id);
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
