import User from "../models/User.js";

async function roleMiddleware(req, res, next) {
  const user = await User.findByPk(req.user.userId);
  if (!user || user.role !== "admin") {
    return res.status(403).json({
      message: "Пользовател не имеет права совершать данное действие",
    });
  }
  next();
}
export default roleMiddleware;
