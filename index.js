import express from "express";
import mongoose from "mongoose";
import BookRouter from "./routes/BookRoutes.js";
import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const mongoDBurl = process.env.MONGO_DB_URL;

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173"
	})
);
app.use("/books", BookRouter);

console.log("Server is Starting");

mongoose.connect(mongoDBurl).then(() => {
	try {
		console.log("Server is Connected to DB");
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
});
