const upload = require('../middlewares/upload.middleware');
const VillaForm = require('../models/newvilla.model');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

module.exports = {
    // Add a New Villa
    addVilla: (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Multer Error:', err);
                return res.status(400).json({ message: err.message });
            }

            console.log('Request Files:', req.files);
            console.log('Request Body:', req.body);

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "Please upload at least one image" });
            }

            const {
                villaName,
                villaCode,
                description,
                neighbourhood,
                address,
                city,
                country,
                minCapacity,
                maxCapacity
            } = req.body;

            const villaImages = req.files.map((file) => ({
                url: `${BASE_URL}/uploads/${file.filename}`,
                filename: file.filename
            }));

            try {
                const newVilla = new VillaForm({
                    villaName,
                    villaCode,
                    description,
                    neighbourhood,
                    address,
                    city,
                    country,
                    minCapacity,
                    maxCapacity,
                    images: villaImages
                });

                const savedVilla = await newVilla.save();
                res.status(201).json(savedVilla);
            } catch (error) {
                console.error('Error Saving Villa:', error);
                res.status(500).json({ message: "Error creating villa", error });
            }
        });
    }
,
    // Delete a Villa by ID
    deleteVilla: async (req, res) => {
        try {
            const villa = await VillaForm.findById(req.params.id);

            if (!villa) {
                return res.status(404).json({ message: "Villa not found" });
            }

            await villa.deleteOne();
            res.json({ message: "Villa removed" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Get All Villas
    getVillas: async (req, res) => {
        try {
            const villas = await VillaForm.find();
            res.json(villas);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Get a Villa by ID
    getVillaById: async (req, res) => {
        try {
            const villa = await VillaForm.findById(req.params.id);

            if (!villa) {
                return res.status(404).json({ message: "Villa not found" });
            }

            res.json(villa);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
};
