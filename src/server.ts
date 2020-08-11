import cors from "cors";
import dotenv from "dotenv";
import express, { request } from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import path from "path";

// CONTROLLER IMPORTS
import planetController from "./controllers/planet.controller";
import starController from "./controllers/star.controller";

// APP CONFIGURATION
dotenv.config({
	path: __dirname + "/../.env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "client", "build")));

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
app.use("/stars/", starController);
app.use("/stars/:star_id/planets/", planetController);

app.get("*", (_request, response) => {
	response.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// SERVER CONFIGURATION
const port = +process.env.PORT || 8080;

app.listen(port, process.env.IP, () => {
	console.log(`Server listening on port ${port}.`);
});