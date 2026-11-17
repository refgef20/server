import { Router } from "express";
import {
  getAppointmentId,
  getAppointmentQuery,
  patchAppoint,
  deleteAppointment,
  postAppoint,
} from "../controllers/appointmentController.js";
import Auth from "../middleware/authorization.js";

const routers = Router();

routers.get("/:id", Auth, getAppointmentId);
routers.get("/", Auth, getAppointmentQuery);
routers.patch("/:id", Auth, patchAppoint);
routers.post("/", Auth, postAppoint);
routers.delete("/:id", deleteAppointment);

export default routers;
