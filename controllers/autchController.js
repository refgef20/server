import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { redis } from "../redis.js";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

async function generateTokens(userId, role, previousToken) {
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
      jwtid: randomUUID(),
    },
  );
  const key = `refresh_token:${userId}`;
  const ttl = 7 * 24 * 60 * 60;
  if (previousToken) {
    // Не восстанавливаем сессию, если за время запроса пользователь вышел.
    const updated = await redis.eval(
      "if redis.call('GET', KEYS[1]) == ARGV[1] then " +
        "return redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3]) end",
      { keys: [key], arguments: [previousToken, refreshToken, String(ttl)] },
    );
    if (!updated) return null;
  } else {
    await redis.set(key, refreshToken, { EX: ttl });
  }
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
  if (typeof req.body?.clientPhone !== "string" || typeof req.body?.password !== "string") {
    return res.status(400).json({ message: "Введите телефон и пароль" });
  }
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
  const refreshToken = req.cookies.refreshToken;
  let token;
  try {
    token = jwt.verify(refreshToken, process.env.REFRESH_KEY);
  } catch {
    return res.status(401).json({ message: "Сессия завершена" });
  }
  const user = await User.findByPk(token.userId);
  if (!user) {
    return res.status(401).json({ message: "Пользователь не найден" });
  }
  const tokens = await generateTokens(user.id, user.role, refreshToken);
  if (!tokens) {
    return res.status(401).json({ message: "Сессия завершена" });
  }
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ token: tokens.accesstToken });
}
async function logOut(req, res) {
  const deletedCount = await redis.del(`refresh_token:${req.user.userId}`);
  res.clearCookie("refreshToken", { httpOnly: true });
  if (deletedCount) {
    return res.status(201).json({ message: "Пользователь успешно вышел" });
  }
  return res.sendStatus(204);
}
async function loginWithOutPass(req, res) {
  const { clientPhone, clientName } = req.body || {};
  if (typeof clientPhone !== "string" || typeof clientName !== "string" || !clientName.trim()) {
    return res.status(400).json({ message: "Введите телефон и имя" });
  }
  const user = await User.findOne({ where: { clientPhone, clientName } });
  if (!user) {
    return res.status(401).json({ message: "Неверный телефон или имя" });
  }
  const tokens = await generateTokens(user.id, user.role);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ user: user, token: tokens.accesstToken });
}
export { regystration, login, logOut, updateToken, loginWithOutPass };
