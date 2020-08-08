import express from "express";

import Planet from "../models/planet.model";
import Star from "../models/star.model";

const router = express.Router({
	mergeParams: true,
});

router.get("/", async (_request, response) => {
	try {
		const stars = await Star.find();
		response.json(stars);
	}
	catch (error) {
		response.status(400).json(`Could not index stars. Error: ${error}.`);
	}
});

router.post("/", async (request, response) => {
	const newStar = new Star({
		name: request.body.name,
		diameter: request.body.diameter,
		colour: request.body.colour,
		luminosity: request.body.luminosity,
		planet_ids: [],
		plante_names: [],
	});

	try {
		await Star.create(newStar);
		response.json(`Star created successfully.`);
	}
	catch (error) {
		response.status(400).json(`Could not create a new star. Error: ${error}.`);
	}
});

router.get("/:id", async (request, response) => {
	try {
		const star = await Star.findById(request.params.id);
		response.json(star);
	}
	catch (error) {
		response.status(400).json(`Could not get star from database. Error: ${error}.`);
	}
});

router.put("/:id", async (request, response) => {
	try {
		const star = await Star.findById(request.params.id);
		const planets = await Planet.find({
			starName: star.name,
		});
		const oldStarName = `${star.name}`;

		star.name = request.body.name;
		star.diameter = request.body.diameter;
		star.colour = request.body.colour;
		star.luminosity = request.body.luminosity;
		
		for (const planet of planets) {
			planet.starName = oldStarName;
			planet.markModified("starName");

			await planet.save();
		}

		await star.save();
		response.json("Star updated successfully.");
	}
	catch (error) {
		response.status(400).json(`Could not update star. Error: ${error}.`);
	}
});

router.delete("/:id", async (request, response) => {
	try {
		await Planet.deleteMany({
			starID: request.params.id,
		});
		await Star.findByIdAndDelete(request.params.id);

		response.json("Star deleted successfully.");
	}
	catch (error) {
		response.status(400).json(`Could not delete star. Error: ${error}.`);
	}
});

export default router;