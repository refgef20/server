import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Products = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
  category: { type: DataTypes.STRING, allowNull: false },
  photo: {
    type: DataTypes.STRING,
    validate: {
      isUrl: { msg: "Некорректная ссылка на фото" },
    },
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: { args: [0], msg: "Цена не может быть меньше 0" },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: { args: [0], msg: "Цена не может быть меньше 0" },
    },
  },
});
export default Products;
