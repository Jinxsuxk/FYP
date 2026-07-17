const express = require("express");

const router = express.Router();

const {
    assignTechnician
} = require("../controller/assignmentController");

router.post("/", assignTechnician);

module.exports = router;