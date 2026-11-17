import { Router } from "express";
import { getUsers, changeRole, deleteUser } from "../controllers/adminController.js";
import Auth from "../middleware/authorization.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const routerAdmin = Router();

routerAdmin.use(Auth, roleMiddleware);
routerAdmin.get("/users", getUsers);
routerAdmin.patch("/users/:id/role", changeRole);
routerAdmin.delete("/users/:id", deleteUser);

export default routerAdmin;
