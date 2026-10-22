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
  const where = {};

  const {
    page = 1,
    limit = 10,
    sortby = "id",
    sortOrder = "ASC",
    search = "",
  } = req.query;

  if (search) {
    where[Op.or] = [
      { description: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
    ];
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
  const newProd = await Products.create(JSON.parse(req.body));
  return res.status(201).json(newProd);
}

async function putProd(req, res) {
  const product = await Products.findByPk(req.params.id);
  const newProd = await product.update(req.body);
  return res.status(201).json(newProd);
}

async function deleteProd(req, res) {
  const product = await Products.findByPk(req.params.id);
  const newProd = await Products.destroy(product);
  return (res.status(201), json(newProd));
}
export { getProductsId, getProdustsQuery, postProduct, putProd, deleteProd };
