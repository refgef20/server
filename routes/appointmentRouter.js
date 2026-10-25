import { Router } from "express";
import {
  getAppointmentId,
  getAppointmentQuery,
  patchAppoint,
  deleteAppointment,
  postAppoint,
} from "../controllers/appointmentController.js";

const routers = Router();

routers.get("/:id", getAppointmentId);
routers.get("/", getAppointmentQuery);
routers.patch("/:id", patchAppoint);
routers.post("/", postAppoint);
routers.delete("/:id", deleteAppointment);

export default routers;
