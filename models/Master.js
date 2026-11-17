import { DataTypes, STRING } from "sequelize";
import sequelize from "../db.js";

const Master = sequelize.define("Master", {
  name: { type: DataTypes.STRING, allowNull: false },
  specialization: { type: DataTypes.STRING, allowNull: false },
  experience: {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [0], msg: "Некорректно указан опыт" },
      checkMaxExp(value) {
        if (value > 30) {
          throw new Error("Опыт подозрительно огромен");
        }
      },
    },
    allowNull: false,
  },
  rating: {
    type: DataTypes.DOUBLE,
    validate: {
      min: { args: [0], msg: "Рейтинг не может быть ниже нуля" },
    },
  },
  qualification: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  phone: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    validate: {
      isUrl: { msg: "Некорректная ссылка на фото" },
    },
  },
});
export default Master;
