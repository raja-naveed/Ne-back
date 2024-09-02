const mongoose = require('mongoose');
const { Schema } = mongoose;

// Image Schema
const imageSchema = new Schema({
    url: { type: String, required: true },
    filename: String,
});

// Villa Schema
const villaFormSchema = new Schema({
    villaName: { type: String, required: true },
    villaCode: { type: String, required: true },
    description: { type: String, required: true }, 
    neighbourhood: { type: String, required: true }, 
    address: { type: String, required: true }, 
    city: { type: String, required: true },
    country: { type: String, required: true },
    minCapacity: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    images: [imageSchema], 
}, { timestamps: true });

// Create and export the model
const VillaForm = mongoose.model('VillaFormssss', villaFormSchema);
module.exports = VillaForm;
