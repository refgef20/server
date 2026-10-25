import { Router } from "express";
import {
  deleteMaster,
  getMasterId,
  getMasterQuery,
  patchMaster,
  postMaster,
} from "../controllers/masterController.js";

const routerM = Router();

routerM.get("/:id", getMasterId);
routerM.get("/", getMasterQuery);
routerM.post("/", postMaster);
routerM.delete("/:id", deleteMaster);
routerM.patch("/:id", patchMaster);

export default routerM;
