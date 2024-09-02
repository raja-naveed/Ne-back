const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();

// Middleware setup
// Use CORS middleware with detailed configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); 

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});


app.use("/uploads", express.static("uploads"));

// Routes setup
app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
// app.use('/api/facilities', require('./routes/facility.route'));
app.use("/api/villas", require("./routes/newvilla.route"));
// app.use("/api/admin/villas", require("./routes/villa.route"));
app.use("/api/admin", require("./routes/admin.route"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something broke!" });
});

module.exports = app;
