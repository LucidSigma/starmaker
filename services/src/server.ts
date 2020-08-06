import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";

dotenv.config({
	path: __dirname + "/../.env",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride());

const port = +process.env.PORT || 8080;

app.listen(port, process.env.IP, () => {
	console.log(`Server listening on port ${port}.`);
});