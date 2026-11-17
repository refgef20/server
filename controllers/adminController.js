import User from "../models/User.js";
import { redis } from "../redis.js";

async function getUsers(req, res) {
  const users = await User.findAll({
    attributes: ["id", "clientName", "clientPhone", "role"],
    order: [["id", "ASC"]],
  });
  return res.json(users);
}

async function changeRole(req, res) {
  const { role } = req.body;
  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ message: "Некорректная роль пользователя" });
  }
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  await user.update({ role });
  return res.json({
    id: user.id,
    clientName: user.clientName,
    clientPhone: user.clientPhone,
    role: user.role,
  });
}

async function deleteUser(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  await redis.del(`refresh_token:${user.id}`);
  await user.destroy();
  return res.json({ message: "Аккаунт удалён" });
}

export { getUsers, changeRole, deleteUser };
