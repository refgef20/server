import { Router } from "express";
import {
  getFavorsId,
  getFavorsQuery,
  patchFavor,
  postFavor,
  deleteFavor,
} from "../controllers/servicesController.js";
import Auth from "../middleware/authorization.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const routS = Router();

routS.get("/:id", getFavorsId);
routS.get("/", getFavorsQuery);
routS.post("/", Auth, roleMiddleware, postFavor);
routS.patch("/:id", Auth, roleMiddleware, patchFavor);
routS.delete("/:id", Auth, roleMiddleware, deleteFavor);

export default routS;
