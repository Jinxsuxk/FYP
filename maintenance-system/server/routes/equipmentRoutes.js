const express = require("express");
const router = express.Router();

const {
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
} = require("../controller/equipmentController");

router.get("/", getEquipment);

router.post("/", createEquipment);

router.put("/:id", updateEquipment);

router.delete("/:id", deleteEquipment);

module.exports = router;