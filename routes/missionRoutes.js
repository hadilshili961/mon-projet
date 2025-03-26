const mongoose = require("mongoose");
const express = require("express");
const Mission = require("../models/gestionmission");  // ✅ Make sure this points to the correct file
const router = express.Router();

// Ajouter une mission
router.post("/", async (req, res) => {
    try {
        const newMission = new Mission(req.body);  // ✅ Now this will work!
        await newMission.save();
        res.status(201).json(newMission);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer toutes les missions
router.get("/", async (req, res) => {
    try {
        const missions = await Mission.find();  // ✅ Now this will work!
        res.status(200).json(missions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer une mission par ID
router.get("/:id", async (req, res) => {
    try {
        // Supprimer les espaces/sauts de ligne de l'ID
        const missionId = req.params.id.trim();  // ✅ Suppression des espaces
        console.log("ID reçu :", missionId); // ✅ Affichage pour débogage

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(missionId)) {
            return res.status(400).json({ error: "ID de mission invalide" });
        }

        const mission = await Mission.findById(missionId);
        if (!mission) return res.status(404).json({ error: "Mission non trouvée" });

        res.status(200).json(mission);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Supprimer une mission
router.delete("/:id", async (req, res) => {
    try {
        // Supprimer les espaces/sauts de ligne de l'ID
        const missionId = req.params.id.trim();  // ✅ Suppression des espaces

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(missionId)) {
            return res.status(400).json({ error: "ID de mission invalide" });
        }

        const mission = await Mission.findByIdAndDelete(missionId);
        if (!mission) return res.status(404).json({ error: "Mission non trouvée" });

        res.status(200).json({ message: "Mission supprimée" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
