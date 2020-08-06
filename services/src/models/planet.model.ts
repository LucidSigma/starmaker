import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
		required: false,
	},
	starName: {
		type: String,
		required: false,
	},
	distanceFromStar: {
		type: Number,
		required: false,
	},
});

export default mongoose.model("Planet", planetSchema);