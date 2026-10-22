import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Appointment = sequelize.define("Appointment", {
  clientName: { type: DataTypes.STRING, allowNull: false },
  clientPhone: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: "создана",
    allowNull: false,
  },
});
export default Appointment;
