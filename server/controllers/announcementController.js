import Announcement from "../models/Announcement.js";

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("createdBy", "name");
    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body)
  if (!title || !description) {
    return res.status(400).json({ success: false, error: "Title and description are required" });
  }

  try {
    const newAnnouncement = await Announcement.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, announcement: newAnnouncement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ success: false, error: "Announcement not found" });
    }

    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
