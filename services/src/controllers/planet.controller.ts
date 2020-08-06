import express from "express";

import Planet from "../models/planet.model";

const router = express.Router({
	mergeParams: true,
});

router.get("/", async (_request, response) => {
	try {
		const planets = await Planet.find();
		response.json(planets);
	}
	catch (error) {
		response.status(400).json({
			error: error,
		});
	}
});

export default router;