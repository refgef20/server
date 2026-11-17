import { Router } from "express";
import {
  postCart,
  deleteCart,
  patchCart,
} from "../controllers/cartController.js";
import Auth from "../middleware/authorization.js";

const routerC = Router();

routerC.post("/", Auth, postCart);
routerC.delete("/:id", Auth, deleteCart);
routerC.patch("/:id", Auth, patchCart);

export default routerC;
