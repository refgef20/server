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
      min: { args: [0], msg: "Рейтинг не может быть меньше 0" },
      checkBigRating(value) {
        if (value > 5) {
          throw new Error("Такое значение рейтинга не существует");
        }
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: { args: [0], msg: "Цена не может быть меньше 0" },
      checkPriceBig(value) {
        if (value > 1000000) {
          throw new Error("Подозрительно огромная цена");
        }
      },
    },
  },
});
export default Products;
