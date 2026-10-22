import "dotenv/config";
import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import { json } from "body-parser";
import "./models/Products.js";
import Master from "./models/Master.js";
import Favors from "./models/Service.js";
import Appointment from "./models/Appointment.js";
import router from "./routes/productRouter.js";

const app = express();
app.use(cors());
app.use(json());
app.use("api/product/:id", router);
app.use("api/product", router);

async function start() {
  try {
    await sequelize.authenticate();
    Master.belongsToMany(Favors, { through: Appointment });
    Favors.belongsToMany(Master, { through: Appointment });

    Master.hasMany(Appointment);
    Appointment.belongsTo(Master);
    Favors.hasMany(Appointment);
    Appointment.belongsTo(Favors);

    await sequelize.sync({ alter: true });
    await app.listen(process.env.PORT, () => {
      console.log("Сервер запущен на порту " + process.env.PORT);
    });
  } catch (er) {
    console.error("Ошибка подключения:", er);
  }
}
start();
