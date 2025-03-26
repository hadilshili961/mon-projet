const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const robotRoutes = require("./routes/robotRoutes");
const scenarioRoutes = require("./routes/scenarioRoutes");
const missionRoutes = require("./routes/missionRoutes");


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

global.io = io;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/robots", robotRoutes);  // Gestion des robots
app.use("/api/scenarios", scenarioRoutes);  // Gestion des scénarios
app.use("/api/missions", missionRoutes);  // Gestion des missions


// Gestion de la connexion WebSocket pour envoyer des notifications en temps réel
io.on("connection", (socket) => {
    console.log("🟢 Robot connecté via WebSocket");

    socket.on("sensorData", (data) => {
        console.log("📡 Données du robot reçues :", data);
        
        // Exemple : envoyer une notification en temps réel
        // Tu peux envoyer des notifications à tous les clients connectés via WebSocket
        io.emit("notification", {
            message: `Nouvelle donnée reçue du robot : ${JSON.stringify(data)}`,
            type: "info"
        });
    });

    socket.on("disconnect", () => {
        console.log("🔴 Robot déconnecté");
    });
});

// Connexion à MongoDB
mongoose.connection.once("open", () => {
    console.log("✅ Connecté à MongoDB");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err);
});
