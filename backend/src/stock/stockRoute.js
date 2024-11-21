// routes/dumbbellRoutes.js
const express = require("express");
const stockController = require("./stockController");

const router = express.Router();

router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.createStock);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;
