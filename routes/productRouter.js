import { Router } from "express";

import {
  getProductsId,
  getProdustsQuery,
  postProduct,
  patchProd,
  deleteProd,
} from "../controllers/productsController.js";
import Auth from "../middleware/authorization.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/:id", getProductsId);
router.get("/", getProdustsQuery);
router.post("/", Auth, roleMiddleware, postProduct);
router.patch("/:id", Auth, roleMiddleware, patchProd);
router.delete("/:id", Auth, roleMiddleware, deleteProd);

export default router;
