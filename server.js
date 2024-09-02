const app = require("./src/app");
const connectDB = require("./src/configs/db.config");

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
