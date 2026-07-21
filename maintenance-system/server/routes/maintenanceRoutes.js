const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  updateRequestStatus,
  getLecturerStats,
  getMyRequests
} = require("../controller/maintenanceController");

router.post("/", createRequest);

router.get("/", getRequests);
router.put("/:id/status", updateRequestStatus);
router.get("/lecturer-stats/:userId", getLecturerStats);
router.get("/my-requests/:userId", getMyRequests);

module.exports = router;