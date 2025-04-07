const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Name of the person posting
    projectName: { type: String, required: true }, // Project Title
    aboutProject: { type: String, required: true }, // Description of the project
    role: { type: String, required: true }, // Role required in the project
    responsibility: { type: String, required: true }, // Responsibilities in project
    qualifications: { type: String, required: true }, // Required skills/qualifications
    lastDate: { type: Date, required: true }, // Deadline to apply
    createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
