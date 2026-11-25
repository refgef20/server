import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { redis } from "../redis.js";
import { json } from "body-parser";
import bcrypt from "bcryptjs";
import { SequelizeScopeError } from "sequelize";

async function generateTokens(userId, role) {
  const accesstToken = jwt.sign(
    { userId: userId, role: role },
    process.env.ACCESS_KEY,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    { userId: userId, role: role },
    process.env.REFRESH_KEY,
    {
      expiresIn: "7d",
    },
  );
  await redis.set(`refresh_token:${userId}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });
  return { accesstToken, refreshToken };
}

async function regystration(req, res) {
  try {
    const user = await User.findOne({
      where: {
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
      },
    });
    if (!user) {
      const newUser = await User.create(req.body);

      const tokens = await generateTokens(newUser.id, newUser.role);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(201)
        .json({ user: newUser, token: tokens.accesstToken });
    } else {
      return res.status(409).json({ message: "Такой пользователь существует" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const fieldErrors = {};
      err.errors.forEach((element) => {
        fieldErrors[element.path] = element.message;
      });
      return res.status(400).json({ errors: fieldErrors });
    }

    console.error("Ошибка при регистрации:", err);
    return res
      .status(500)
      .json({ message: "Внутренняя ошибка сервера", error: err.message });
  }
}
async function login(req, res) {
  console.log("Пришедшие данные:", req.body);
  console.log("Значение телефона для поиска:", req.body.clientPhone);
  const user = await User.findOne({
    where: {
      clientPhone: req.body.clientPhone,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Пользователь не найден" });
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isValidPassword) {
    return res.status(401).json({ message: "Неверный пароль" });
  }
  const tokens = await generateTokens(user.id, user.role);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ user: user, token: tokens.accesstToken });
}
async function updateToken(req, res) {
  try {
    const token = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_KEY);
    const valtok = await redis.get(`refresh_token:${token.userId}`);
    if (valtok) {
      const tokens = await generateTokens(token.userId, token.role);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ token: tokens.accesstToken });
    } else {
      return res
        .status(401)
        .json({ message: "refresh токен пользователя не найден" });
    }
  } catch (err) {
    console.error(err, "токен не прошёл верификацию");
    return;
  }
}
async function logOut(req, res) {
  const deletedCount = await redis.del(`refresh_token:${req.user.userId}`);
  if (deletedCount === 1) {
    return res.status(201).json({ message: "Пользователь успешно вышел" });
  } else {
    return res.status(204);
  }
}
async function loginWithOutPass(req, res) {
  const user = await User.findOne({
    where: {
      clientPhone: req.body.clientPhone,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Пользователь не найден" });
  }
  const isValidName = await User.findOne({
    where: {
      clientName: req.body.clientName,
    },
  });
  if (!isValidName) {
    return res.status(401).json({ message: "Неверное имя" });
  }
  const tokens = await generateTokens(user.id, user.role);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ user: user, token: tokens.accesstToken });
}
export { regystration, login, logOut, updateToken, loginWithOutPass };
