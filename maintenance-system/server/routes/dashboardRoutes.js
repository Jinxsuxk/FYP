const express = require("express");

const router = express.Router();

const {
    getAdminStats,
    getStaffStats,
    getTechnicianStats
} = require("../controller/dashboardController");

router.get("/admin", getAdminStats);
router.get("/staff-stats", getStaffStats);
router.get("/technician-stats/:technicianId", getTechnicianStats);

module.exports = router;
