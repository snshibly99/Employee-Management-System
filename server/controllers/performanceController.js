import Performance from "../models/Performance.js";


export const getPerformance = async (req, res) => {
  try {
    const performance = await Performance.find().populate("createdBy", "name");
    res.status(200).json({ success: true, performance });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const createPerformance = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body)
  if (!title || !description) {
    return res.status(400).json({ success: false, error: "Title and description are required" });
  }

  try {
    const newPerformance = await Performance.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, performance: newPerformance });
  } catch (error) {
    console.error("Error creating notes:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


export const deletePerformance = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPerformance = await Performance.findByIdAndDelete(id);
  
      if (!deletedPerformance) {
        return res.status(404).json({ success: false, error: "notes not found" });
      }
  
      res.status(200).json({ success: true, message: "notes deleted" });
    } catch (error) {
      console.error("Error deleting notes:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };

export default {getPerformance, createPerformance, deletePerformance};