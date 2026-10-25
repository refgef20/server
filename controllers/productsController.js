import Products from "../models/Products.js";
import { Op } from "sequelize";
import { json } from "body-parser";

async function getProductsId(req, res) {
  const prod = await Products.findByPk(req.params.id);
  if (prod) {
    return res.json(prod);
  } else {
    return res.status(404).json({ message: "Товар не найден" });
  }
}

async function getProdustsQuery(req, res) {
  let where = {};

  const {
    page = 1,
    limit = 10,
    sortby = "id",
    sortOrder = "ASC",
    search = "",
    category,
  } = req.query;

  if (search) {
    where[Op.or] = [
      { description: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (category) {
    where.category = category;
  }

  const offs = (page - 1) * limit;
  const prod = await Products.findAndCountAll({
    limit: Number(limit),
    offset: Number(offs),
    order: [[sortby, sortOrder]],
    where: where,
  });
  return res.json(prod);
}

async function postProduct(req, res) {
  const newProd = await Products.create(req.body);
  return res.status(201).json(newProd);
}

async function patchProd(req, res) {
  const product = await Products.findByPk(req.params.id);
  const newProd = await product.update(req.body);
  return res.status(201).json(newProd);
}

async function deleteProd(req, res) {
  const newProd = await Products.destroy({ where: { id: req.params.id } });
  return res.status(201).json(newProd);
}
export { getProductsId, getProdustsQuery, postProduct, patchProd, deleteProd };
