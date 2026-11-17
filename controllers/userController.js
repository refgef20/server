import Appointment from "../models/Appointment.js";
import Master from "../models/Master.js";
import Order from "../models/Order.js";
import Products from "../models/Products.js";
import Favors from "../models/Service.js";
import User from "../models/User.js";
import { redis } from "../redis.js";
import bcrypt from "bcryptjs";

async function getUsersFavourite(req, res) {
  const user = await User.findByPk(req.user.userId, {
    include: { model: Products, as: "usersFavour" },
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ message: "Пользователь не найжен" });
  }
}

async function getUsersCart(req, res) {
  const user = await User.findByPk(req.user.userId, {
    include: { model: Products, as: "usersProducts" },
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ message: "Пользователь не найжен" });
  }
}

async function getUsersAppoints(req, res) {
  const user = await User.findByPk(req.user.userId, {
    include: { model: Appointment, as: "orders" },
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ message: "Пользователь не найжен" });
  }
}

async function getAppsMastFavors(req, res) {
  const apps = await Appointment.findAll({
    where: { userId: req.user.userId },
    include: [
      { model: Master, as: "Master" },
      { model: Favors, as: "Favor" },
    ],
  });
  if (apps) {
    return res.json(apps);
  } else {
    return res.status(400).json({ message: "Пользователь не найжен" });
  }
}

async function getUserId(req, res) {
  const user = await User.findOne({ where: { id: req.user.userId } });
  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Пользователь не найден" });
  }
}

async function postUser(req, res) {
  const user = await User.create(req.body);
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ message: "Пользователь не добавлен" });
  }
}

async function getUsersOrder(req, res) {
  const user = await User.findByPk(req.user.userId, {
    include: { model: Products, as: "userOrder" },
  });
  if (user) {
    return res.json(user);
  } else {
    res.status(400).json({ message: "Пользователь не найжен" });
  }
}

async function changePassword(req, res) {
  console.log("ВЕСЬ REQ.BODY:", req.body);
  const user = await User.findOne({ where: { id: req.user.userId } });
  const passwordIsValid = await bcrypt.compare(req.body.oldPass, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Старые пароли не совпадает" });
  }
  const sucChange = await user.update({ password: req.body.newPass });
  if (sucChange) {
    return res.status(200).json(sucChange);
  } else {
    return res.status(400).json({ message: "Обновление пароля не произошло" });
  }
}
async function changeInfo(req, res) {
  const user = await User.findOne({ where: { id: req.user.userId } });
  const sucChange = await user.update(req.body.info);
  if (user) {
    return res.status(200).json(sucChange);
  } else {
    return res
      .status(400)
      .json({ message: "Обновление информации о пользователя не произошло" });
  }
}
async function destroy(req, res) {
  const user = await User.destroy({ where: { id: req.user.userId } });
  if (user) {
    return res.status(200).json(user);
  }
  const delCount = await redis.del(`refresh_token:${req.user.userId}`);
  if (delCount === 1) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
    return res.status(201).json({ message: "Пользователь успешно вышел" });
  } else {
    return res.status(204);
  }
}

export {
  getUsersAppoints,
  getUsersCart,
  getUsersFavourite,
  postUser,
  getUsersOrder,
  getAppsMastFavors,
  changePassword,
  changeInfo,
  destroy,
  getUserId,
};
