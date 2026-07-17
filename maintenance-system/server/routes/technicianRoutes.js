const express = require("express");

const router = express.Router();

const {
    getAssignedTasks
} = require("../controller/technicianController");

router.get("/:technicianId", getAssignedTasks);

module.exports = router;