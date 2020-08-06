import express from "express";

import Planet from "../models/planet.model";
import Star from "../models/star.model";

const router = express.Router({
	mergeParams: true,
});

router.post("/", async (request, response) => {
	try {
		const star = await Star.findById(request.params.star_id);

		const newPlanet = new Planet({
			name: request.body.name,
			moonCount: request.body.moonCount,
			diameter: request.body.diameter,
			starName: star.name,
			distanceFromStar: request.body.distanceFromStar,
		});

		star.planets.push(newPlanet.name);
		await star.save();

		await Planet.create(newPlanet);
		response.json(`Planet created successfully.`);
	}
	catch (error) {
		response.status(400).json(`Could not create a new planet. Error: ${error}.`);
	}
});

router.get("/:planet_id", async (request, response) => {
	try {
		const planet = await Planet.findById(request.params.planet_id);
		response.json(planet);
	}
	catch (error) {
		response.status(400).json(`Could not get planet from database. Error: ${error}.`);
	}
});

router.put("/:planet_id", async (request, response) => {
	try {
		const planet = await Planet.findById(request.params.planet_id);
		const oldPlanetName = `${planet.name}`;

		planet.name = request.body.name;
		planet.moonCount = request.body.moonCount;
		planet.diameter = request.body.diameter;
		planet.distanceFromStar = request.body.distanceFromStar;

		const star = await Star.findOne({ name: planet.starName, });
		star.planets[star.planets.indexOf(oldPlanetName)] = planet.name;
		star.markModified("planets");

		await planet.save();
		await star.save();

		response.json("Planet updated successfully.");
	}
	catch (error) {
		response.status(400).json(`Could not update planet. Error: ${error}.`);
	}
});

router.delete("/:planet_id", async (request, response) => {
	try {
		const planet = await Planet.findById(request.params.planet_id);

		const star = await Star.findOne({ name: planet.starName, });
		star.planets = star.planets.filter((planetName) => planetName !== planet.name);
		star.markModified("planets");

		await star.save();
		await planet.deleteOne();

		response.json("Planet deleted successfully.");
	}
	catch (error) {
		response.status(400).json(`Could not delete planet. Error: ${error}.`);
	}
});

export default router;