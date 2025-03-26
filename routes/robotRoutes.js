const express = require("express");
const { createRobot, updateRobot, getRobots, sendCommand } = require("../controllers/robotController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/robot", createRobot); 
router.put("/robot/:id", updateRobot);
router.get("/robots", getRobots);


module.exports = router;
