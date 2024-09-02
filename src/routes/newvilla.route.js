const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const { protect } = require("../middlewares/auth.middleware");
const { deleteVilla, addVilla, getVillas, getVillaById } = require("../controllers/newvillacontroler");



// Route to add a new villa (Protected route)
router.post("/add", addVilla);

// Route to delete a villa by ID (Protected route)
router.delete("/:id", deleteVilla);

// Route to get all villas
router.get("/", getVillas);

// Route to get a villa by ID
router.get("/:id", getVillaById);

module.exports = router;
