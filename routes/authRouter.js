import { Router } from "express";
import {
  login,
  logOut,
  regystration,
  updateToken,
  loginWithOutPass,
} from "../controllers/autchController.js";
import Auth from "../middleware/authorization.js";

const routerA = Router();

routerA.post("/register", regystration);
routerA.post("/login", login);
routerA.post("/loginWithOutPass", loginWithOutPass);
routerA.post("/refresh", updateToken);
routerA.post("/logout", Auth, logOut);

export default routerA;
