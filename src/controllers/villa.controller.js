const Villa = require("../models/villa.model");
const upload = require("../middlewares/upload.middleware");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Get all villas
exports.getVillas = async (req, res) => {
  try {
    const villas = await Villa.find();
    res.json(villas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get featured villas
exports.villasFeatured = async (req, res) => {
  try {
    const villas = await Villa.find().limit(5); // Assume featured villas are just the first 5 for simplicity
    res.json(villas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Search for villas
exports.villasSearch = async (req, res) => {
  const { city, country, budgetMin, budgetMax, duration } = req.query;

  const query = {};
  if (city) query["location.city"] = city;
  if (country) query["location.country"] = country;
  if (budgetMin && budgetMax) query.price = { $gte: budgetMin, $lte: budgetMax };
  if (duration) query.duration = duration;

  try {
    const villas = await Villa.find(query);
    res.json(villas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get villa details by ID
exports.villaByID = async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }
    res.json(villa);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get availability of a villa by ID (assuming availability is related to upcomingTrips)
exports.villaAvailability = async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id).select("upcomingTrips");
    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }
    res.json(villa.upcomingTrips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Admin Only Controllers

// Create a new villa (Admin)
exports.villaAdd = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    const {
      name,
      location,
      duration,
      price,
      about,
      facilities,
      rooms,
      neighbourhoodDescription,
      upcomingTrips,
      reviews,
      faq,
    } = req.body;

    const villaImages = req.files.map((file) => `${BASE_URL}/uploads/villas/${file.filename}`);

    try {
      const parsedFacilities = facilities ? JSON.parse(facilities) : [];
      const parsedRooms = rooms ? JSON.parse(rooms) : [];
      const parsedUpcomingTrips = upcomingTrips ? JSON.parse(upcomingTrips) : [];
      const parsedReviews = reviews ? JSON.parse(reviews) : [];
      const parsedFaq = faq ? JSON.parse(faq) : [];

      const newVilla = new Villa({
        name,
        images: villaImages,
        location: JSON.parse(location),
        duration,
        price,
        about,
        facilities: parsedFacilities,
        rooms: parsedRooms,
        neighbourhoodDescription: JSON.parse(neighbourhoodDescription),
        upcomingTrips: parsedUpcomingTrips,
        reviews: parsedReviews,
        faq: parsedFaq,
      });

      const villa = await newVilla.save();
      res.json(villa);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
};

// Update a villa by ID (Admin)
exports.villaUpdate = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const {
    name,
    location,
    duration,
    price,
    about,
    facilities,
    rooms,
    neighbourhoodDescription,
    upcomingTrips,
    reviews,
    faq,
  } = req.body;

  const fieldsToUpdate = {};

  if (name) fieldsToUpdate.name = name;
  if (location) fieldsToUpdate.location = JSON.parse(location);
  if (duration) fieldsToUpdate.duration = duration;
  if (price) fieldsToUpdate.price = price;
  if (about) fieldsToUpdate.about = about;
  if (facilities) fieldsToUpdate.facilities = JSON.parse(facilities);
  if (rooms) fieldsToUpdate.rooms = JSON.parse(rooms);
  if (neighbourhoodDescription)
    fieldsToUpdate.neighbourhoodDescription = JSON.parse(neighbourhoodDescription);
  if (upcomingTrips) fieldsToUpdate.upcomingTrips = JSON.parse(upcomingTrips);
  if (reviews) fieldsToUpdate.reviews = JSON.parse(reviews);
  if (faq) fieldsToUpdate.faq = JSON.parse(faq);

  if (req.files && req.files.length > 0) {
    fieldsToUpdate.images = req.files.map((file) => `${BASE_URL}/uploads/villas/${file.filename}`);
  }

  try {
    let villa = await Villa.findById(req.params.id);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    villa = await Villa.findByIdAndUpdate(req.params.id, { $set: fieldsToUpdate }, { new: true });

    res.json(villa);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a villa by ID (Admin)
exports.villaDelete = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const villa = await Villa.findById(req.params.id);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    await villa.remove();
    res.json({ message: "Villa removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Controller to create a new villa
exports.createVilla = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const {
      name,
      location,
      duration,
      price,
      about,
      facilities,
      neighbourhoodDescription,
      upcomingTrips,
      minCapacity,
      maxCapacity,
      status,
    } = req.body;

    const villaImages = req.files.map((file) => `${BASE_URL}/uploads/${file.filename}`);

    try {
      const newVilla = new Villa({
        name,
        images: villaImages,
        location: JSON.parse(location),
        duration,
        price,
        about,
        facilities: facilities ? JSON.parse(facilities) : [],
        neighbourhoodDescription: neighbourhoodDescription
          ? JSON.parse(neighbourhoodDescription)
          : {},
        upcomingTrips: upcomingTrips ? JSON.parse(upcomingTrips) : [],
        minCapacity,
        maxCapacity,
        status,
      });

      const savedVilla = await newVilla.save();
      res.status(201).json(savedVilla);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error creating villa", error });
    }
  });
};

// Controller to update a villa with rooms
exports.updateVillaRooms = async (req, res) => {
  try {
    const { villaId } = req.params; // Get villa ID from params
    const { rooms } = req.body; // Expecting rooms array in the request body

    const villa = await Villa.findById(villaId);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    villa.rooms = rooms; // Add or update rooms

    const updatedVilla = await villa.save();
    res.status(200).json(updatedVilla);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating rooms", error });
  }
};

// Controller to update a villa with FAQs
exports.updateVillaFaqs = async (req, res) => {
  try {
    const { villaId } = req.params; // Get villa ID from params
    const { faq } = req.body; // Expecting FAQ array in the request body

    const villa = await Villa.findById(villaId);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    villa.faq = faq; // Add or update FAQs

    const updatedVilla = await villa.save();
    res.status(200).json(updatedVilla);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating FAQs", error });
  }
};

// Controller to update a villa with reviews
exports.updateVillaReviews = async (req, res) => {
  try {
    const { villaId } = req.params; // Get villa ID from params
    const { reviews } = req.body; // Expecting reviews array in the request body

    const villa = await Villa.findById(villaId);

    if (!villa) {
      return res.status(404).json({ message: "Villa not found" });
    }

    villa.reviews = reviews; // Add or update reviews

    const updatedVilla = await villa.save();
    res.status(200).json(updatedVilla);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating reviews", error });
  }
};
