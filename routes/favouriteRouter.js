import { Router } from "express";
import {
  postFavour,
  deleteFavour,
} from "../controllers/favouriteController.js";
import Auth from "../middleware/authorization.js";

const routerF = Router();

routerF.post("/", Auth, postFavour);
routerF.delete("/:id", Auth, deleteFavour);

export default routerF;
