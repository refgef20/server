import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [0], msg: "Некорректно указано количество" },
    },
  },
  address: {
    type: DataTypes.STRING,
  },
});

export default Order;
