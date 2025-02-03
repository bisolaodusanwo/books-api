const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookRoutes = require("./src/routes/bookRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

module.exports = app;
