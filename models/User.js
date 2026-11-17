import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientName: { type: DataTypes.STRING, allowNull: false },
    clientPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\+7\d{10}$/,
          msg: "Телефон должен начинаться с +7 и содержать 11 цифр",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 100],
          msg: "Поле должно содержать не менее 6 символов",
        },
      },
    },
    role: { type: DataTypes.STRING, defaultValue: "user" },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          const salt = 10;
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

export default User;
