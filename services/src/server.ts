import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";

// CONTROLLER IMPORTS
import planetController from "./controllers/planet.controller";

// APP CONFIGURATION
dotenv.config({
	path: __dirname + "/../.env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride());

// DATABASE CONFIGURATION
const databaseURI = process.env.MONGODB_ATLAS_URI || "mongodb://localhost:27017/starmaker";
mongoose.connect(databaseURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// DATABASE CONNECTION
const connection = mongoose.connection;

connection.on("error", () => {
	console.error("Failed to connect to MongoDB.");
})

connection.once("open", () => {
	console.log("MongoDB connection established successfully.");
});

// CONTROLLERS/ROUTING
app.use("/planets/", planetController);

// SERVER CONFIGURATION
const port = +process.env.PORT || 8080;

app.listen(port, process.env.IP, () => {
	console.log(`Server listening on port ${port}.`);
});