async function roleMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Пользовател не имеет права совершать данное действие",
    });
  }
  next();
}
export default roleMiddleware;
