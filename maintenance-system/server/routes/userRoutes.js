const express = require("express");

const router = express.Router();

const {
    getTechnicians
} = require("../controller/userController");

router.get("/technicians", getTechnicians);

module.exports = router;