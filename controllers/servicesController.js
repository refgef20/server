import Favors from "../models/Service.js";
import { Op } from "sequelize";

async function getFavorsId(req, res) {
  const favpr = await Favors.findByPk(req.params.id);
  if (favpr) {
    return res.json(favpr);
  } else {
    return res.status(404).json({ message: "Услуга не найдена" });
  }
}

async function getFavorsQuery(req, res) {
  let where = {};
  const {
    page = 1,
    limit = 10,
    sortby = "id",
    sortOrder = "ASC",
    search,
    title,
  } = req.query;

  if (search) {
    where = {
      title: { [Op.iLike]: `%${search}%` },
    };
  }
  if (title) {
    where.title = title;
  }

  const offset = (page - 1) * limit;

  const favir = await Favors.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [[sortby, sortOrder]],
    where: where,
  });

  if (favir) {
    return res.json(favir);
  } else {
    return res.status(404).json({ messge: "Услуга не найдена" });
  }
}

async function patchFavor(req, res) {
  const fav = await Favors.update(req.body, { where: { id: req.params.id } });
  if (fav) {
    return res.json(fav);
  } else {
    return res.status(404).json({ messge: "Услуга не обновлена" });
  }
}

async function postFavor(req, res) {
  const favor = await Favors.create(req.body);
  if (favor) {
    return res.json(favor);
  } else {
    return res.status(404).json({ messge: "Услуга не добавлена" });
  }
}

async function deleteFavor(req, res) {
  const favor = await Favors.destroy({ where: { id: req.params.id } });
  if (favor) {
    return res.json(favor);
  } else {
    return res.status(404).json({ messge: "Услуга не удалена" });
  }
}

export { getFavorsId, getFavorsQuery, patchFavor, postFavor, deleteFavor };
