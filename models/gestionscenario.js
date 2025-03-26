const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    missions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mission" }],
    createdAt: { type: Date, default: Date.now }
});

// Création du modèle Scenario
const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = Scenario; // Export du modèle
