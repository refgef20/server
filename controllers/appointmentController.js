import Appointment from "../models/Appointment.js";
import { Op } from "sequelize";

async function getAppointmentId(req, res) {
  const appoint = await Appointment.findByPk(req.params.id);
  if (appoint) {
    return res.json(appoint);
  } else {
    return res.status(404).json({ message: "Запись не найдена" });
  }
}

async function getAppointmentQuery(req, res) {
  let where = {};
  const {
    page = 1,
    limit = 10,
    sortby = "id",
    sortOrder = "ASC",
    search = "",
    clientName,
  } = req.query;

  if (clientName) {
    where.clientName = { [Op.iLike]: `%${clientName}%` };
  }
  if (search) {
    where[Op.or] = [
      { clientName: { [Op.iLike]: `%${search}%` } },
      { clientPhone: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const offset = (page - 1) * limit;

  const appoint = await Appointment.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [[sortby, sortOrder]],
    where: where,
  });
  if (appoint) {
    return res.json(appoint);
  } else {
    return res.status(404).json({ message: "Запись не найдена" });
  }
}

async function deleteAppointment(req, res) {
  try {
    const app = await Appointment.destroy({ where: { id: req.params.id } });
    if (app) {
      return res.json({ message: "Запись удалена", deleted: app });
    } else {
      return res.status(404).json({ message: "Запись не найдена" });
    }
  } catch (error) {
    console.error("deleteAppointment error:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function patchAppoint(req, res) {
  const newAppoint = await Appointment.update(req.body, {
    where: { id: req.params.id },
  });
  if (newAppoint) {
    return res.json(newAppoint);
  } else {
    return res.status(404).json({ message: "Запись не найдена" });
  }
}
async function postAppoint(req, res) {
  const app = await Appointment.create(req.body);
  if (app) {
    return res.json(app);
  } else {
    return res.status(404).json({ message: "Запись не добавлена" });
  }
}

export {
  getAppointmentId,
  getAppointmentQuery,
  patchAppoint,
  deleteAppointment,
  postAppoint,
};
