const User = require("../models/user.model");
const Villa = require("../models/villa.model");
// const Review = require('../models/review.model');
// const CommunityPicture = require('../models/communityPicture.model');

// Get all users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a user by ID (Admin)
exports.updateUserByID = async (req, res) => {
  const { fullName, email, role } = req.body;
  const fieldsToUpdate = {};

  if (fullName) fieldsToUpdate.fullName = fullName;
  if (email) fieldsToUpdate.email = email;
  if (role) fieldsToUpdate.role = role;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a user by ID (Admin)
exports.deleteUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.json({ message: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



// Get all reviews (Admin)
// exports.getReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find().populate("user", ["fullName", "profilePicture"]);
//     res.json(reviews);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Get all community pictures (Admin)
// exports.getCommunityPictures = async (req, res) => {
//   try {
//     const pictures = await CommunityPicture.find().populate("user", ["fullName", "profilePicture"]);
//     res.json(pictures);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
