import { Router } from "express";
import {
  getFavorsId,
  getFavorsQuery,
  patchFavor,
  postFavor,
  deleteFavor,
} from "../controllers/servicesController.js";

const routS = Router();

routS.get("/:id", getFavorsId);
routS.get("/", getFavorsQuery);
routS.post("/", postFavor);
routS.patch("/:id", patchFavor);
routS.delete("/:id", deleteFavor);

export default routS;
