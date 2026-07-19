const express = require("express");

const router = express.Router();

const {
    getTechnicians,
    getUsers,
    updateRole,
    createUser
} = require("../controller/userController");

router.get("/technicians", getTechnicians);
router.get("/", getUsers);
router.put("/:id/role", updateRole);
router.post("/create", createUser);

module.exports = router;