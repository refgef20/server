import Order from "../models/Order.js";

async function postOrder(req, res) {
  const appU = {
    UserId: req.user.userId,
    ProductId: req.body.ProductId,
    amount: req.body.amount,
    address: req.body.address,
  };
  const order = await Order.create(appU);
  if (order) {
    return res.json(order);
  } else {
    return res.status(400).json({ Message: "Добавление не удалось" });
  }
}

async function deleteProd(req, res) {
  try {
    const order = await Order.destroy({
      where: { id: req.params.id },
    });
    if (order) {
      return res.status(201).json(order);
    } else {
      return res.status(404).json({ message: "Запись не найдена" });
    }
  } catch (error) {
    console.error("deleteAppointment error:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function patchOrder(req, res) {
  const order = await Order.update(req.body, { where: { id: req.params.id } });
  if (order) {
    return res.json(order);
  } else {
    return res.status(400).json({ Message: "Изменение не удалось" });
  }
}

export { postOrder, patchOrder, deleteProd };
