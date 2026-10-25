import Master from "../models/Master.js";
import { Op } from "sequelize";

async function getMasterId(req, res) {
  const master = await Master.findByPk(req.params.id);

  if (master) {
    return res.json(master);
  } else {
    return res.status(400).json({ message: "Мастер не найден" });
  }
}

async function getMasterQuery(req, res) {
  let where = {};
  const {
    page = 1,
    limit = 10,
    sortby = "id",
    sortOrder = "ASC",
    search = "",
    experience,
  } = req.query;

  const offset = (page - 1) * limit;

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { specialization: { [Op.iLike]: `%${search}%` } },
    ];
  }
  if (experience) {
    where.experience = experience;
  }

  const masters = await Master.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [[sortby, sortOrder]],
    where: where,
  });

  if (masters) {
    return res.json(masters);
  } else {
    return res.status(400).json({ message: "Мастера не найдено" });
  }
}

async function postMaster(req, res) {
  const master = await Master.create(req.body);
  if (master) {
    return res.json(master);
  } else {
    return res.status(400).json({ message: "Мастер не добавлен" });
  }
}

async function deleteMaster(req, res) {
  const master = await Master.destroy({ where: { id: req.params.id } });
  if (master) {
    return res.json(master);
  } else {
    return res.status(400).json({ message: "Мастер всё ещё не удалён" });
  }
}

async function patchMaster(req, res) {
  const master = await Master.update(req.body, {
    where: { id: req.params.id },
  });
  if (master) {
    return res.json(master);
  } else {
    return res.status(400).json({ message: "Мастер всё ещё не удалён" });
  }
}

export { getMasterId, getMasterQuery, postMaster, deleteMaster, patchMaster };
