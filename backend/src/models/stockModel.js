const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
        },
        message: (props) =>
          `${props.value} n'est pas une URL valide pour une image !`,
      },
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model("Stock", StockSchema);
