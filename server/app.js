import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/dbConnection.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
// Allow credentials and allow requests from your frontend's origin
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

connectDb();

app.use("/api/user", userRouter);

app.get("/ping", (req, res) => res.json({ message: "Server is up!" }));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

