const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserByID, deleteUserByID } = require("../controllers/admin.controller");
const { adminProtect } = require("../middlewares/auth.middleware");
const {
  getVillas,
  villaAdd,
  villaUpdate,
  villaDelete,
  createVilla,
  updateVillaRooms,
  updateVillaFaqs,
  updateVillaReviews,
} = require("../controllers/villa.controller");

router.get("/users", adminProtect, getAllUsers); // Get all users (Admin)
router.patch("/users/:id", adminProtect, updateUserByID); // Update a user by ID (Admin)
router.delete("/users/:id", adminProtect, deleteUserByID); // Delete a user by ID (Admin)

router.get("/villas", adminProtect, getVillas); // Get all villas (Admin)
router.post("/villas", adminProtect, createVilla); // Create a new villa (Admin)
router.patch("/villas/:id/rooms", adminProtect, updateVillaRooms); // Create a new villa (Admin)
router.patch("/villas/:id/faqs", adminProtect, updateVillaFaqs); // Create a new villa (Admin)
router.patch("/villas/:id/reviews", adminProtect, updateVillaReviews); // Create a new villa (Admin)
router.patch("/villas/:id", adminProtect, villaUpdate); // Update a villa by ID (Admin)
router.delete("/villas/:id", adminProtect, villaDelete); // Delete a villa by ID (Admin)

// router.get("/reviews", adminProtect, getReviews); // Get all reviews (Admin)
// router.get("/community-pictures", adminProtect, getCommunityPictures); // Get all community pictures (Admin)

module.exports = router;
