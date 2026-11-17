import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      checkPastDate(value) {
        if (value < new Date()) {
          throw new Error("Нельзя записаться на прошлую дату");
        }
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "создана",
    allowNull: false,
  },
});
export default Appointment;
