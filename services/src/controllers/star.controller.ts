import express from "express";

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
		response.status(400).json({
			error: error,
		});
	}
});

export default router;