import mongoose from "mongoose";

export default interface Planet extends mongoose.Document {
	name: string,
	moonCount?: number,
	diameter: number,
	starName: string,
	distanceFromStar: number,
}