import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Favourite = sequelize.define("Favourite", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default Favourite;
