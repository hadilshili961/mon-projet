const mongoose = require("mongoose");

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["idle", "active", "error"], 
    default: "idle" 
  }, 
  position: { 
    x: { type: Number, default: 0 }, 
    y: { type: Number, default: 0 } 
  }, 
  battery: { type: Number, min: 0, max: 100, default: 100 }, 
  temperature: { type: Number, default: 25 },
  commands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }], 
  mission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission", default: null }, 
  lastUpdated: { type: Date, default: Date.now }
});


robotSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Robot", robotSchema);

