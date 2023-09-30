import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(cors());
app.use(express.json());

// DB config
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option for the latest MongoDB driver
  },
  (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
