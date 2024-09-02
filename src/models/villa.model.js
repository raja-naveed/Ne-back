const mongoose = require("mongoose");
const { Schema } = mongoose;

// Facility Schema
const facilitySchema = new Schema({
  name: String,
  icon: String,
});

// Room Schema
const roomSchema = new Schema({
  name: String,
  description: String,
  images: [String], 
  amenities: [String] 
});

// Neighbourhood Schema
const neighbourhoodSchema = new Schema({
  description: String,
});

// Upcoming Trip Schema
const upcomingTripSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  price: Number,
});

// Review Schema
const reviewSchema = new Schema({
  user: String, // User's name
  rating: Number,
  comment: String,
  profilePicture: String, 
});

// FAQ Schema
const faqSchema = new Schema({
  question: String,
  answer: String,
});

// Main Villa Schema
const villaSchema = new Schema({
  name: { type: String,  },
  images: [{ type: String }], 
  location: {
    city: { type: String,  },
    country: { type: String,  },
    latitude: { type: Number,  },
    longitude: { type: Number,  },
  },
  duration: { type: String,  }, 
  price: { type: Number,  },
  about: { type: String,  },
  facilities: [facilitySchema],
  neighbourhoodDescription: neighbourhoodSchema,
  upcomingTrips: [upcomingTripSchema],
  minCapacity: { type: Number,  }, 
  maxCapacity: { type: Number,  },
  status: { type: String, default: "" }, 
  rooms: [roomSchema],
  faq: [faqSchema], 
  reviews: [reviewSchema], 
});

// Create and export the model
const Villa = mongoose.model("Villa", villaSchema);
module.exports = Villa;
