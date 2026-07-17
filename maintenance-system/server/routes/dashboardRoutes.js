const express = require("express");

const router = express.Router();

const {
    getAdminStats
} = require("../controller/dashboardController");

router.get("/admin", getAdminStats);

module.exports = router;
