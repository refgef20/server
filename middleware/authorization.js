import jwt from "jsonwebtoken";

async function Auth(req, res, next) {
  try {
    const valAuth = req.get("authorization");
    if (!valAuth) {
      return res.status(401).json({ message: "Нет токена авторизации" });
    }
    const token = valAuth.split(" ")[1];

    console.log(token);
    const payload = jwt.verify(token, process.env.ACCESS_KEY);
    if (!payload) {
      return res.status(401).json({ message: "Токен не прошёл верификацию" });
    }
    req.user = { userId: payload.userId, role: payload.role };

    next();
  } catch (err) {
    return res.status(422).json({ message: "Недействительный токен" });
  }
}
export default Auth;
