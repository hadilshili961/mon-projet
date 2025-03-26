
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Accès refusé, aucun token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Format du token invalide" });
    }

    console.log("🔍 Token reçu :", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token décodé :", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Erreur de validation du token :", error.message);
        res.status(400).json({ message: "Token invalide" });
    }
};

exports.checkRole = (roles) => (req, res, next) => {
    console.log(`👮 Vérification du rôle : ${req.user?.role} (nécessaire: ${roles})`);

    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Accès refusé : Rôle insuffisant" });
    }

    next();
};

