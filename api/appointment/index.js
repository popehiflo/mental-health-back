const { Router } = require("express");
const { isAuthenticated, hasRole } = require("../../auth/auth.service");

const {
  handlerAllAppointment,
  handlerOneAppointment,
  handlerCreateAppointment,
  handlerDeleteAppointment,
  handlerUpdateAppointment,
} = require("./appointment.controller");

const router = Router();

router.get("/", handlerAllAppointment);
router.get("/:id", handlerOneAppointment);
router.post("/", isAuthenticated(), handlerCreateAppointment);
router.delete("/:id", hasRole(["patient", "doctor"]), handlerDeleteAppointment);
router.patch("/:id", hasRole(["patient", "doctor"]), handlerUpdateAppointment);

module.exports = router;
