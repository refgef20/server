import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Favors = sequelize.define("Service", {
  title: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    validate: {
      allowNull: false,
      min: 0,
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      isUrl: true,
    },
  },
});

export default Favors;
