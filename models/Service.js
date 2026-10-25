import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Favors = sequelize.define("Service", {
  title: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
