import { where } from "sequelize";
import Cart from "../models/Cart.js";
import Favourite from "../models/Favourite.js";

async function postCart(req, res) {
  const cartP = { UserId: req.user.userId, ProductId: req.body.ProductId };
  const cartUnique = await Cart.findOne({ where: cartP });
  if (cartUnique) {
    return res.status(200).json({ message: "Товар уже есть в корзине" });
  }
  const cart = await Cart.create(cartP);
  if (cart) {
    return res.json(cart);
  } else {
    return res.status(400).json({ message: "Ошибка добавления" });
  }
}

async function deleteCart(req, res) {
  const cart = await Cart.destroy({
    where: { ProductId: req.params.id, UserId: req.user.userId },
  });

  if (cart) {
    return res.json(cart);
  } else {
    return res.status(400).json({ message: "Ошибка удаления" });
  }
}

async function patchCart(req, res) {
  const cartNew = await Cart.update(req.body, {
    where: { id: req.params.id },
  });
  if (cartNew) {
    return res.json(cartNew);
  } else {
    return res.status(400).json({ message: "Ошибка удаления" });
  }
}

export { postCart, deleteCart, patchCart };
