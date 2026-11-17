import { Router } from "express";
import {
  deleteMaster,
  getMasterId,
  getMasterQuery,
  patchMaster,
  postMaster,
} from "../controllers/masterController.js";
import Auth from "../middleware/authorization.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const routerM = Router();

routerM.get("/:id", getMasterId);
routerM.get("/", getMasterQuery);
routerM.post("/", Auth, roleMiddleware, postMaster);
routerM.delete("/:id", Auth, roleMiddleware, deleteMaster);
routerM.patch("/:id", Auth, roleMiddleware, patchMaster);

export default routerM;
