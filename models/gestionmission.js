const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
    robotId: { type: String, required: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
    statut: { type: String, enum: ["En attente", "En cours", "Terminée"], default: "En attente" }
}, { timestamps: true });

const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
