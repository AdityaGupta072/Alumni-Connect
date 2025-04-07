const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");

// Create an Announcement
router.post("/create", async (req, res) => {
    try {
        const { username, projectName, aboutProject, role, responsibility, qualifications, lastDate } = req.body;

        if (!username || !projectName || !aboutProject || !role || !responsibility || !qualifications || !lastDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAnnouncement = new Announcement({
            username,
            projectName,
            aboutProject,
            role,
            responsibility,
            qualifications,
            lastDate
        });

        await newAnnouncement.save();
        res.status(201).json({ message: "Announcement created successfully", announcement: newAnnouncement });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//  Get All Announcements
router.get("/", async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }); // Get all announcements sorted by latest
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
