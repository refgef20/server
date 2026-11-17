import Favourite from "../models/Favourite.js";

async function postFavour(req, res) {
  const favorUnique = await Favourite.findOne({
    where: { UserId: req.user.userId, ProductId: req.body.ProductId },
  });
  if (favorUnique) {
    res.status(200).json({ message: "Данный товар в избранном есть " });
  }
  const favp = { UserId: req.user.userId, ProductId: req.body.ProductId };
  const fav = await Favourite.create(favp);
  if (fav) {
    return res.json(fav);
  } else {
    return res.status(400).json({ message: "Избранное не добавилось" });
  }
}

async function deleteFavour(req, res) {
  const fav = await Favourite.destroy({
    where: { ProductId: req.params.id, UserId: req.user.userId },
  });
  if (fav) {
    return res.json(fav);
  } else {
    return res.status(400).json({ message: "Избранное не удалилось" });
  }
}

export { postFavour, deleteFavour };
