const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "super_admin", "agent_securite"], default: "admin" },
});

module.exports = mongoose.model("User", UserSchema);
