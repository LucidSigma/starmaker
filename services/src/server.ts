import express from "express";

const app = express();

app.get("/", (_request, response) => {
	response.send("Working.");
});

const port = +process.env.PORT || 8080;

app.listen(port, process.env.IP, () => {
	console.log(`Server listening on port ${port}.`);
});