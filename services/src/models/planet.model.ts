import mongoose, { Schema } from "mongoose";

export interface IPlanetModel extends mongoose.Document {
	name: string,
	moonCount?: number,
	diameter: number,
	starName: string,
	distanceFromStar: number,
}

const planetSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	moonCount: {
		type: Number,
		required : false,
	},
	diameter: {
		type: Number,
		required: true,
	},
	starName: {
		type: String,
		required: true,
	},
	distanceFromStar: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<IPlanetModel>("Planet", planetSchema);