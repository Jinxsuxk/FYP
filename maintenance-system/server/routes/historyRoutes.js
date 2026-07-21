const express=require("express");

const router=express.Router();

const {
    getHistory,
    getTechnicianHistory,
    getSystemHistory
}=require("../controller/historyController");


router.get("/",getHistory);
router.get("/technician/:technicianId", getTechnicianHistory);
router.get("/system", getSystemHistory);


module.exports=router;