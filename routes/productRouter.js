import { Router } from "express";

import {
  getProductsId,
  getProdustsQuery,
  postProduct,
  putProd,
  deleteProd,
} from "../controllers/productsController.js";

const router = Router();

router.get("/:id", getProductsId);
router.get("/", getProdustsQuery);
router.post("/", postProduct);
router.put("/:id", putProd);
router.delete(":id", deleteProd);

export default router;
