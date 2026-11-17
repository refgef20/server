import "dotenv/config";
import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import { json } from "body-parser";
import "./models/Products.js";
import Master from "./models/Master.js";
import Favors from "./models/Service.js";
import Appointment from "./models/Appointment.js";
import Cart from "./models/Cart.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import router from "./routes/productRouter.js";
import routerM from "./routes/masterRouer.js";
import routers from "./routes/appointmentRouter.js";
import routS from "./routes/serviceRouter.js";
import Products from "./models/Products.js";
import Favourite from "./models/Favourite.js";
import routerU from "./routes/UserRouter.js";
import routerF from "./routes/favouriteRouter.js";
import routerC from "./routes/cartRouter.js";
import routerO from "./routes/orderRouter.js";
import routerA from "./routes/authRouter.js";
import { Connection } from "./redis.js";
import cookieParser from "cookie-parser";
import routerAdmin from "./routes/adminRouter.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(json());
app.use(cookieParser());
app.use("/api/product", router);
app.use("/api/master", routerM);
app.use("/api/appointment", routers);
app.use("/api/services", routS);
app.use("/api/user", routerU);
app.use("/api/favourite", routerF);
app.use("/api/cart", routerC);
app.use("/api/order", routerO);
app.use("/api/auth", routerA);
app.use("/api/admin", routerAdmin);

async function start() {
  try {
    await sequelize.authenticate();
    await Connection();
    Master.hasMany(Appointment, { foreignKey: "MasterId", as: "appointments" });
    Appointment.belongsTo(Master, { foreignKey: "MasterId", as: "Master" });

    Favors.hasMany(Appointment, { foreignKey: "FavorId", as: "appointments" });
    Appointment.belongsTo(Favors, { foreignKey: "FavorId", as: "Favor" });

    User.belongsToMany(Products, { through: Cart, as: "usersProducts" });
    Products.belongsToMany(User, { through: Cart });

    User.belongsToMany(Products, { through: Favourite, as: "usersFavour" });
    Products.belongsToMany(User, { through: Favourite });

    User.belongsToMany(Products, { through: Order, as: "userOrder" });
    Products.belongsToMany(User, { through: Order });

    User.hasMany(Appointment, { foreignKey: "userId", as: "orders" });
    Appointment.belongsTo(User, { foreignKey: "userId", as: "user" });

    await sequelize.sync({ alter: true });
    await app.listen(process.env.PORT, () => {
      console.log("Сервер запущен на порту " + process.env.PORT);
    });
  } catch (er) {
    console.error("Ошибка подключения:", er);
  }
}
start();
