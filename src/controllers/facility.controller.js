const { Facility } = require("../models/villa.model");

// Add a new facility (Admin only)
exports.facilityAdd = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { iconClass, name } = req.body;

  try {
    const newFacility = new Facility({
      iconClass,
      name,
    });

    const facility = await newFacility.save();
    res.json(facility);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all facilities
exports.facilitiesGet = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a facility (Admin only)
exports.facilityUpdate = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { iconClass, name } = req.body;
  const fieldsToUpdate = {};

  if (iconClass) fieldsToUpdate.iconClass = iconClass;
  if (name) fieldsToUpdate.name = name;

  try {
    let facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true }
    );

    res.json(facility);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a facility (Admin only)
exports.facilityDelete = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    await facility.remove();
    res.json({ message: "Facility removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
