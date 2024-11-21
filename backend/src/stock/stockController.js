// controllers/dumbbellController.js
const stockService = require("./stockSerice");
const logger = require("../logger");
const log = new logger.Logger("StockController");

// Obtenir tous les haltères
const getAllStocks = async (req, res) => {
  try {
    const stocks = await stockService.getAllStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Obtenir un haltère par ID
const getStockById = async (req, res) => {
  try {
    const stock = await stockService.getStockById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer un nouvel haltère
const createStock = async (req, res) => {
  try {
    const stock = await stockService.createStock(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: "Erreur de validation", error });
  }
};

// Mettre à jour un haltère par ID
const updateStock = async (req, res) => {
  try {
    const stock = await stockService.updateStock(req.params.id, req.body);
    log.info(`Stock mis à jour: ${stock}`);
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: "Erreur de mise à jour", error });
  }
};

// Supprimer un haltère par ID
const deleteStock = async (req, res) => {
  try {
    const result = await stockService.deleteStock(req.params.id);
    if (!result) return res.status(404).json({ message: "Stock non trouvé" });
    res.status(200).json({ message: "Stock supprimé", result });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
