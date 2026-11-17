import { Router } from "express";
import {
  postOrder,
  deleteProd,
  patchOrder,
} from "../controllers/OrderController.js";
import Auth from "../middleware/authorization.js";

const routerO = Router();

routerO.post("/", Auth, postOrder);
routerO.delete("/:id", deleteProd);
routerO.patch("/:id", patchOrder);

export default routerO;
