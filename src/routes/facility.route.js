const express = require("express");
const { adminProtect } = require("../middlewares/auth.middleware");
const {
  facilityAdd,
  facilitiesGet,
  facilityUpdate,
} = require("../controllers/facility.controller");
const router = express.Router();

router.post("/", adminProtect, facilityAdd); // Add a new facility (Admin only)
router.get("/", adminProtect, facilitiesGet); // Get all facilities
router.patch("/:id", adminProtect, facilityUpdate); // Update a facility (Admin only)
router.delete("/:id", adminProtect); // Delete a facility (Admin only)

module.exports = router;
