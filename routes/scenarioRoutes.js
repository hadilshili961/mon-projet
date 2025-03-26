const express = require("express");
const Scenario = require("../models/gestionscenario");  // Import du modèle Scenario
const router = express.Router();

// Ajouter un scénario
router.post("/", async (req, res) => {
    try {
        const newScenario = new Scenario(req.body); // Utilisation du constructeur pour créer un scénario
        await newScenario.save();
        res.status(201).json(newScenario); // Retourner le scénario ajouté avec son ID
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer tous les scénarios
router.get("/", async (req, res) => {
    try {
        const scenarios = await Scenario.find(); // Trouver tous les scénarios
        res.status(200).json(scenarios);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Récupérer un scénario par ID
router.get("/:id", async (req, res) => {
    try {
        const scenario = await Scenario.findById(req.params.id); // Trouver un scénario par son ID
        if (!scenario) return res.status(404).json({ error: "Scénario non trouvé" });
        res.status(200).json(scenario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Supprimer un scénario
router.delete("/:id", async (req, res) => {
    try {
        const scenario = await Scenario.findByIdAndDelete(req.params.id); // Supprimer un scénario par son ID
        if (!scenario) return res.status(404).json({ error: "Scénario non trouvé" });
        res.status(200).json({ message: "Scénario supprimé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;  // Export des routes
