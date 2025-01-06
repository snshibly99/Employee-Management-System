import Performance from "../models/Performance.js";

export const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find().populate("createdBy", "name");
    res.status(200).json({ success: true, performances });
  } catch (error) {
    console.error("Error fetching performances:", error);
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
    console.error("Error creating performances:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const deletePerformance = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPerformance = await Performance.findByIdAndDelete(id);

    if (!deletedPerformance) {
      return res.status(404).json({ success: false, error: "Performance notes not found" });
    }

    res.status(200).json({ success: true, message: "Performance notes deleted" });
  } catch (error) {
    console.error("Error deleting performances:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
