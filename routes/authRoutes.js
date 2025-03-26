const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/admin", verifyToken, checkRole(["admin", "super_admin"]), (req, res) => {
    res.json({ message: "Bienvenue Admin !" });
});

router.get("/agent", verifyToken, checkRole(["agent_securite"]), (req, res) => {
    res.json({ message: "Bienvenue Agent de Sécurité !" });
});

module.exports = router;
