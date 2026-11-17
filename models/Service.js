import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Favors = sequelize.define("Service", {
  title: DataTypes.STRING,
  category: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: { args: [0], msg: "Цена не может быть меньше 0" },
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [15],
        msg: "Длительность услуги не может быть настолько маленькой",
      },
    },
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});

export default Favors;
