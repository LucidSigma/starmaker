import mongoose from "mongoose";

export default interface Planet extends mongoose.Document {
	name: string,
	moonCount?: number,
	diameter: number,
	starID: string,
	starName: string,
	distanceFromStar: number,
}