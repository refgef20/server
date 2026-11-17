import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export default Cart;
