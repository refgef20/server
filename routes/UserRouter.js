import { Router } from "express";
import {
  getUsersAppoints,
  getUsersCart,
  getUsersFavourite,
  postUser,
  getUsersOrder,
  getAppsMastFavors,
  changePassword,
  changeInfo,
  getUserId,
  destroy,
} from "../controllers/userController.js";
import Auth from "../middleware/authorization.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const routerU = Router();

routerU.post("/favourite", Auth, getUsersFavourite);
routerU.post("/cart", Auth, getUsersCart);
routerU.post("/appointment", Auth, getUsersAppoints);
routerU.get("/order", Auth, getUsersOrder);
routerU.post("/", postUser);
routerU.get("/appointsFavMast", Auth, getAppsMastFavors);
routerU.patch("/changePass", Auth, changePassword);
routerU.patch("/changeInfo", Auth, changeInfo);
routerU.get("/", Auth, getUserId);
routerU.delete("/destroy", Auth, destroy);

export default routerU;
