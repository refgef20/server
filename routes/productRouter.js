import { Router } from "express";

import {
  getProductsId,
  getProdustsQuery,
  postProduct,
  patchProd,
  deleteProd,
} from "../controllers/productsController.js";

const router = Router();

router.get("/:id", getProductsId);
router.get("/", getProdustsQuery);
router.post("/", postProduct);
router.patch("/:id", patchProd);
router.delete("/:id", deleteProd);

export default router;
