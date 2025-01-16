const express = require("express");
const mongoose = require("mongoose");
const rootRouter = require("./rootRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Dulasha:3ZnHawcQOGhJ06M2@cluster0.hmudj.mongodb.net/salary-management-system?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Use root router
app.use("/api", rootRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
