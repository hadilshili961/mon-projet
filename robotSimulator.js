const io = require("socket.io-client");
const { addMission, deleteMission, saveMission } = require("./models/gestionmission");
const { saveScenario, deleteScenario, getScenario } = require("./models/gestionscenario");
const mongoose = require("mongoose");
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log("🟢 Connecté à MongoDB"))
.catch(err => console.error("🔴 Erreur de connexion à MongoDB:", err));

const socket = io("http://localhost:5000");
const robotId = 1;

socket.on("connect", () => {
    console.log(`🟢 Robot ${robotId} connecté`);

    setInterval(() => {
        const sensorData = {
            id: robotId,
            battery: Math.floor(Math.random() * 100),
            temperature: (Math.random() * 50).toFixed(2),
            position: { x: Math.random() * 100, y: Math.random() * 100 },
            status: "OK"
        };
        socket.emit("sensorData", sensorData);
        console.log(`📡 Données envoyées par Robot ${robotId} :`, sensorData);
    }, 3000);
});

socket.on("command", async (data) => {
    switch (data.action) {
        case "addMission":
            socket.emit("response", addMission(robotId, data.mission));
            break;
        case "deleteMission":
            socket.emit("response", deleteMission(robotId));
            break;
        case "saveMission":
            socket.emit("response", saveMission(robotId));
            break;
        case "saveScenario":
            socket.emit("response", await saveScenario(data.name, data.missions));
            break;
        case "deleteScenario":
            socket.emit("response", await deleteScenario(data.name));
            break;
        case "getScenario":
            socket.emit("response", await getScenario(data.name));
            break;
        default:
            
    }
});

socket.on("disconnect", () => {
    console.log(`🔴 Robot ${robotId} déconnecté`);
});
