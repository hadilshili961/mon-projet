const Robot = require("../models/robot");
console.log("✅ robotController chargé avec succès !");

exports.createRobot = async (req, res) => {
  try {
    const { name, position } = req.body;
    const newRobot = new Robot({ name, position, battery: 100, temperature: 25 });
    await newRobot.save();
    res.status(201).json(newRobot);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du robot." });
  }
};

exports.updateRobot = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, position } = req.body;
    const robot = await Robot.findByIdAndUpdate(id, { status, position, lastUpdated: Date.now() }, { new: true });
    if (!robot) return res.status(404).json({ error: "Robot non trouvé." });
    res.json(robot);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du robot." });
  }
};

exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des robots." });
  }
};


