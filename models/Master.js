import { DataTypes, STRING } from "sequelize";
import sequelize from "../db.js";

const Master = sequelize.define("Master", {
  name: { type: DataTypes.STRING, allowNull: false },
  specialization: { type: DataTypes.STRING, allowNull: false },
  experience: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
    allowNull: false,
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
