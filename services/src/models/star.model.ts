import mongoose, { Schema } from "mongoose";

export interface IStarModel extends mongoose.Document {
	name: string,
	diameter?: number,
	colour?: string,
	luminosity?: number,
	planets?: string[],
}

const starSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	diameter: {
		type: Number,
		required: false,
	},
	colour: {
		type: String,
		required: false,
	},
	luminosity: {
		type: Number,
		required: false,
	},
	planets: [
		{
			type: String,
			required: true,
		}
	],
});

export default mongoose.model<IStarModel>("Star", starSchema);