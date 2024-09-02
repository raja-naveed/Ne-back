const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  villasFeatured,
  villasSearch,
  villaByID,
  villaAvailability,
  getVillas,
} = require("../controllers/villa.controller");
const { protect } = require("../middlewares/auth.middleware");

// Public routes
router.get("/", getVillas);
router.get("/featured", villasFeatured); // Get featured villas
router.get("/search", villasSearch); // Search for villas
router.get("/:id", villaByID); // Get villa details by ID
router.get("/:id/availability", villaAvailability); // Get availability of a villa by ID

// Protected Admin Only routes
// router.post("/", protect, villaAdd); // Create a new villa (Admin)
// router.patch("/:id", protect, villaUpdate); // Update a villa by ID (Admin)
// router.delete("/:id", protect, villaDelete); // Delete a villa by ID (Admin)

module.exports = router;
