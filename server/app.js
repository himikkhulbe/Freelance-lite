import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";




dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
// Allow credentials and allow requests from your frontend's origin

app.use(express.json());

connectDb();

app.use("/api/user", userRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/client", clientRoutes);



app.get("/ping", (req, res) => res.json({ message: "Server is up!" }));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

